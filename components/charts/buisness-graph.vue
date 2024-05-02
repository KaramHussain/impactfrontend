<template>
  <div class="row" id="ia-business-graph">
    <div class="col-12">
      <div class="card">
          <div class="card-header">
              <h4 class="card-title">Buisness IQ</h4>

              <small v-if="originalData">
                <p class="text-dark" v-if="originalData.date">
                  Showing results for these Dates:
                  <strong>{{$moment(originalData.date[0]).format('ll')}}</strong> To
                  <strong>{{$moment(originalData.date[originalData.date.length - 1]).format('ll')}}</strong>
                </p>
              </small>

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
                  <div class="form float-right w-25">

                    <select class="form-control form-control-sm" v-model="range" @change="reload">
                      <option value="yearly">View yearly</option>
                      <option value="quarterly">View quarterly</option>
                      <option value="monthly">View monthly</option>
                      <option value="daily">View daily</option>
                    </select>

                  </div>

                  <canvas ref="canvas" style="height:300px !important"></canvas>

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
      chart : null
    };

  },

  computed: {

    ...mapGetters('graphs', {
      graphData         : 'graphData',
      buisnessGraphData : 'buisnessGraphData',
      originalData      : 'originalData'
    }),

    chartOptions() {

      return {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            position: 'top',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{

                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },

                scaleLabel: {
                    display: true,
                    labelString: this.range
                },

                ticks: {
                    beginAtZero: true,
                    fontSize: 12,
                    lineHeight:1.9,
                    padding:8
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
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
            text: 'Buisness graph'
        },

        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "$" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          }
        }

      };
    }

  },

  watch: {
    graphData(value) {
      this.renderChart(value)
    },
    buisnessGraphData(value) {
      this.renderChart(value)
    }
  },

  methods: {

    ...mapActions({
      load  : 'graphs/load'
    }),

    renderChart(value) {
      this.destroyChart()
      this.render(this.chartData(value), this.chartOptions, this.type)
    },

    reload() {
      this.destroyChart()
      this.load({load:false, range:this.range, graph_name:"buisnessGraphData"})
    },

    destroyChart() {
      this.chart.destroy()
    },

    chartData(data = []) {
      if(!data.hasOwnProperty('date')) return []
      return {
        labels: data.date,
        datasets: [{
            label: "Paid",
            data: data.paid_amount,
            fill: false,
            //borderDash: [5, 5] border dashed,
            borderColor: "#28D094",
            pointBorderColor: "#28D094",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 1,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }, {
            label: "Denials",
            data: data.denied_amount,
            lineTension: 0,
            fill: false,
            borderColor: "red",
            pointBorderColor: "red",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 1,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        },{
            label: "Patient Responsibility",
            data: data.patient_responsibility,
            lineTension: 0,
            fill: false,
            borderColor: "#fcbe03",
            pointBorderColor: "#fcbe03",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
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
    }

  },

  mounted() {
    this.render(this.chartData(this.graphData), this.chartOptions, this.type)
  }

}

</script>
