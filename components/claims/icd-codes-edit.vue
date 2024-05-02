<template>

  <div class="mb-2">
    
    <table class="table my-1 claim-table" ref="icdCodesTable">

      <thead>
        <tr>

          <td>Item</td>
          <td>Icd</td>
          <td>Description</td>
          <td>
            <button class="btn btn-primary btn-sm" @click.prevent="save">save</button>
            <button class="btn btn-light btn-sm bg-white" @click.prevent="cancel">cancel</button>
          </td>

        </tr>
      </thead>

      <tbody v-if="icds.length">

        <tr v-for="(icd, index) in icds" :key="index">
          <td>{{parseInt(index) + 1}}</td>
          <td>
            <div class="position-relative">
              <input @keyup="fetchSuggestions({text: $event.target.value, type: 'icds'})" v-model="claimIcds[parseInt(index)]" class="form-control form-control-sm w-50" />
              <suggestions-box @select="selectValue($event, icd, index)" />
            </div>
          </td>
          <td></td>
          <td>
            <button class="btn btn-danger btn-sm" @click.prevent="removeIcdCode(icd)">
              Remove <i class="fas fa-times"></i>
            </button>
          </td>
        </tr>

      </tbody>

    </table>

    <button :disabled="maxThreasholdReached" class="btn btn-secondary btn-sm" @click.prevent="saveNewIcdCode">
      Add new <i class="fas fa-plus"></i>
    </button>

  </div>


</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import suggestionsBox from './suggestions-box'
export default {

  components: {
    suggestionsBox
  },

  computed: {

    ...mapGetters('claims', {
      icds: 'icds'
    }),

    claimIcds() {
      return {...this.icds}
    },

    maxThreasholdReached() {
      return this.icds.length >= 12
    },

  },
  methods: {

    ...mapActions('claims', {
      addNewIcdCode: 'addNewIcdCode',
      removeIcdCode: 'removeIcdCode',
      updateExistingIcdCode: 'updateExistingIcdCode',
      setChanges: 'setClaimInfo',
      fetchSuggestions: 'fetchSuggestions',
      fillSuggestions : 'fillSuggestions'
    }),

    save() {
      this.setChanges(Object.values(this.claimIcds))
      .then(() => {
        this.$emit('cancel')
      })
    },

    cancel() {
      let data = JSON.parse(localStorage.getItem("claim_dx"))
      data = data != null ? Object.values(data) : []
      this.setChanges(data)
      .then(() => {
        this.$emit('cancel')
      })
    },

    saveNewIcdCode() {
      if(this.maxThreasholdReached) return
      console.log("%c Saving new icd code...", "color:orange;font-weight:bold")
      this.addNewIcdCode(Object.values(this.claimIcds))
      console.log("%c Saved", "color:green;font-weight:bold")
    },

    selectValue(value, icd, index) {
      this.updateExistingIcdCode({value, icd, index}).then(() => {
        this.fillSuggestions([])
      })
    }

  },

  mounted() {
    localStorage.setItem('claim_dx', JSON.stringify(this.claimIcds))
  }


}
</script>


