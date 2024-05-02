import {mapDates, mapDate} from '@/plugins/useful-functions'

export default {

  async load({state, dispatch, commit}, info) {

    const {load, range, graph_name} = info

    if(load == false) {

      commit('setFetching', true)

      //await dispatch('sortData', state.originalData)

      await dispatch('view', {data:state.originalData, mode:range, format:'ll', applyFormat:true, graph_name})

      commit('setFetching', false)

      return

    }

    //state.fetching = true
    await dispatch('fetchData')
    .then(response => {

      commit('setFetching', true)

      dispatch('fillOriginalData', response.data)

      dispatch('fillGraphData', response.data)

      dispatch('view', {data:state.graphData, mode:range, format:'ll', applyFormat:true})

      commit('setFetching', false)

    })
    .catch(e => {
      commit('setFetching', false)
    })

  },

  collectData({dispatch}, data) {
    dispatch('fillOriginalData', data.data)
    dispatch('fillGraphNamedData', data)
    Promise.resolve()
  },

  fillOriginalData({commit}, data) {
    commit('fillOriginalData', data)
  },

  fillGraphData({commit}, data) {
    commit('fillGraphData', data)
  },

  fillGraphNamedData({commit}, data) {
    commit('fillGraphNamedData', data)
  },

  sortData({commit}, data) {
    let date = data.date

    try {
      date = mapDates({dates:date, format:'YYYYMMDD'})
    }
    catch(e) {
      //console.log(e)
    }

    //console.log(date)

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

    date = mapDates({dates:date, format:'YYYY-MM-DD'})

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
    commit('fillGraphData', response)

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

  editGraphDates({commit}, info) {
    commit('editGraphDates', info)
  },

  requestForFilterGraphs({commit, dispatch}) {

    commit('setRequestForGraphs')
    dispatch('load', {load:true, range:'daily'})

    setTimeout(() => {
      dispatch('setRequestToFalse')
    }, 3000)

  },

  setRequestToFalse({commit}) {
    commit('setRequestForGraphsToFalse')
  },

  fetchData({state, getters}) {
    return this.$axios.post(state.url, getters.form)
  },

  async view({dispatch}, res) {

    const {data, mode="daily", graph_name='all'} =  res

    switch (mode) {
      case "daily":
        await Promise.resolve(dispatch('viewData', {data, format:'ll', mode, applyFormat:true, graph_name}))
        break;
      case "monthly":
        await Promise.resolve(dispatch('viewDataMonthly', {data, format:'MMM YYYY', mode:'month', graph_name}))
        break;
      case "yearly":
        await Promise.resolve(dispatch('viewData', {data, format:'YYYY', mode:'year', applyFormat:true, graph_name}))
        break;
      case "quarterly":
        await Promise.resolve(dispatch('viewDataQuarterly', {data, format:'YYYY-MM-DD', mode:'month', graph_name}))
        break;

      default:
        break;
    }

  },

  viewDataMonthly({dispatch}, res) {

    const {data, format, mode, graph_name} = res

    let dates = mapDates({dates:data.date, format:'YYYY-MM-DD'})

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

    dispatch('parseData', {response:data, dates:dateMonths, format, applyFormat:true, graph_name})

  },

  async viewDataQuarterly({dispatch, state}, res) {
    const {data, format="YYYY-MM-DD", mode="month", graph_name} = res
    await dispatch('viewDataMonthly', {data, format, mode, graph_name})
    dispatch('parseDataQuarterly', graph_name)
  },

  async viewData({dispatch, state}, res) {
    const {data, format, mode, applyFormat, graph_name} = res
    
    let dates = mapDates({dates:data.date, format:'YYYY-MM-DD'})

    await dispatch('getModeKey', mode)

    let modeKey = state.modeKey
    let dateKeys = []

    dates.map((date, index) => {
      let key = date.split('-')[modeKey]
      let month = date.split('-')[1]
      let year = date.split('-')[0]

      let existedKey
      if(
        (existedKey = dateKeys.find(d => {
            d.date.split('-')[modeKey] === key
            && d.date.split('-')[1] === month
            && d.date.split('-')[0] === year
          })
        )
        && mode == 'daily') {
        existedKey.keys.push(index)
        return
      }

      if((existedKey = dateKeys.find(d => d.date.split('-')[modeKey] === key)) && mode == 'year') {
        existedKey.keys.push(index)
        return
      }
      dateKeys.push({date: date, keys:[index]});
    })

    dispatch('parseData', {response:data, dates:dateKeys, format, applyFormat, graph_name})
  },

  getModeKey({commit}, mode="daily") {

    if(mode=='daily') {
      commit('setModeKey', 2)
    }

    else if(mode=='month') {
      commit('setModeKey', 1)
    }

    else if(mode=='year') {
      commit('setModeKey', 0)
    }

    else {
      commit('setModeKey', 2) //default
    }


  },

  getMonthGroup({commit}, key) {
    if(key >= 0 && key <= 3) {
      commit('setMonthGroup', 'quarter1')
    }
    if(key >= 4 && key <= 6) {
      commit('setMonthGroup', 'quarter2')
    }
    if(key >= 7 && key <= 9) {
      commit('setMonthGroup', 'quarter3')
    }
    if(key >= 10 && key <= 12) {
      commit('setMonthGroup', 'quarter4')
    }
  },

  parseData({dispatch}, res) {

    const {response, dates, format, applyFormat = true, graph_name} = res
    // console.log(graph_name, dates)
    let date = [],
        denied_amount = [],
        missed_opp_amount = [],
        number_of_claims = [],
        number_of_denied_claims = [],
        number_of_line_items = [],
        number_of_paid_claims = [],
        paid_amount = [],
        compliance_amount = [],
        avoidable_denied_amount = [],
        patient_responsibility = [],
        paid_work_value = [],
        paid_op_cost = [],
        denied_work_value = [],
        denied_op_cost = [],
        denied_claims = [],
        accepted_claims = [],
        rejected_claims = [],
        processing_claims = []
        

    dates.forEach((data) => {

      let dateValue = applyFormat === true ? mapDate(data.date, format) : data.date

      let keys = data.keys
      let denied_value = 0
      let missed_opp_value = 0
      let no_of_claims_value = 0
      let no_of_denied_claims_value = 0
      let number_of_line_items_value = 0
      let number_of_paid_claims_value = 0
      let paid_amount_value = 0
      let compliance_amount_value = 0
      let avoidable_denied_amount_value = 0
      let patient_responsibility_value = 0
      let paid_work_value_value = 0
      let paid_op_cost_value = 0
      let denied_work_value_value = 0
      let denied_op_cost_value = 0

      //claims data
      let denied_claims_value = 0
      let accepted_claims_value = 0
      let rejected_claims_value = 0
      let processing_claims_value = 0

      let add_value = function(prop, key) {
        response.hasOwnProperty(prop) 
        ?  parseFloat(prop) + parseFloat(response.prop[key]) 
        : 0
      }

      date.push(dateValue)

      keys.forEach(key => {

        // console.log(key)
        denied_value = response.hasOwnProperty('denied_amount') 
        ?  parseFloat(denied_value) + parseFloat(response.denied_amount[key]) 
        : 0

        missed_opp_value = response.hasOwnProperty('missed_opp_amount') 
        ? parseFloat(missed_opp_value) + parseFloat(response.missed_opp_amount[key])
        : 0

        no_of_claims_value = response.hasOwnProperty('number_of_claims') 
        ? parseFloat(no_of_claims_value) + parseFloat(response.number_of_claims[key])
        : 0

        no_of_denied_claims_value = response.hasOwnProperty('number_of_denied_claims') 
        ? parseFloat(no_of_denied_claims_value) + parseFloat(response.number_of_denied_claims[key])
        : 0

        number_of_line_items_value = response.hasOwnProperty('number_of_line_items')
        ? parseFloat(number_of_line_items_value) + parseFloat(response.number_of_line_items[key])
        : 0

        number_of_paid_claims_value = response.hasOwnProperty('number_of_line_items')
        ? parseFloat(number_of_paid_claims_value) + parseFloat(response.number_of_line_items[key])
        : 0

        paid_amount_value = response.hasOwnProperty('paid_amount')
        ? parseFloat(paid_amount_value) + parseFloat(response.paid_amount[key])
        : 0

        compliance_amount_value = response.hasOwnProperty('compliance_amount')
        ? parseFloat(compliance_amount_value) + parseFloat(response.compliance_amount[key])
        : 0

        avoidable_denied_amount_value = response.hasOwnProperty('avoidable_denied_amount')
        ? parseFloat(avoidable_denied_amount_value) + parseFloat(response.avoidable_denied_amount[key])
        : 0

        patient_responsibility_value = response.hasOwnProperty('patient_responsibility')
        ? parseFloat(patient_responsibility_value) + parseFloat(response.patient_responsibility[key])
        : 0

        paid_work_value_value = response.hasOwnProperty('paid_work_value')
        ? parseFloat(paid_work_value_value) + parseFloat(response.paid_work_value[key])
        : 0

        paid_op_cost_value = response.hasOwnProperty('paid_op_cost')
        ? parseFloat(paid_op_cost_value) + parseFloat(response.paid_op_cost[key])
        : 0

        denied_work_value_value = response.hasOwnProperty('denied_work_value')
        ? parseFloat(denied_work_value_value) + parseFloat(response.denied_work_value[key])
        : 0

        denied_op_cost_value = response.hasOwnProperty('denied_op_cost')
        ? parseFloat(denied_op_cost_value) + parseFloat(response.denied_op_cost[key])
        : 0

        //remark codes data

        denied_claims_value = response.hasOwnProperty('denied')
        ? parseFloat(denied_claims_value) + parseFloat(response.denied[key])
        : 0

        accepted_claims_value = response.hasOwnProperty('accepted')
        ? parseFloat(accepted_claims_value) + parseFloat(response.accepted[key])
        : 0

        processing_claims_value = response.hasOwnProperty('processing')
        ? parseFloat(processing_claims_value) + parseFloat(response.processing[key])
        : 0

        rejected_claims_value = response.hasOwnProperty('resolved')
        ? parseFloat(rejected_claims_value) + parseFloat(response.resolved[key])
        : 0

      })

      denied_amount.push(denied_value.toFixed(2))
      missed_opp_amount.push(missed_opp_value.toFixed(2))
      number_of_claims.push(no_of_claims_value.toFixed(2))
      number_of_denied_claims.push(no_of_denied_claims_value.toFixed(2))
      number_of_line_items.push(number_of_line_items_value.toFixed(2))
      number_of_paid_claims.push(number_of_paid_claims_value.toFixed(2))
      paid_amount.push(paid_amount_value.toFixed(2))
      compliance_amount.push(compliance_amount_value.toFixed(2))
      avoidable_denied_amount.push(avoidable_denied_amount_value.toFixed(2))
      patient_responsibility.push(patient_responsibility_value.toFixed(2))
      paid_work_value.push(paid_work_value_value.toFixed(2))
      paid_op_cost.push(paid_op_cost_value.toFixed(2))
      denied_work_value.push(denied_work_value_value.toFixed(2))
      denied_op_cost.push(denied_op_cost_value.toFixed(2))

      //remark codes value

      denied_claims.push(denied_claims_value.toFixed(2))
      accepted_claims.push(accepted_claims_value.toFixed(2))
      rejected_claims.push(rejected_claims_value.toFixed(2))
      processing_claims.push(processing_claims_value.toFixed(2))


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
      compliance_amount,
      avoidable_denied_amount,
      patient_responsibility,
      paid_work_value,
      paid_op_cost,
      denied_work_value,
      denied_op_cost,
      denied_claims,
      accepted_claims,
      rejected_claims,
      processing_claims
    };

    let new_response = Object.assign({}, response, data)
    console.log(new_response)

    if(graph_name != 'all') {
      try {
        dispatch('fillGraphNamedData', {name:graph_name, data:new_response})
        return
      }
      catch(e) {
        console.log(e)
      }
    }

    dispatch('fillGraphData', new_response)

    Promise.resolve()

  },

  parseDataQuarterly({state, dispatch}, graph_name) {

    let data = graph_name.toLowerCase() == 'all' ? state.graphData : state[graph_name]

    let dates = data.date
    let quarters = []

    dates.map((date, index) => {

      let month = date.split('-')[1]
      let year = date.split('-')[0]

      dispatch('getMonthGroup', month)

      let group = state.monthGroup

      let existedQuarter = null

      if(group == 'quarter1') {
        if(existedQuarter = quarters.find(quarter => quarter.date == `${year} Q1`)) {
         existedQuarter.keys.push(index)
         return
        }

        quarters.push({date: `${year} Q1`, keys:[index]});
      }

      if(group == 'quarter2') {
        if(existedQuarter = quarters.find(quarter => quarter.date == `${year} Q2`)) {
         existedQuarter.keys.push(index)
         return
        }

        quarters.push({date: `${year} Q2`, keys:[index]});
      }

      if(group == 'quarter3') {
        if(existedQuarter = quarters.find(quarter => quarter.date == `${year} Q3`)) {
         existedQuarter.keys.push(index)
         return
        }

        quarters.push({date: `${year} Q3`, keys:[index]});
      }

      if(group == 'quarter4') {

        if(existedQuarter = quarters.find(quarter => quarter.date == `${year} Q4`)) {
          existedQuarter.keys.push(index)
          return
        }

        quarters.push({date: `${year} Q4`, keys:[index]});
      }

    })

    quarters = quarters.sort((a, b) => {
      if(a.date < b.date) {
        return -1;
      }
      else if(a.date > b.date) {
        return 1;
      }
      else {
        return 0;
      }
    })

    dispatch('parseData', {response:data, dates:quarters, format:'ll', applyFormat:false, graph_name})

  }

}
