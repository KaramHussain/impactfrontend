<template>

  <div class="row">

    <div class="col-12">
      <div class="card">
          <div class="card-header">
              <h4 class="card-title">Paid work revenue</h4>
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

                    <select class="form-control form-control-sm" v-model="range" @change="reload(false)">
                      <option value="yearly">View yearly</option>
                      <option value="quarterly">View quarterly</option>
                      <option value="monthly">View monthly</option>
                      <option value="daily">View daily</option>
                    </select>

                  </div>

                  <small v-if="originalData">
                    <p class="text-dark" v-if="originalData.date">
                      Showing results for these EOB Dates:
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

import {mapActions, mapGetters} from 'vuex'

export default {

  data() {

    return {
      range : 'daily',
      type  : 'bar',
      chart : null
    };

  },

  computed: {

    ...mapGetters('graphs', {
      graphData             : 'graphData',
      originalData          : 'originalData',
      paidAmountRevenueData : 'paidAmountRevenueData'
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
            stacked:true
          }],
          xAxes: [{
            stacked:true
          }]
        },
        title: {
            display: true,
            text: 'Paid amount revenue'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "$" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        },
      };
    }

  },

  watch: {

    graphData(value) {
      this.renderChart(value)
    },

    paidAmountRevenueData(value) {
      this.renderChart(value)
    }

  },


  methods: {

    ...mapActions({
      load   : 'graphs/load'
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
            label: "Denied work value",
            data: data.denied_work_value,
            backgroundColor: "#B82818",
            hoverBackgroundColor: "#B82818",
            borderColor: "transparent",
            barThickness : 100,
            stack:'0'
          },{
            label: "Paid work value",
            data: data.paid_work_value,
            backgroundColor: "#233830",
            hoverBackgroundColor: "#233830",
            borderColor: "transparent",
            barThickness : 100,
            barPercentage : 0.2,
            stack:'0'
        },{
            label: "Denied operational cost",
            data: data.denied_op_cost,
            backgroundColor: "#924469",
            hoverBackgroundColor: "#924469",
            borderColor: "transparent",
            barThickness : 100,
            stack:'1'
        }, {
            label: "Paid operational cost",
            data: data.paid_op_cost,
            backgroundColor: "#2a9d8f",
            hoverBackgroundColor: "#2a9d8f",
            borderColor: "transparent",
            barThickness : 100,
            stack:'1'
        }]
      }
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
      this.load({load:false, range:this.range, graph_name:'paidAmountRevenueData'})
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
