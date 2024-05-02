<template>

  <div class="my-1">


    <div class="form-group w-50 my-1">
      <label for="">Place of service</label>
      <select class="form-control form-control-sm" v-model="claimPos">
        <option value="0">Please select</option>
        <template v-if="pos_all.length">
          <option :value="pos.code" v-for="pos in pos_all" :key="pos.id">
            {{pos.name}}
          </option>
        </template>
      </select>
    </div>
    
    <button class="btn btn-primary btn-sm" @click.prevent="save">save</button>
    <button class="btn btn-light btn-sm bg-white" @click.prevent="cancel">cancel</button>

    <table class="table my-2 claim-table">
      <thead>
        <tr>
          <td>Line</td>
          <td>CPT</td>
          <td>Description</td>
          <td>Diagnosis</td>
          <td>Units</td>
          <td>Expected</td>
          <td>Patient Responsibility</td>
          <td>Action</td>
        </tr>
      </thead>
      <template v-if="claimLineItems.length">
        <tbody>
          <tr v-for="(item, index) in claimLineItems" :key="index">
            
            <td>{{parseInt(index) + 1}}</td>
          
            <td>
              <div class="position-relative">
                <input @keyup="fetchSuggestions({text: $event.target.value, type: 'cpts'})" type="text" class="form-control form-control-sm" v-model="item['PROCEDURE CODE']">
                <suggestions-box  @select="selectValue($event, item, index)" />
              </div>
            </td>

            <td></td>

            <td>
              <select multiple @change="setPointers({index, element:$event.target, item})" class="w-100">
                <template v-if="icds.length">
                  <option v-for="(pointer, i) in icds" :key="i" :value="parseInt(i) + 1" :selected="pointerExists(i, index)">
                    {{parseInt(i) + 1}}
                  </option>
                </template>
              </select>
            </td>

            <td>
              <input type="number" @change="updateLineItems" v-model="item['SERVICE UNIT COUNT']" class="form-control form-control-sm" placeholder="Code unit">
            </td>
            <td>{{formatter(chargeAmount(item))}}</td>
            <td>{{formatter(patientResponsibility(item))}}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="removeLineItem(index)">
                Remove
              </button>
            </td>

          </tr>

        </tbody>
      </template>

    </table>

    <button @click.prevent="saveNewItem" class="btn btn-secondary btn-sm no-shadow">
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
      lineItems : 'lineItems',
      claimInfo : 'claimInfo',
      pos       : 'pos',
      pos_all   : 'pos_all',
      dxPointers: 'dxPointers',
      icds      : 'icds',
      patientResponsibility: 'patientResponsibility',
      chargeAmount: 'chargeAmount'
    }),

    claimLineItems() {
      return this.lineItems.map(item => ({...item}))
    },

    claimPos: {
      set(value) {
        this.changePos(value)
      },
      get() {
        return this.pos
      }
    },

  },

  methods: {

    ...mapActions('claims', {
      saveLineItem: 'saveLineItem',
      getPosTos: 'getPosTos',
      changePos : 'changePos',
      setPointersInLineItemsIndex : 'setPointersInLineItemsIndex',
      removeLineItem: 'removeLineItem',
      fetchSuggestions: 'fetchSuggestions',
      fillSuggestions : 'fillSuggestions'
    }),

    
    save(lineItems = []) {
      lineItems = lineItems.length ? lineItems : this.claimLineItems
      this.saveLineItem(lineItems)
      .then(() => {
        this.$emit('cancel')
      })
    },

    cancel() {
      this.changePos(JSON.parse(localStorage.getItem("pos")))
      this.save(JSON.parse(localStorage.getItem("lines")))
    },

    storeOriginalLineItems() {
      if(process.browser) {
        localStorage.setItem('lines', JSON.stringify(this.lineItems))
        localStorage.setItem('pos', JSON.stringify(this.pos))
      }
    },

    pointerExists(pointer, index) {
      pointer = parseInt(pointer) + 1
      return this.dxPointers(index).includes(pointer.toString())
    },

    saveNewItem() {
      let lineItems = this.claimLineItems
      lineItems.push(this.newLineItem)
      this.saveLineItem(lineItems)
    },

    newLineItem() {
      return {
        'PROCEDURE CODE': '',
        'LINE ITEM CHARGE AMOUNT': 0,
        'SERVICE UNIT COUNT': 1,
      }
     
    },

    updateLineItems() {
      this.saveLineItem(this.claimLineItems)
    },

    setPointers({index, element, item}) {
      let dxs = [...element.selectedOptions].map(elem => elem.value)
      this.setPointersInLineItemsIndex({key: index, dxs, item})
    },

    selectValue(value, item, index) {
      item = {...item, 'PROCEDURE CODE': value} 
      let claimLineItems = this.claimLineItems
      claimLineItems[index] = item
      this.saveLineItem(claimLineItems).then(() => {
        this.fillSuggestions([])
      })
    }

  },

  created() {
    this.getPosTos()
    this.storeOriginalLineItems()
  }

}
</script>

