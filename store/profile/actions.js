
export default {

  fetchPayers({ commit, rootState }) {

    return new Promise((resolve, reject) => {
      this.$axios.post(`${rootState.ediUrl}/get_payers`, {
        "provider_id": rootState.auth.user.practise_id,
        // "payer_identifier_list":["1066033492"],
        // "rc_type": ["lowfruit","avoid"]
      })
        .then(({ data }) => {
          commit('fillPayers', data)
          resolve(data)
        })
    })
  },

  getRemarkTypes({ commit }, codes) {
    let low_fruit = codes.find(code => code.low_fruit == 1);
    let avoidable = codes.find(code => code.avoidable == 1);
    let compliance = codes.find(code => code.compliance);

    let remark_code_types = [];

    if (low_fruit) {
      remark_code_types.push('lowfruit');
    }

    if (avoidable) {
      remark_code_types.push('avoidable');
    }

    if (compliance) {
      remark_code_types.push('compliance');
    }

    commit('fillRemarkTypes', remark_code_types);
  },

  editInfo({ commit }, info) {
    commit('editInfo', info);
  },

  async changeMemberPassword({ state }) {
    let data = {
      password: state.profile.password,
      new_password: state.profile.new_password,
      confirm_new_password: state.profile.confirm_new_password
    };
    await this.$axios.post('provider/change-password', data)
      .then(res => {
        Promise.resolve(res);
      })
      .catch(e => {
        Promise.reject(e);
      })

  },

  async changeMemberAccount({ state }) {
    let data = {
      email: state.profile.email,
      name: state.profile.name,
      npi: state.profile.npi,
    };
    return this.$axios.post('provider/change-account', data);
  },

  async changeMemberCompany({ state }) {
    let data = {
      name: state.profile.company,
      phone: state.profile.phone,
      state: state.profile.state,
      city: state.profile.city,
      zipcode: state.profile.zipcode,
      address: state.profile.address,
      county: state.profile.county,
    };
    return this.$axios.post('provider/change-company-details', data);
  },

  updateUserOriginalImage({ commit }, data) {
    commit('updateOriginalImage', data);
  },

  fetchPermissions({ commit}) {
    if (process.browser && JSON.parse(localStorage.getItem('member_permissions')) != null) {
      let permissions = JSON.parse(localStorage.getItem('member_permissions'));

      const managerRoles = permissions.filter(a => a.name.includes('manager')).sort((a, b) => (a.name > b.name) *2-1);
      let x = managerRoles[2];
      managerRoles[2] = managerRoles[1];
      managerRoles[1] = x;
      const claimRoles = permissions.filter(a => a.name.includes('claim')).sort((a, b) => (a.name > b.name) *2-1);
      x = claimRoles[2];
      claimRoles[2] = claimRoles[1];
      claimRoles[1] = x;
      const collectorRoles = permissions.filter(a => a.name.includes('collector')).sort((a, b) => (a.name > b.name) *2-1);
      x = collectorRoles[2];
      collectorRoles[2] = collectorRoles[1];
      collectorRoles[1] = x;
      const companyRoles = permissions.filter(a => a.name.includes('company')).sort((a, b) => (a.name > b.name) *2-1);

      const data =[...managerRoles, ...claimRoles, ...collectorRoles, ...companyRoles];

      commit('setMemberPermissions', data);
      return;
    }
    this.$axios.get('/provider/permissions')
    .then(({data}) => {
      const managerRoles = data.filter(a => a.name.includes('manager')).sort((a, b) => (a.name > b.name) *2-1);
      let x = managerRoles[2];
      managerRoles[2] = managerRoles[1];
      managerRoles[1] = x;
      const claimRoles = data.filter(a => a.name.includes('claim')).sort((a, b) => (a.name > b.name) *2-1);
      x = claimRoles[2];
      claimRoles[2] = claimRoles[1];
      claimRoles[1] = x;
      const collectorRoles = data.filter(a => a.name.includes('collector')).sort((a, b) => (a.name > b.name) *2-1);
      x = collectorRoles[2];
      collectorRoles[2] = collectorRoles[1];
      collectorRoles[1] = x;
      const companyRoles = data.filter(a => a.name.includes('company')).sort((a, b) => (a.name > b.name) *2-1);

      const permissions =[...managerRoles, ...claimRoles, ...collectorRoles, ...companyRoles];
      commit('setMemberPermission', permissions);
      if (process.browser) {
        localStorage.setItem('member_permissions', JSON.stringify(permissions));
      }
    })
  },

  fetchRolePermissions({ commit }) {
    // if (process.browser && JSON.parse(localStorage.getItem('role_permissions')) != null) {
    //   let permissions = JSON.parse(localStorage.getItem('role_permissions'));
    //   commit('setRolePermissions', permissions);
    //   return;
    // }
    this.$axios.get('provider/role-permissions')
      .then(({ data }) => {
        console.log(data)
        commit('setRolePermissions', data);
        // if (process.browser) {
        //   localStorage.setItem('role_permissions', JSON.stringify(data));
        // }
      })
  },

  fillGraphData({ commit }, data) {
    commit('fillGraphData', data);
  },
}
