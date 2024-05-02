<template>

  <div class="row">

    <div class="col-12">
      <div class="card">
          <div class="card-header">
              <h4 class="card-title">Remark codes</h4>
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
                      Showing results for these Dates:
                      <strong>{{$moment(originalData.date[0]).format('ll')}}</strong> To
                      <strong>{{$moment(originalData.date[originalData.date.length - 1]).format('ll')}}</strong>
                    </p>
                  </small>

                  <canvas id="canvas" style="height:370px;" @click="getCollectorsForRemarkCode"></canvas>

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

  data() {

    return {
      range : 'daily',
      type  : 'bar',
      chart : null
    };

  },

  computed: {

    ...mapGetters('graphs', {
      remarkCodesData  : 'remarkCodesData',
      originalData     : 'originalData'
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
                  return parseInt(value)
                }.bind(this),
              padding:8
            },
          }]
        },
        title: {
            display: true,
            text: 'Remark codes'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "$" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        }
      }
    }

  },

  watch: {

    remarkCodesData(value) {
      //this.renderChart(value)
      this.render(this.chartData(value), this.chartOptions, this.type)
    }

  },


  methods: {

    ...mapActions({
      load: 'graphs/load',
      collectData: 'graphs/collectData'
    }),
    
    getCollectorsForRemarkCode(e) {
      let firstPoint = this.chart.getElementAtEvent(e)[0]
      if(firstPoint == 'undefined' || firstPoint == undefined) return
      let data = this.chart.data
      let label = data.labels[firstPoint._index]
      let value = data.datasets[firstPoint._datasetIndex].data[firstPoint._index]
      console.log(label, value)
    },

    renderChart(value) {
      this.destroyChart()
      this.render(this.chartData(value), this.chartOptions, this.type)
    },

    chartData(data = []) {
      if(!data.hasOwnProperty('date')) return []
      return {
        labels: data.date,
        datasets: [{
            label: "Rejected",
            data: data.rejected_claims,
            backgroundColor: "#F03C4B",
            hoverBackgroundColor: "#F03C4B",
            borderColor: "transparent",
            barThickness: 100,
            barPercentage: 0.2
        }, {
            label: "Denied",
            data: data.denied_claims,
            backgroundColor: "#ff4961",
            hoverBackgroundColor: "#ff4961",
            borderColor: "transparent",
            barThickness: 100
        }, {
  
            label: "Accepted",
            data: data.accepted_claims,
            backgroundColor: "#2a9d8f",
            hoverBackgroundColor: "#2a9d8f",
            borderColor: "transparent",
            barThickness: 100
        }, {
            label: "Processing",
            data: data.processing_claims,
            backgroundColor: "#1e9ff2",
            hoverBackgroundColor: "#1e9ff2",
            borderColor: "transparent",
            barThickness: 100
        }]
      }
    },

    render(data, options = {}, type = "line") {
      
      let ctx = document.querySelector('canvas').getContext('2d');

      this.chart = new Chart(ctx, {

        type,

        data,

        options

      })
    },

    reload() {
      this.destroyChart()
      this.load({ load: false, range: this.range, graph_name: 'remarkCodesData' })
    },

    destroyChart() {
      this.chart.destroy()
    },

    getRemarkCodesData() {

      if(!this.$route.query) {
        return this.$router.push({path: '/claims'})
      } 

      return new Promise((resolve) => {
        
        this.$axios.post('provider/get-remark-codes-with-dates', {type: this.$route.query.type})
        .then(({data}) => {
          this.collectData({data, name: 'remarkCodesData'})
          .then(() => {
            this.load({load:false, range:this.range, graph_name: 'remarkCodesData'})
            resolve()
          })
        })

      })  
      
    }

  },

  mounted() {
    this.getRemarkCodesData()
    .then(() => {
      this.render(this.chartData(this.remarkCodesData), this.chartOptions, this.type)
    })
  }


}

</script>
