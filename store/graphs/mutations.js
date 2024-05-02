export default {

  fillOriginalData(state, data) {
    state.originalData = data
  },

  setFetching(state, status) {
    state.fetching = status
  },

  fillGraphData(state, data) {
    state.graphData = data
  },

  setModeKey(state, key) {
    state.modeKey = key
  },

  setMonthGroup(state, group) {
    state.monthGroup = group
  },

  editGraphDates(state, info) {
    const {value, type} = info
    state.graphDates[type] = value
  },

  setRequestForGraphs(state) {
    state.request_for_filter_graphs = true
  },

  setRequestForGraphsToFalse(state) {
    state.request_for_filter_graphs = false
  },

  fillGraphNamedData(state, info) {
    const {name, data} = info
    state[name] = data
  }

}
