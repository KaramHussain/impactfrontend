<template>

  <main>

    <div class="w-50 float-right clearfix">
      <p class="ml-1 text-dark">Date of service</p>
      <div class="row mb-2 m-0 p-0">
        <div class="col-5">
          <input class="form-control form-control-sm" type="date" v-model="startDate">
        </div>

        <div class="col-5">
          <input class="form-control form-control-sm" type="date" v-model="endDate">
        </div>

        <div class="col-2">
          <button :disabled="requestForGraphs || (endDate==null && startDate ==null)" @click.prevent="reload" class="btn btn-primary btn-sm">Filter</button>
        </div>

      </div>
    </div>

    <div class="clearfix"></div>

  </main>


</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {

  computed: {
    ...mapGetters({
      requestForGraphs : 'graphs/requestForGraphs',
      graphDates       : 'graphs/graphDates'
    }),

    startDate: {
      set(value) {
        this.editGraphDates({value, type:'startDate'})
      },
      get() {
        return this.graphDates.startDate
      }
    },

    endDate: {
      set(value) {
        this.editGraphDates({value, type:'endDate'})
      },
      get() {
        return this.graphDates.endDate
      }
    }

  },

  methods: {

    ...mapActions({
      requestForFilterGraphs : 'graphs/requestForFilterGraphs',
      editGraphDates         : 'graphs/editGraphDates'
    }),

    reload() {
      if(this.startDate == null || this.endDate == null) {
        return false
      }
      this.requestForFilterGraphs();
    },

  }

}

</script>

