<template>
  <div>

    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Impact Analysis Summary</h4>
        <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
        <div class="heading-elements">
            <ul class="list-inline mb-0">
                <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
                <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                <li><a data-action="close"><i class="ft-x"></i></a></li>
            </ul>
        </div>
      </div>

      <div class="card-content collapse show">

        <div class="card-body">

          <div class="clearfix"></div>

          <div class="flex">

            <div class="flex-1" v-if="graphData">
              <p>No of paid claims: {{digitFormatter(graphData.total_paid_claims)}}</p>
              <p>No of paid line items: {{digitFormatter(graphData.total_paid_lines)}}</p>
              <p>Average paid amount: 
                {{ graphData.avg_paid_amount ? formatter(graphData.avg_paid_amount).split('.')[0] : 0 }}
              </p>
            </div>

            <div class="flex-1">
              <canvas ref="canvas"></canvas>
            </div>

            <div class="flex-1" v-if="graphData">
              <p>No of denied claims: {{digitFormatter(graphData.total_denied_claims)}}</p>
              <p>No of denied line items: {{digitFormatter(graphData.total_denied_lines)}}</p>
              <p>Average denied amount: 
                {{graphData.avg_denied_amount ? formatter(graphData.avg_denied_amount).split('.')[0] : 0}}
              </p>
            </div>

          </div>

          <hr>
          <div v-if="graphData">
            <p>No of file(s):{{graphData.num_of_batches}}</p>
            <p>Total claims: {{digitFormatter(graphData.total_claims)}}</p>
            <p>Total line items: {{digitFormatter(graphData.total_lines)}}</p>
            <p>Total charge amount: 
              {{ graphData.total_charge_amount ? formatter(graphData.total_charge_amount).split('.')[0] : 0 }}
            </p>
            <i>{{graphData.denied_ratio}} claims are denied per paid claim</i><br>
            <i>{{graphData.denied_lines_ratio}} line items are denied per paid line items</i>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {

  data() {

    return {
      range : 'daily',
      type  : 'pie',
      chart : null
    };

  },

  computed: {

    ...mapGetters('graphs', {
      requestForGraphs : 'requestForGraphs',
      graphDates       : 'graphDates',
      graphData        : 'graphData',
      originalData     : 'originalData'
    }),

    chartOptions () {
      return {
        responsive: true,
        maintainAspectRatio: true,
        responsiveAnimationDuration:500,
        ticks: {
          beginAtZero : true,
          callback: function(value, index, values) {
            return this.formatter(value).split('.')[0]
          }.bind(this),
        }
      }

    }

  },

  watch: {
    graphData(value) {
      this.renderChart(value)
    }
  },

  methods: {

    ...mapActions({
      setRequestToFalse : 'setRequestToFalse',
      load              : 'graphs/load'
    }),

    renderChart(value) {
      this.destroyChart()
      this.render(this.chartData(value), this.chartOptions, this.type)
    },

    chartData(data = []) {
      if(!data.hasOwnProperty('date')) return []
      return {
        labels: ["paid", "denied"],
        datasets: [{
            label: "Summary",
            data: [data.total_paid_amount, data.total_denied_amount],
            backgroundColor: ['#4ed8a7', 'red'],
        }]
      };

    },

    render(data, options = {}, type = "line") {

      let ctx = this.$refs.canvas.getContext('2d');

      this.chart = new Chart(ctx, {

        type,

        data,

        options

      })
    },

    reload() {
      this.destroyChart()
      this.load({load:false, range:this.range})
    },

    destroyChart() {
      this.chart.destroy()
    }

  },

  mounted() {
    this.render(this.chartData(this.graphData), this.chartOptions, this.type)
  }

}

</script>
