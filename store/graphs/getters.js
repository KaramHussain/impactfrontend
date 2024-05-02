export default {

  graphData(state) {
    return state.graphData
  },

  paidAmountRevenueData(state) {
    return state.paidAmountRevenueData
  },

  buisnessGraphData(state) {
    return state.buisnessGraphData
  },

  complianceIssuesData(state) {
    return state.complianceIssuesData
  },

  denialTrendsData(state) {
    return state.denialTrendsData
  },

  denialFruitsData(state) {
    return state.denialFruitsData
  },

  impactSummaryData(state) {
    return state.impactSummaryData
  },

  timesheetData(state) {
    return state.timesheetData
  },

  originalData(state) {
    return state.originalData
  },

  remarkCodesData: state => state.remarkCodesData,

  collectorStats: state => state.collectorStats,

  collectorAverage: state => state.collectorAverage,

  form(state, getters, rootState) {
    return {
      start_date : state.graphDates.startDate,
      end_date : state.graphDates.endDate,
      provider_id : rootState.auth.user.practise_id
    }
  },

  requestForGraphs(state) {
    return state.request_for_filter_graphs
  },

  graphDates(state) {
    return state.graphDates
  }

}
