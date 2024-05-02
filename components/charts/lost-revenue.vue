<template>
  <div class="card pull-up">
    <div class="card-content collapse show bg-gradient-directional-danger">
      <div class="card-body bg-hexagons-danger">
          <h4 class="card-title white">Lost revenue
          </h4>
          <div class="chartjs">
              <canvas id="deals-doughnut" height="275" ref="canvas"></canvas>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import Chart from 'chart.js'
import { mapGetters, mapActions } from 'vuex'

export default {

  data() {

    return {
      range : 'daily',
      type  : 'dealsDoughnut',
      chart : null,
      customDealDoughnut : null
    };

  },

  watch: {
    graphData(value) {
      this.renderChart(value)
    }
  },

  computed: {

    ...mapGetters('graphs', {
      requestForGraphs : 'requestForGraphs',
      graphDates       : 'graphDates',
      graphData        : 'graphData',
      originalData     : 'originalData'
    }),

    chartOptions() {
      return {
        responsive: true,
        title: {
          display: false
        },
        legend: {
          display: true
        },
        elements: {},
        layout: {
          padding: {
            left: 16,
            right: 16,
            top: 16,
            bottom: 16
          }
        },
        cutoutPercentage: 94,
        animation: {
          animateScale: false,
          duration: 5000
        }
      }
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
      this.setChartCustomSettings(value)
    },

    chartData(data = []) {

      return {
        labels: ["Patient lost", "Insurance lost"],
        color: "#fff",
        datasets: [
          {
            label: "Favourite",
            borderWidth: 0,
            backgroundColor: ["#ff7b8c", "#fff"],
            data: [data.patient_lost_rev, data.insurance_lost_rev]
          }
        ]
      };

    },

    render(data, options = {}, type = "line") {

      Chart.controllers.dealsDoughnut = this.customDealDoughnut;
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
    },

    setChartCustomSettings(data = []) {

      Chart.defaults.dealsDoughnut = Chart.defaults.doughnut;
      var draw = Chart.controllers.doughnut.prototype.draw;
      let vm = this
      this.customDealDoughnut = Chart.controllers.doughnut.extend({
        draw: function () {
          draw.apply(this, arguments);
          var ctx = this.chart.chart.ctx;
          var _fill = ctx.fill;
          var width = this.chart.width,
            height = this.chart.height;

          var fontSize = (height / 114).toFixed(2);
          this.chart.ctx.font = fontSize + "em Verdana";
          this.chart.ctx.textBaseline = "middle";

          var lostRevenue = data.hasOwnProperty('lost_revenue') ? data.lost_revenue : '0'

          var text = vm.priceShorter(lostRevenue),
            textX = Math.round(
              (width - this.chart.ctx.measureText(text).width) / 2
            ),
            textY = height / 1.6;
          this.chart.ctx.fillStyle = '#fff';
          if ($('html').data('textdirection') == 'rtl') {
            textX = Math.round(
              (width - this.chart.ctx.measureText(text).width) / 1.15
            )
          }
          this.chart.ctx.fillText(text, textX, textY);

          ctx.fill = function () {
            ctx.save();
            ctx.shadowColor = "#FF4961";
            ctx.shadowBlur = 30;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 12;
            _fill.apply(this, arguments);
            ctx.restore();
          };
        }
      });

    }

  },

  mounted() {

    this.setChartCustomSettings();
    this.render(this.chartData(this.graphData), this.chartOptions, this.type)

  }

}
</script>

