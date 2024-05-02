<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Vue from 'vue';
import Chart from 'chart.js';
import {graphData} from '~/plugins/graphs-api'
import {mapGetters, mapActions} from 'vuex'

export default Vue.extend ({

  props: {
    url: {
      type:String,
      default:'http://169.61.216.28:4001/get_graph'
    }
  },

  data() {
    return {
      chart:null,
      type : "line",
      // form: {
      //   start_date : "",
      //   end_date : "",
      //   provider_id : ''
      // },
      //graphData : {},
      viewedData: {},
      //originalData : {},
      fetching:false
    }
  },

  computed: {

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
                    labelString: 'Month'
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
                }
            }]
        },
        title: {
            display: true,
            text: 'Buisness graph'
        }
      };
    },

    form() {
      return {
        start_date : "",
        end_date : "",
        provider_id : this.user.practise_id
      }
    },

  },

  methods: {

    ...mapActions({
      fillGraphData    : 'graphs/fillGraphData',
      fillOriginalData : 'graphs/fillOriginalData',
      load             : 'graphs/load'
    }),

    chartData(data = []) {

      return {
        labels: data.date,
        datasets: [{
            label: "Paid claims",
            data: data.paid_amount,
            fill: false,
            //borderDash: [5, 5] border dashed,
            borderColor: "#9C27B0",
            pointBorderColor: "#9C27B0",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 1,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }, {
            label: "Denied claims",
            data: data.denied_amount,
            lineTension: 0,
            fill: false,
            borderColor: "#FF7D4D",
            pointBorderColor: "#FF7D4D",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 1,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }]
      };
    },

    async loads(load = true) {

      // if(load == false) {

      //   this.fetching = true

      //   this.graphData = await this.sortData(this.originalData)

      //   this.graphData = await this.view(this.graphData, this.range)

      //   this.fillGraphData(this.graphData)

      //   this.render(this.chartData(this.graphData), this.chartOptions, this.type)

      //   this.fetching = false

      //   return

      // }

      this.fetching = true
      await this.fetchData().then(response => {

        this.fetching = false
        //this.originalData = response.data
        this.fillOriginalData(response.data)
        // this.graphData = this.sortData(response.data)
        // this.graphData = this.view(this.graphData, this.range)
        let graphData = this.sortData(response.data)
        graphData = this.view(graphData, this.range)

        this.fillGraphData(graphData)
        //this.render(this.chartData(this.graphData), this.chartOptions, this.type)

      })
      .catch(e => {
        this.fetching = false
      })

    },

    sortData(data) {

      let date = data.date

      date = this.mapDates(date, 'YYYYMMDD')

      let
          denied_amount = data.denied_amount,
          missed_opp_amount = data.missed_opp_amount,
          number_of_claims = data.number_of_claims,
          number_of_denied_claims = data.number_of_denied_claims,
          number_of_line_items = data.number_of_line_items,
          number_of_paid_claims = data.number_of_paid_claims,
          paid_amount = data.paid_amount;

      for(let i = 0; i < date.length; i++) {

        for(let j = i + 1; j < date.length; j++) {

          if(parseInt(date[j]) < parseInt(date[i])) {

            //swap date
            let temp = date[i]
            date[i] = date[j]
            date[j] = temp

            //swap denied_amount
            temp = denied_amount[i]
            denied_amount[i] = denied_amount[j]
            denied_amount[j] = temp

            //swap missed_opp_amount
            temp = missed_opp_amount[i]
            missed_opp_amount[i] = missed_opp_amount[j]
            missed_opp_amount[j] = temp

            //swap number_of_claims
            temp = number_of_claims[i]
            number_of_claims[i] = number_of_claims[j]
            number_of_claims[j] = temp

            //swap number_of_denied_claims
            temp = number_of_denied_claims[i]
            number_of_denied_claims[i] = number_of_denied_claims[j]
            number_of_denied_claims[j] = temp

            //swap number_of_line_items
            temp = number_of_line_items[i]
            number_of_line_items[i] = number_of_line_items[j]
            number_of_line_items[j] = temp

            //swap number_of_paid_claims
            temp = number_of_paid_claims[i]
            number_of_paid_claims[i] = number_of_paid_claims[j]
            number_of_paid_claims[j] = temp

            //swap paid_amount
            temp = paid_amount[i]
            paid_amount[i] = paid_amount[j]
            paid_amount[j] = temp

          }

        }

      }

      date = this.mapDates(date, 'YYYY-MM-DD')


      let new_data = {
        date,
        denied_amount,
        missed_opp_amount,
        number_of_claims,
        number_of_denied_claims,
        number_of_line_items,
        number_of_paid_claims,
        paid_amount
      };


      let response = Object.assign({}, data, new_data)
      return response

    },

    getFormatFromRange(range) {
       switch (range) {
        case "daily":
          return 'll'
          break;

        case "monthly":
          return 'MMM YYYY', 'month'
          break;

        case "yearly":
          return 'YYYY'
          break;
        case "quarterly":
          return 'MMM YYYY', 'month'
          break;

        default:
          return 'll'
          break;
      }
    },

    fetchData() {
      return this.$axios.post(this.url, this.form)
    },

    mapDates(dates, format="ll") {
      dates = dates.map((date) => {
        return this.$moment(date).format(format)
      });
      return dates;
    },

    render(data, options = {}, type = "line") {

      let ctx = this.$refs.canvas.getContext('2d');

      this.chart = new Chart(ctx, {

        type,

        data,

        options

      })
    },

    reload(load = true) {

      this.chart.destroy()
      this.load(load)

    },

    view(data = [], mode = "daily") {
      switch (mode) {
        case "daily":
          return this.viewData(data)
          break;

        case "monthly":
          return this.viewDataMonthly(data, 'MMM YYYY', 'month')
          break;

        case "yearly":
          return this.viewData(data, 'YYYY', 'year')
          break;
        case "quarterly":
          return this.viewDataQuarterly(data, 'YYYY-MM-DD', 'month')
          break;

        default:
          break;
      }

    },

    viewDataMonthly(data, format='MMMM', mode='month') {
      let dates = this.mapDates(data.date, 'YYYY-MM-DD')

      let dateMonths = []

      dates.map((date, index) => {
        let year = date.split('-')[0]
        let month = date.split('-')[1]
        let existedMonth
        if(existedMonth = dateMonths.find(d => d.date.split('-')[0] == year && d.date.split('-')[1] == month)) {
          existedMonth.keys.push(index)
          return
        }
        dateMonths.push({date: date, keys:[index]});
      })

      // console.log(dateMonths, data)

      data = this.parseData(data, dateMonths, format)

      return data;
    },

    viewDataQuarterly(data, format="YYYY-MM-DD", mode="month") {
      data = this.viewData(data, format, mode)
      data = this.parseDataQuarterly(data)
      return data;
    },

    viewData(data, format = 'll', mode="day") {

      let dates = this.mapDates(data.date, 'YYYY-MM-DD')

      let modeKey = this.getModeKey(mode)

      let dateKeys = []

      dates.map((date, index) => {
        let key = date.split('-')[modeKey]
        let existedKey
        if(existedKey = dateKeys.find(d => d.date.split('-')[modeKey] == key)) {
          existedKey.keys.push(index)
          return
        }
        dateKeys.push({date: date, keys:[index]});
      })

      // console.log(dateKeys, data, modeKey)

      data = this.parseData(data, dateKeys, format)

      return data;

    },

    getModeKey(mode="day") {

      if(mode=='day') {
        return 2
      }

      if(mode=='month') {
        return 1
      }

      if(mode=='year') {
        return 0
      }

      return 2 //default

    },

    getMonthGroup(key) {
      if(key >= 0 && key <= 3) {
        return 'quarter1'
      }
      if(key >= 4 && key <= 6) {
        return 'quarter2'
      }
      if(key >= 7 && key <= 9) {
        return 'quarter3'
      }
      if(key >= 10 && key <= 12) {
        return 'quarter4'
      }
    },

    parseData(response, dates, format, applyFormat = true) {

      let date = [],
          denied_amount = [],
          missed_opp_amount = [],
          number_of_claims = [],
          number_of_denied_claims = [],
          number_of_line_items = [],
          number_of_paid_claims = [],
          paid_amount = [],
          compliance_amount = []


      dates.forEach((data) => {

        let dateValue = applyFormat == true ? this.$moment(data.date).format(format) : data.date

        let keys = data.keys
        let denied_value = 0
        let missed_opp_value = 0
        let no_of_claims_value = 0
        let no_of_denied_claims_value = 0
        let number_of_line_items_value = 0
        let number_of_paid_claims_value = 0
        let paid_amount_value = 0
        let compliance_amount_value = 0

        //add date values in array
        date.push(dateValue)

        //sum up every corresponding value by key
        keys.forEach(key => {
          // console.log(key)
          denied_value = parseFloat(denied_value) + parseFloat(response.denied_amount[key])

          missed_opp_value = parseFloat(missed_opp_value) + parseFloat(response.missed_opp_amount[key])

          no_of_claims_value = parseFloat(no_of_claims_value) + parseFloat(response.number_of_claims[key])

          no_of_denied_claims_value = parseFloat(no_of_denied_claims_value) + parseFloat(response.number_of_denied_claims[key])

          number_of_line_items_value = parseFloat(number_of_line_items_value) + parseFloat(response.number_of_line_items[key])

          number_of_paid_claims_value = parseFloat(number_of_paid_claims_value) + parseFloat(response.number_of_line_items[key])

          paid_amount_value = parseFloat(paid_amount_value) + parseFloat(response.paid_amount[key])

          compliance_amount_value = parseFloat(compliance_amount_value) + parseFloat(response.compliance_amount[key])

        })

        denied_amount.push(denied_value.toFixed(2))
        missed_opp_amount.push(missed_opp_value.toFixed(2))
        number_of_claims.push(no_of_claims_value.toFixed(2))
        number_of_denied_claims.push(no_of_denied_claims_value.toFixed(2))
        number_of_line_items.push(number_of_line_items_value.toFixed(2))
        number_of_paid_claims.push(number_of_paid_claims_value.toFixed(2))
        paid_amount.push(paid_amount_value.toFixed(2))
        compliance_amount.push(compliance_amount_value.toFixed(2))

      });

      let data = {
        date,
        denied_amount,
        missed_opp_amount,
        number_of_claims,
        number_of_denied_claims,
        number_of_line_items,
        number_of_paid_claims,
        paid_amount,
        compliance_amount
      };

      // console.log(data)


      let new_response = Object.assign({}, response, data)
      return new_response

    },

    parseDataQuarterly(data) {

      let dates = data.date
      let quarters = []

      dates.map((date, index) => {

        let month = date.split('-')[1]
        let group = this.getMonthGroup(month)

        let existedQuarter = null

        if(group == 'quarter1') {
          if(existedQuarter = quarters.find(quarter => quarter.date == 'Quarter 1')) {
           existedQuarter.keys.push(index)
           return
          }

          quarters.push({date: 'Quarter 1', keys:[index]});
        }

        if(group == 'quarter2') {
          if(existedQuarter = quarters.find(quarter => quarter.date == 'Quarter 2')) {
           existedQuarter.keys.push(index)
           return
          }

          quarters.push({date: 'Quarter 2', keys:[index]});
        }

        if(group == 'quarter3') {
          if(existedQuarter = quarters.find(quarter => quarter.date == 'Quarter 3')) {
           existedQuarter.keys.push(index)
           return
          }

          quarters.push({date: 'Quarter 3', keys:[index]});
        }

        if(group == 'quarter4') {
          existedQuarter = quarters.find(quarter => quarter.date == 'Quarter 4')

          if(existedQuarter = quarters.find(quarter => quarter.date == 'Quarter 4')) {
            existedQuarter.keys.push(index)
            return
          }

          quarters.push({date: 'Quarter 4', keys:[index]});
        }


      })

      quarters = quarters.sort((a, b) => {
        if(a.date < b.date) {
          return -1;
        }
        else if(a.date > b.date) {
          return 1;
        }
        // a and b are the same
        else {
          return 0;
        }
      })

      data = this.parseData(data, quarters, 'll', false)

      return data;
    }

  },

  mounted() {
    //this.loads()
    this.load()
  }

})

</script>
