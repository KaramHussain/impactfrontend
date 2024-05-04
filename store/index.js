export const state = () => ({
  // muskaan start
  uploadedFiles: [],
  // muskaan end

  states:[],
  cities:[],
  user:[],
  request_for_filter_graphs : false,
  graphs: {
    start_date : null,
    end_date : null
  },
  notifications : [],
  ediUrl: 'https://backend.carebidsexchange.com/api'
  // ediUrl: 'https://apis.carebidsexchange.com/api'
  // ediUrl: 'http://192.168.1.5:8000/api'

})

export const getters =  {

  ediUrl : state => state.ediUrl,  

  cities(state) {
    return state.cities;
  },

  states(state) {
    return state.states;
  },

  requestForGraphs(state) {
    return state.request_for_filter_graphs
  },

  graphDates(state) {
    return state.graphs
  },

  notifications(state) {
    return state.notifications
  },

  years () {
    var currentYear = new Date().getFullYear(), years = [];
    var startYear = 1950;
    while ( currentYear >= startYear ) {
        years.push(currentYear--);
    }
    return years;
  },

  months() {
    return ['Jan', 'Feb', 'Mar','Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  },

  monthsInDigits() {
    let months = []
    for(let i = 1; i <= 12; i++) {
      if(i < 10) {
        months.push(`0${i}`)
        continue
      }
      months.push(i)
    }
    return months
  },

  days() {
    let days = []
    for(let i = 1; i <= 30; i++) {
      days.push(i)
    }
    return days
  },

}

export const mutations =  {

  // muskaan start
  setUploadedFiles(state, files) {
    state.uploadedFiles = files;
  },
  // muskaan end

  addStates(state, states) {
    state.states = states;
  },

  addCities(state, cities) {
    state.cities = cities;
  },

  setUser(state, user) {
    state.user = user;
  },

  setRequestForGraphs(state, dates) {
    state.graphs.start_date = dates.start_date
    state.graphs.end_date = dates.end_date
    state.request_for_filter_graphs = true
  },

  setRequestForGraphsToFalse(state) {
    state.request_for_filter_graphs = false
  },

  fillNotifications(state, notifications) {
    state.notifications = notifications
  }

}

export const actions =  {
  //muskaan start
  async fetchUploadedFiles({ commit }) {
    try {
      const response = await this.$axios.get('https://upload-stage.carebidsexchange.com/api/impact_data');
      console.log(response.data, "response of get")
      commit('setUploadedFiles', response.data)
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  },
  // muskaan end

  requestForFilterGraphs({commit}, dates) {

    commit('setRequestForGraphs', dates)

  },

  setRequestToFalse({commit}) {
    commit('setRequestForGraphsToFalse')
  },

  autoFillAuthInfo({dispatch, commit, getters}, info) {
    let loggedIn = getters['profile/loggedIn']

    if(loggedIn) {
      let user = getters['profile/user']

      commit('setUser', user);
      dispatch('getPhone', info);
      //dispatch('getYear', info);
      //dispatch('getMonth', info);
      //dispatch('getDay', info);
      dispatch('getEmail', info);
      dispatch('getZipCode', info);
      dispatch('getCity', info);
      dispatch('getState', info);
      dispatch('getAddress', info);
      dispatch('getName', info);
      dispatch('getCompany', info);
      dispatch('getNpi', info);
      dispatch('getIsDoctor', info);
      dispatch('getImage', info);
    }

  },

  async getStates({commit}) {

    if(process.browser && JSON.parse(localStorage.getItem('states')) != null) {
      commit('addStates', JSON.parse(localStorage.getItem('states')));
      return;
    }

    await this.$axios.get(`getStates`)
    .then(({data}) => {
      commit('addStates', data);
      if(process.browser) { //if server
        localStorage.setItem('states', JSON.stringify(data));
      }
    });

  },

  async getCities({commit, rootState}, id = 0) {

    //if(id != 0) {
      console.log(id)
      if(process.browser && JSON.parse(localStorage.getItem('cities')) != null) {
        let cities = JSON.parse(localStorage.getItem('cities'))
        if(id != 0) {
          cities = cities.filter(city => {
            return city.state_id == id
          })
        }
        commit('addCities', cities);
        return;
      }

      await this.$axios.get(`getCities` , {
        params: {
          state_id:id
        }
      })
      .then(({data}) => {

        commit('addCities', data);

        if(process.browser) {
          localStorage.setItem('cities', JSON.stringify(data))
        }

      });

    //}

  },

  getPhone({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'phone', value:state.user.practise.phone, section:'profile'});

  },

  getCompany({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'company', value:state.user.practise.name, section:'profile'});

  },

  getNpi({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'npi', value:state.user.npi, section:'profile'});

  },

  getIsDoctor({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'is_doctor', value:state.user.is_doctor, section:'profile'});

  },

  getName({commit,state}, info) {

    commit(`${info.module}/editInfo`, {param:'name', value:state.user.name, section:'profile'});

  },

  getAddress({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'address', value:state.user.practise.address, section:'profile'});

  },

  getState({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'state', value:state.user.practise.state, section:'profile'});

  },

  getCity({commit, state}, info) {
    commit(`${info.module}/editInfo`, {param:'city', value:state.user.practise.city, section:'profile'});
  },

  getZipCode({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'zipcode', value:state.user.practise.zipcode, section:'profile'});

  },

  getEmail({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'email', value:state.user.email, section:'profile'});

  },

  getDay({commit, state}, info) {

    let dob = state.user.dob.split('-');
    let day = dob[2];
    commit(`${info.module}/editDob`, {param:'day', value:day});

  },

  getMonth({commit,state}, info) {

    let dob = state.user.dob.split('-');
    let month = dob[1];
    month = month.charAt(0) == 0 || month.charAt(0) == '0' ? month.replace('0', '') : month;

    commit(`${info.module}/editDob`, {param:'month', value:month});

  },

  getYear({commit, state}, info) {

    let dob = state.user.dob.split('-');
    let year = dob[0];
    commit(`${info.module}/editDob`, {param:'year', value:year});

  },

  getImage({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'provider_image', value:state.user.image, section:'profile' });
  },

  getQuestion1({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_question1', value:state.user.security_question1, section:info.section });
  },

  getQuestion2({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_question2', value:state.user.security_question2, section:info.section });
  },

  getAnswer1({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_answer1', value:state.user.security_answer1, section:info.section });
  },

  getAnswer2({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_answer2', value:state.user.security_answer2, section:info.section });
  },

  languages({commit}) {

    if(process.browser && JSON.parse(localStorage.getItem('languages')) != null) {
      commit('fillLanguages', JSON.parse(localStorage.getItem('languages')));
      return;
    }

    this.$axios.get(`languages`)
    .then(({data}) => {
      commit('fillLanguages', data);
      if(process.browser) { //if server
        localStorage.setItem('languages', JSON.stringify(data));
      }
    });

  },

  fillNotifications({commit}, notifications) {
    commit('fillNotifications', notifications)
  }


}
