<template>

  <div class="row">

    <div class="col-12">
      <div class="card">
          <div class="card-header">
              <h4 class="card-title">Collectors Performance</h4>
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
            

                  <small v-if="originalData">
                    <p class="text-dark" v-if="originalData.date">
                      Showing results for these Dates:
                      <strong>{{$moment(originalData.date[0]).format('ll')}}</strong> To
                      <strong>{{$moment(originalData.date[originalData.date.length - 1]).format('ll')}}</strong>
                    </p>
                  </small>

                  <canvas ref="canvas" style="height:370px;"></canvas>

              </div>
          </div>
      </div>
    </div>

  </div>

</template>

<script>
import Chart from 'chart.js';
import {mapActions, mapGetters} from 'vuex'

export default {

  props: {
    types: {
      type: Array,
      default: new Array
    }
  },

  data() {

    return {
      range : 'daily',
      type  : 'bar',
      chart : null
    }

  },

  computed: {

    ...mapGetters('graphs', {
      collectorStats : 'collectorStats',
      originalData   : 'originalData'
    }),

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            position: 'top',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 12,
                callback: function(value, index, values) {
                  return this.formatter(value).split('.')[0]
                }.bind(this),
              padding:8
            },
          }]
        },
        title: {
            display: true,
            text: 'Collectors performance'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "$" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
        }
      }
    }

  },

  watch: {

    collectorStats(value) {
      this.renderChart(value)
    }

  },


  methods: {

    ...mapActions({
      collectData: 'graphs/collectData'
    }),
  

    renderChart(value) {
      this.destroyChart()
      this.render(this.chartData(value), this.chartOptions, this.type)
    },

    chartData(data = []) {
      if(!data.hasOwnProperty('collectors')) return []
      return {
        labels: data.collectors,
        datasets: !this.types.length ? this.datasets(data) : this.createDatasets(data)
      }
    },

    createDatasets(data) {
      let dataset = []
      if(this.types.includes('submitted')) {
        dataset.push(this.dataset("Resubmitted", data.submitted_charges, "#1e9ff2", "#1e9ff2"))
      }
      if(this.types.includes('expected_revenue')) {
        dataset.push(this.dataset("Expected revenue", data.expected_revenue, "#00a5a8", "#00a5a8"))
      }
      if(this.types.includes('collected_revenue')) {
        dataset.push(this.dataset("Collected revenue", data.accepted_charges, "#4ed8a7", "#4ed8a7"))
      }
      return dataset
    },

    datasets(data) {

      return [
        this.dataset("Resubmitted", data.submitted_charges, "#1e9ff2", "#1e9ff2"),
        this.dataset("Expected revenue", data.expected_revenue, "#00a5a8", "#00a5a8"),
        this.dataset("Collected revenue", data.accepted_charges, "#4ed8a7", "#4ed8a7")
      ]
    },

    dataset(label, data, bg, bgHover) {
      return {
        label,
        data,
        backgroundColor: bg,
        hoverBackgroundColor: bgHover,
        borderColor: "transparent",
        barThickness: 100,
        barPercentage: 0.2
      }
    },

    render(data, options = {}, type = "line") {
      
      let ctx = this.$refs.canvas.getContext('2d')

      this.chart = new Chart(ctx, {

        type,

        data,

        options

      })
    },


    destroyChart() {
      this.chart.destroy()
    },

  },

  mounted() {
    this.render(this.chartData(this.collectorStats), this.chartOptions, this.type)
  }


}

</script>
