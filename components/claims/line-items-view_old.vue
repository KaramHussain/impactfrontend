<template>
  <div>

    <a href="#" @click.prevent="$emit('edit', 'patientLineItems')">
      <i class="fas fa-pen"></i>
    </a>

    <table class="table mb-sm claim-table">

      <thead>
        <tr>
          <td>Line</td>
          <td>POS</td>
          <td>CPT</td>
          <td>Description</td>
          <td>Diag</td>
          <td>Units</td>
          <td>Charged</td>
          <td>Patient Responsibility</td>
        </tr>
      </thead>

      <template v-if="lineItems.length">
        <tbody>
          <tr v-for="(item, index) in lineItems" :key="index">
            
            <td>{{parseInt(index) + 1}}</td>
            <td>{{placeOfService}}</td>
            <td>{{item['PROCEDURE CODE']}}</td>
            <td></td>
            <td>
              <span v-for="(dx, i) in dxPointers(index)" :key="i">
                {{dx}} <span v-if="i !== dxPointers(index).length - 1">,</span>
              </span>
            </td>
            <td>{{item['SERVICE UNIT COUNT']}}</td>
            <td>{{formatter(chargeAmount(item))}}</td>
            <td>{{formatter(patientResponsibility(item))}}</td>
          </tr>
        </tbody>
      </template>

    </table>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {

    ...mapGetters('claims', {
      lineItems: 'lineItems',
      claimInfo: 'claimInfo',
      pos      : 'pos',
      pos_all  : 'pos_all',
      dxPointers: 'dxPointers',
      patientResponsibility: 'patientResponsibility',
      chargeAmount: 'chargeAmount'
    }),

    placeOfService() {
      const pos = this.pos_all.find(item => item.code == this.pos);
      return pos != null && pos !== undefined ? pos.name : null
    }

  },

  methods: {
    ...mapActions('claims', {
      getPosTos: 'getPosTos'
    })
  },

  created() {
    this.getPosTos()
  }

}
</script>

