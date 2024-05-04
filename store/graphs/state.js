export default () => ({
  originalData: [],
  graphData: [],
  buisnessGraphData: [],
  complianceIssuesData: [],
  denialTrendsData: [],
  denialFruitsData: [],
  impactSummaryData: [],
  timesheetData: [],
  paidAmountRevenueData: [],
  remarkCodesData: [],
  collectorStats: [],
  collectorAverage: [],
  fetching: false,
  viewedData: {},
  modeKey: 2,
  monthGroup: 'quarter1',
  baseURL: 'http://169.61.216.28:4001/',
  // url : 'http://169.61.216.28:4001/get_graph',
  // url: 'https://apis.carepays.com/public/api/get_graph',
  // url: 'https://apis-stage.carepays.com/api/get_graph',
  url: 'https://graph.carebidsexchange.com/get_graph',
  // url: 'http://192.168.1.5:8000/api/get_graph',

  graphDates: {
    startDate : "",
    endDate : ""
  },
  request_for_filter_graphs : false
})
