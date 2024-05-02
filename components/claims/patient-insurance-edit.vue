<template>

  <div class="card">
     <h4 class="card-header">
      Insurance
      <template>
        <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">save</button>
        <button class="btn btn-light btn-sm bg-white" @click.prevent="$emit('cancel')">cancel</button>
      </template>
    </h4>

    <div class="card-body">

      <table class="w-100 claim-table" border="2">

        <tr>
          <td colspan="2">
            <div v-if="hasPayer" class="form-group">

              Company name: <input type="text" class="form-control form-control--sm mb-xs" v-model="claimPayer[
              'Payer Last Name']" />
              Payer type: <input type="text" class="form-control form-control--sm mb-xs" v-model="claimPayer.payer_type" />
              Payer id: <input type="text" class="form-control form-control--sm" v-model="claimPayer['Payer Payor Identification']" />

            </div>

          </td>
        </tr>

        <tr>
          <td class="text--dark">Relation:</td>
          <td>
            <input v-if="hasPayer" class="form-control form-control--sm" v-model="claimPayer.person" />
          </td>
        </tr>

        <tr>
          <td class="text--dark">Member:</td>
          <td>45678</td>
        </tr>

      </table>

    </div>

  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {

    ...mapGetters('claims', {
      payer: 'payer',
      hasPayer: 'hasPayer'
    }),

    claimPayer() {
      return {...this.payer}
    }

  },

  methods: {

    ...mapActions('claims', {
      updatePayer: 'updatePayer'
    }),

    save() {
      this.updatePayer({payer: this.claimPayer})
      this.$emit('cancel')
    }
  }

}
</script>

