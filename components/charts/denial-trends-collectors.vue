<template>

  <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">

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
                      Showing EOB results for these <span title="Date of service">DOS</span>:
                      <strong>{{$moment(originalData.date[0]).format('ll')}}</strong> To
                      <strong>{{$moment(originalData.date[originalData.date.length - 1]).format('ll')}}</strong>
                    </p>
                  </small>

                  <canvas ref="canvas" style="height:370px"></canvas>

                </div>
            </div>
        </div>
    </div>
  </div>

</template>

<script>

import {graphData} from '~/plugins/graphs-api.js'
import {mapActions, mapGetters} from 'vuex'

export default {

  data() {

    return {
      range : 'daily',
      type  : 'horizontalBar'
    };

  },

  computed: {

    ...mapGetters({
      requestForGraphs : 'requestForGraphs',
      graphDates       : 'graphDates'
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
        responsive: true,
        maintainAspectRatio: true,
        responsiveAnimationDuration:500,
        legend: {
            position: 'top',
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
                },
                ticks: {
                  beginAtZero : true
                }
            }]
        },
        title: {
            display: true,
            text: 'Denial trends'
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
    requestForGraphs(request) {

      if(request == true) {
        this.form.start_date = this.graphDates.start_date
        this.form.end_date = this.graphDates.end_date
        this.reload()
      }
    }
  },

  methods: {

    ...mapActions({
      setRequestToFalse : 'setRequestToFalse'
    }),

    chartData(data = []) {
      return {
        labels: this.graphData.dates,
        datasets: [{
            label: "collector A",
            data: [65, 59, 80, 81, 56],
            backgroundColor: "#28D094",
            hoverBackgroundColor: "rgba(22,211,154,.9)",
            borderColor: "transparent"
        }, {
            label: "collector B",
            data: [28, 48, 40, 19, 86],
            backgroundColor: "#F98E76",
            hoverBackgroundColor: "rgba(249,142,118,.9)",
            borderColor: "transparent"
        }]
      }
    }

  }

}

</script>
