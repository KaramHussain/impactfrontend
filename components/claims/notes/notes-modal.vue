<template>
  
    <div class="modal fade" id="notesModal" tabindex="-1" role="dialog" aria-labelledby="notesLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="notesLabel">Notes</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body m-0">

                    <template v-if="creating">

                        <div class="form-group">
                            <label for="creatingTitle">Title</label>
                            <input type="text" class="form-control" placeholder="Enter notes title" v-model="note.title" id="creatingTitle">
                        </div>

                        <div class="form-group">
                            <label for="creatingBody">Body</label>
                            <textarea class="form-control" placeholder="Enter notes" v-model="note.body" id="creatingBody"></textarea>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary btn-sm" @click.prevent="add">Add</button>
                            <button class="btn btn-danger btn-sm" @click.prevent="setNormal">cancel</button>
                        </div>

                    </template>

                    <template v-if="editing">

                        <div class="form-group">
                            <label for="creatingTitle">Title</label>
                            <input type="text" class="form-control" placeholder="Enter notes title" v-model="note.title" id="creatingTitle">
                        </div>

                        <div class="form-group">
                            <label for="creatingBody">Body</label>
                            <textarea class="form-control" placeholder="Enter notes" v-model="note.body" id="creatingBody"></textarea>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary btn-sm" @click.prevent="edit">Edit</button>
                            <button class="btn btn-danger btn-sm" @click.prevent="setNormal">cancel</button>
                        </div>

                    </template>

                    <template v-if="viewing">

                        <h4>{{note.title}}</h4>

                        <p>{{note.body}}</p>

                        <div class="form-group">
                            <button class="btn btn-danger btn-sm" @click.prevent="setNormal">cancel</button>
                        </div>

                    </template>

                    <template v-if="normal">

                        <ul class="notes-list">
                            <li v-for="note in notes" :key="note.id">
                                <h4 class="d-inline">{{note.title}}</h4>
                                <div class="d-inline ml-2">
                                    <button class="btn btn-light bg-white text-dark btn-sm"  @click.prevent="setViewing(note.id)">
                                        <i class="fas fa-eye" title="view notes"></i>
                                    </button>
                                    <button class="btn btn-success btn-sm"  @click.prevent="setEditing(note.id)">
                                        <i class="fas fa-edit" title="edit notes"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm"  @click.prevent="deleteNote(note.id)">
                                        <i class="fas fa-trash" title="delete notes"></i>
                                    </button> 
                                </div>   
                                <p>{{note.body}}</p>
                            </li>
                        </ul>

                    </template>

                    <button v-if="normal" class="btn btn-primary btn-sm ml-3" @click.prevent="setCreating">
                        Add new <i class="fas fa-plus"></i>
                    </button>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {

    props: {
        claimId: {
            required: true,
            type: String
        }
    },

    data() {
        return {
            notes: [],
            creating: false,
            editing: false,
            viewing: false,
            normal: true,
            noteId: null,
            note: {
                title: null,
                body: null
            }
        }
    },

    methods: {
        
        setViewing(id) {
            this.setNote(id)
            .then(() => {
                this.getNote()
                this.viewing = true
                this.normal = false
            })
        },

        setEditing(id) {
            this.setNote(id)
            .then(() => {
                this.getNote()
                this.editing = true
                this.normal = false
            })
        },

        setCreating() {
            this.creating = true
            this.normal = false
            this.noteId = null
        },

        setNormal() {
            this.normal = true
            this.creating =  false
            this.editing = false
            this.viewing = false
            this.note.title = null
            this.note.body = null
        },

        add() {
            let notes = this.notes
            this.notes.push({...this.note, id: parseInt(this.notes.length) + 1})
            this.$axios.post('provider/claim/notes/store', {
                'claim_id': this.claimId,
                'title': this.note.title,
                'body': this.note.body,
                'provider_id': this.user.id
            })
            .then(({data}) => {
                if(!data.hasOwnProperty('id')) {
                    this.notes = notes
                    this.$toast.show("Could not store new Note").goAway(5000)
                }
                else {
                    this.$toast.show("Note saved").goAway(5000)
                }
            })
            .catch(()=> {
                this.notes = notes
                this.$toast.show("Could not store new Note").goAway(5000)
            })
            this.setNormal()
        },

        edit() {

            let oldNotes = {...this.notes}
            let notes = this.notes.filter(note => note.id !== this.noteId)
            
            this.notes = [...notes, {id: this.noteId, ...this.note}]  
            //this.notes.push({...this.note, id: parseInt(this.notes.length) + 1})
            
            this.updateNote(oldNotes)

            this.setNormal()
        },

        deleteNote(id) {
            
            let oldNotes = {...this.notes}
            if(!confirm("Are you sure you want to delete notification?")) return 
            
            this.setNote(id).then(() => {

                this.notes = this.notes.filter(note => note.id !== this.noteId)
                
                this.$axios.post(`provider/claim/notes/${this.noteId}/destroy`)
                .then((res) => {
                    this.$toast.show("Notes updated").goAway(5000);
                })
                .catch(e => {
                    this.$toast.show("Something went wrong in updating notes").goAway(5000);
                    this.notes = oldNotes
                })

            })

            this.setNormal()
        
        },

        setNote(id) {
            return new Promise((resolve) => {
                this.noteId = id
                resolve()
            })
        },

        getNote() {
            let note = this.notes.find(note => note.id === this.noteId)
            this.note.title = note.title
            this.note.body = note.body
            return note
        },

        getNotes() {
            this.$axios.post(`provider/claim/notes/${this.claimId}`)
            .then(({data}) => {
                if(!Object.entries(data).length) {
                    this.notes = []
                    return  
                }
                this.notes = data   
            })
            .catch(e => {
                console.log(e)
            })
        },

        updateNote(oldNotes) {
            this.$axios.post(`provider/claim/notes/${this.noteId}/update`, {
                'title': this.note.title,
                'body': this.note.body,
                'provider_id': this.user.id
            })
            .then(({data}) => {
                if(!data.hasOwnProperty('id')) {
                    this.notes = oldNotes
                    this.$toast.show("Could not update Note").goAway(5000)
                }
                else {
                    this.$toast.show("Notes updated").goAway(5000)
                }
            })
            .catch(()=> {
                this.notes = oldNotes
                this.$toast.show("Could not update Note").goAway(5000)
            })  
        }

    },

    // created() {
    //     this.getNotes()
    // }

}
</script>
