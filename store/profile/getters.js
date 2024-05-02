export default {

  user:(state, getters, rootState) => rootState.auth.user,

  loggedIn: (state, getters, rootState) => rootState.auth.loggedIn,

  name: state => state.profile.name,

  email: state => state.profile.email,

  profile: state => state.profile,

  providerImage: state => state.profile.provider_image,

  permissions: state => state.memberPermissions,

  rolePermissions: state => state.rolePermissions,

  graphData: state => state.graphData,

  range: state => state.range,

  payers: state => state.payers,

  remarkTypes: state => state.remarkTypes


}
