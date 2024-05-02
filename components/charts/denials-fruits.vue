<template>

  <div class="card">
    <div class="card-header">
        <h4 class="card-title">Denials</h4>
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

          <div class="float-left" v-if="graphData">
            <p>Percentage of avoidable Denials {{graphData.percent_avoidable}}%</p>
            <p>Average avoidable denial amount 
              {{graphData.avg_avoiable_amount ? formatter(graphData.avg_avoiable_amount).split('.')[0] : 0}}
            </p>
            <p>Total avoidable denied amount 
              {{graphData.total_avoidable_amount ? formatter(graphData.total_avoidable_amount).split('.')[0] : 0}}
            </p>
            <p>No of avoidable denial line items {{digitFormatter(graphData.total_avoidable_number)}}</p>
          </div>
          <div class="clearfix"></div>
          <small v-if="originalData">
            <p class="text-dark" v-if="originalData.date">
              Showing results for these Dates:
              <strong>{{$moment(originalData.date[0]).format('ll')}}</strong> To
              <strong>{{$moment(originalData.date[originalData.date.length - 1]).format('ll')}}</strong>
            </p>
          </small>

          <canvas ref="canvas"></canvas>

           <div class="float-left ml-1" v-if="graphData">
            <p>Percentage of collectables {{graphData.percent_opportunity}}%</p>
            <p>Average collectables amount 
              {{graphData.avg_missed_opp_amount ? formatter(graphData.avg_missed_opp_amount).split('.')[0] : 0}}
            </p>
            <p>Total collectables amount 
              {{graphData.total_missed_opp_amount ? formatter(graphData.total_missed_opp_amount).split('.')[0] : 0}}
            </p>
            <p>No of collectable line items {{digitFormatter(graphData.total_missed_opp_number)}}</p>
          </div>
          <div class="clearfix my-1"></div>

        </div>
    </div>
  </div>


</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {

   data() {

    return {
      range  : 'daily',
      type   : 'pie',
      chart  : null
    };

  },

  computed: {

    ...mapGetters('graphs', {
      graphData        : 'graphData',
      originalData     : 'originalData',
      denialFruitsData : 'denialFruitsData'
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

    },
  },

  watch: {
    graphData(value) {
      this.renderChart(value)
    },

    denialFruitsData(value) {
      this.renderChart(value)
    }

  },

  methods: {

    ...mapActions({
      setRequestToFalse : 'graphs/setRequestToFalse',
      load              : 'graphs/load'
    }),

    renderChart(value) {
      this.destroyChart()
      this.render(this.chartData(value), this.chartOptions, this.type)
    },

    chartData(data = []) {
      if(!data.hasOwnProperty('date')) return []
      return {
        labels: ["Collectables", "Avoidable denials"],
        datasets: [{
            label: "Denials",
            data: [data.percent_opportunity, data.percent_avoidable],
            backgroundColor: ['#ff4961', '#fcc724'],
            borderColor: 'transparent',
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
      this.load({load:false, range:this.range, graph_name:'denialFruitsData'})
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
