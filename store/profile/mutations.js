export default {

  editInfo(state, info) {
    let key = info.param;
    let value = info.value;
    let section = info.section;
    state[section][key] = value;
  },

  editDob(state, info) {
    let param = info.param;
    let value = info.value;
    state.profile.dob[param] = value;
  },

  updateOriginalImage(state, data) {
    state.profile.provider_image = data;
  },

  setMemberPermissions(state, permissions) {
    state.memberPermissions = permissions
  },

  setRolePermissions(state, permissions) {
    state.rolePermissions = permissions
  },

  fillGraphData(state, data) {
    state.graphData = data
  },

  fillPayers(state, data) {
    state.payers = data
  },

  fillRemarkTypes(state, types) {
    state.remarkTypes = types
  }

}
