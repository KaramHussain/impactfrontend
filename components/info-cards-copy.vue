<template>
  <!--Info cards -->
  <div class="row">
    <div class="col-xl-4 col-lg-6 col-md-6 col-12">

        <div class="card pull-up">
            <div class="card-content">
                <div class="card-body">
                    <div class="media d-flex">
                        <div class="align-self-center">
                            <i class="la la-user font-large-2 success"></i>
                        </div>
                        <div class="media-body text-right">
                            <h5 class="text-muted text-bold-500">New Buisness</h5>
                            <h3 class="text-bold-600">12</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card pull-up">
            <div class="card-content">
                <div class="card-body">
                    <div class="media d-flex">
                        <div class="align-self-center">
                            <i class="la la-calendar-check-o font-large-2 info"></i>
                        </div>
                        <div class="media-body text-right">
                            <h5 class="text-muted text-bold-500">Days to collect</h5>
                            <h3 class="text-bold-600" v-if="graphData">
                              {{Math.round(Number(graphData.avg_days_to_eob || 0))}}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card pull-up">
            <div class="card-content">
                <div class="card-body">
                    <div class="media d-flex">
                        <div class="align-self-center">
                            <i class="fas fa-dollar-sign font-large-2 paid-claims"></i>
                        </div>
                        <div class="media-body text-right">
                            <h5 class="text-muted text-bold-500">Paid claims</h5>
                            <h3 class="text-bold-600" v-if="graphData">
                              <span v-if="graphData.total_paid_amount">
                                {{priceShorter(graphData.total_paid_amount)}}
                              </span>
                              <span v-else>
                                {{formatter(graphData.total_paid_amount|| 0)}}
                              </span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="col-xl-4 col-lg-6 col-md-6 col-12">
      <expectedRevenue />
    </div>

    <div class="col-xl-4 col-lg-6 col-md-6 col-12">
      <lostRevenue />
    </div>

  </div>
  <!--Info cards Ends -->
</template>

<script>
 import {mapGetters, mapActions} from 'vuex'
 import expectedRevenue from './charts/expected-revenue'
 import lostRevenue from './charts/lost-revenue'

 export default {

  components: {
    expectedRevenue,
    lostRevenue
  },

  computed: {
    ...mapGetters('graphs', {
      graphData : 'graphData'
    }),
    expectedRevenue() {
      let total = 0
      if(this.graphData.hasOwnProperty('patient_responsibility')) {
        this.graphData.patient_responsibility.map((value, index) => {
          total = parseFloat(total) + parseFloat(value)
        })
      }
      return this.formatter(total)
    }
  }

 }

</script>

<style>
  .paid-claims {
    color:#28D094;
  }
</style>
