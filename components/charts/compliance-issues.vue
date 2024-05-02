<template>

  <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Compliance issues</h4>
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
                  <div class="form float-right w-25 clearfix">

                    <select class="form-control form-control-sm" v-model="range" @change="reload(false)">
                      <option value="yearly">View yearly</option>
                      <option value="quarterly">View quarterly</option>
                      <option value="monthly">View monthly</option>
                      <option value="daily">View daily</option>
                    </select>

                  </div>
                  <div class="clearfix"></div>

                  <small v-if="originalData">
                    <p class="text-dark" v-if="originalData.date">
                      Showing results for these Dates:
                      <strong>{{$moment(originalData.date[0]).format('ll')}}</strong> To
                      <strong>{{$moment(originalData.date[originalData.date.length - 1]).format('ll')}}</strong>
                    </p>
                  </small>

                  <div class="row">

                    <div class="col-12 col-lg-4 col-md-5 col-xl-3" v-if="graphData">
                      <h4 class="heading-4">Summary</h4>

                      <p>Total Monetary value: {{formatter(graphData.total_compliance_amount)}}</p>

                      <p>Line items with compliance issues: {{digitFormatter(graphData.total_compliance_number)}}</p>

                      <p>Average: {{formatter(graphData.avg_complian_amount)}}</p>


                      <i>{{graphData.percent_compliance}}% of line items have compliance related issues</i>
                    </div>

                    <div class="col-12 col-lg-8 col-md-7 col-xl-9">

                      <canvas ref="canvas"></canvas>

                    </div>

                  </div>


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
      type  : 'horizontalBar',
      chart : null
    };

  },

  computed: {

    ...mapGetters('graphs', {
      graphData             : 'graphData',
      complianceIssuesData  : 'complianceIssuesData',
      originalData          : 'originalData'
    }),

    chartOptions() {
      return {
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        // responsive: true,
        // maintainAspectRatio: true,
        // responsiveAnimationDuration:500,
        legend: {
            position: 'top',
        },
        scales: {
          offset:true,
            xAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                },
                ticks: {
                  beginAtZero: true,
                  fontSize: 12,
                  callback: function(value, index, values) {
                    return this.formatter(value).split('.')[0]
                  }.bind(this),
                },

            }],
            yAxes: [{
                offset:true,
                display: true,
                beginAtZero: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                    offsetGridLines: true,
                    offset:true
                },
                scaleLabel: {
                    display: true,
                },
                ticks: {
                  beginAtZero: true,
                  padding:15,
                  lineHeight:3,
                },
            }]
        },
        title: {
            display: true,
            text: 'Compliance issues'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "$" + tooltipItem.xLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        },
      }
    }
  },

  watch: {

    graphData(value) {
      this.renderChart(value)
    },

    complianceIssuesData(value) {
      this.renderChart(value)
    }

  },

  methods: {

    ...mapActions({
      load : 'graphs/load'
    }),

    renderChart(value) {
      this.destroyChart()
      this.render(this.chartData(value), this.chartOptions, this.type)
    },

    chartData(data = []) {
      if(!data.hasOwnProperty('date')) return []
      return {
        labels: data.date,
        datasets: [{
            label: "Compliance issues",
            data: data.compliance_amount,
            backgroundColor: "#F03C4B",
            hoverBackgroundColor: "#ed1e36",
            borderColor: "transparent"
        }]
      }
    },

    render(data, options = {}, type = "line") {

      this.$refs.canvas.style.height = "500px";
      let ctx = this.$refs.canvas.getContext('2d');

      this.chart = new Chart(ctx, {

        type,

        data,

        options

      })
    },

    reload() {
      this.destroyChart()
      this.load({load:false, range:this.range, graph_name:'complianceIssuesData'})
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

<style lang="scss" scoped>

</style>
