<template>
  <div class="card pull-up">
      <div class="card-header bg-hexagons">
          <h4 class="card-title">Expected Revenue</h4>
          <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
          <div class="heading-elements">
              <ul class="list-inline mb-0">
                  <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
              </ul>
          </div>
      </div>
      <div class="card-content collapse show bg-hexagons">
          <div class="card-body pt-0">
              <div class="chartjs">
                  <canvas id="expected-revenue-doughnut" height="275" ref="canvas"></canvas>
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
      type  : 'hitRateDoughnut',
      chart : null,
      customDoughnut : null
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

        layout: {
          padding: {
            left: 16,
            right: 16,
            top: 16,
            bottom: 16
          }
        },

        cutoutPercentage: 92,
        animation: {
          animateScale: false,
          duration: 2500
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
        labels: ["Patient Expected", "Insurance Expected", "Pending EOB"],
        datasets: [
          {
            label: "Favourite",
            backgroundColor: ["#00a5a8", "#28d094", "#626e82"],
            data: [data.patient_expected_rev, data.insurance_expected_rev, "1000"]
          }
        ]
      };

    },

    render(data, options = {}, type = "line") {

      Chart.controllers.hitRateDoughnut = this.customDoughnut;
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

    setChartCustomSettings(data = {}) {

      Chart.defaults.hitRateDoughnut = Chart.defaults.doughnut;

      var draw = Chart.controllers.doughnut.prototype.draw;
      let vm = this
      this.customDoughnut = Chart.controllers.doughnut.extend({
        draw: function () {
          draw.apply(this, arguments);
          var ctx = this.chart.chart.ctx;
          var _fill = ctx.fill;
          var width = this.chart.width,
            height = this.chart.height;

          var fontSize = (height / 114).toFixed(2);
          this.chart.ctx.font = fontSize + "em Verdana";
          this.chart.ctx.textBaseline = "middle";


          var expectedRevenue = data.hasOwnProperty('expected_revenue') ? data.expected_revenue : '0'

          var text = vm.priceShorter(expectedRevenue),
            textX = Math.round(
              (width - this.chart.ctx.measureText(text).width) / 2
            ),
            textY = height / 1.55;
          this.chart.ctx.fillStyle = '#00a5a8';
          if ($('html').data('textdirection') == 'rtl') {
            textX = Math.round(
              (width - this.chart.ctx.measureText(text).width) / 1.15
            )
          }
          this.chart.ctx.fillText(text, textX, textY);

          ctx.fill = function () {
            ctx.save();
            ctx.shadowColor = "#bbbbbb";
            ctx.shadowBlur = 30;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 30;
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

