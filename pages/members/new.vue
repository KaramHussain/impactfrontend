<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content mb-4">
      <div class="content-overlay"></div>
      <div class="content-wrapper">

        <div class="content-header">
          <nuxt-link :to="{path:`/members`}" class="btn btn-primary mb-2">
            All members
          </nuxt-link>
          <h4 class="mb-2">Add new member</h4>
        </div>

        <div class="content-body">
          <div>

            <div class="card">

              <div class="card-body px-sm py-sm">

                <form class="form" @submit.prevent="add">

                  <div class="form-group">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Add member name" v-model="name">
                  </div>

                  <div class="form-group">
                    <label for="name" class="form-label">Email</label>
                    <input type="text" class="form-control" placeholder="Email will be used for member login" v-model="email">
                  </div>

                  <div class="form-group">
                    <label for="name" class="form-label">Role</label>
                    <select class="form-control" v-model="role">
                      <can I="add" a="manager">
                        <option value="manager">Manager</option>
                      </can>
                      <can I="add" a="collector">
                        <option value="collector">Collector</option>
                      </can>
                    </select>
                  </div>

                  <div class="form-group row" v-if="user.roles.name == 'admin'">
                    <div class="col-12 text-center text-sm-left pr-0">
                      <!-- <fieldset class="custom-control custom-checkbox">
                          <input @change="changePermissions($event)" type="checkbox" id="change-permissions" class="custom-control-input" v-model="change_permissions">
                          <label for="change-permissions" class="custom-control-label">Change permissions</label>
                          
                      </fieldset> -->
                      <button
                          id="change-permissions"
                          @click="changePermissions($event)"
                          type="button"
                          class="btn btn-link btn--underline"
                        >
                          Manage permissions
                        </button>
                    </div>
                  </div>

                  <div class="form-group">

                    <label for="name" class="form-label">Responsibilities</label>
                    <select class="form-control" v-model="responsibility">
                      <option value="0">Please select</option>
                      <option value="eob">EOB</option>
                      <option value="insurance_company">Insurance company</option>
                      <option value="remark_code_type">Remark code type (Avoidable)</option>
                      <option value="insurance_with_remark_code">Insurance company with remark code</option>
                    </select>

                  </div>

                  <div class="form-group"
                  v-if="responsibility=='insurance_company' || responsibility == 'insurance_with_remark_code'">
                    <label for="name" class="form-label">Insurance Company</label>
                    <multiselect
                      :multiple="true"
                      v-model="insurance_companies"
                      :options="payers"
                      label="PAYER NAME"
                      track-by="PAYER ID"
                    ></multiselect>
                    <!-- <select class="form-control" v-model="insurance_companies" multiple id="insurance_companies">
                      <option value="0">Please select</option>
                      <template v-if="payers.length">
                        <option :value="payer['PAYER ID']" v-for="payer in payers" :key="payer['PAYER ID']">
                          {{payer['PAYER NAME']}}
                        </option>
                      </template>
                      <option value="1236003113">Aetna</option>
                    </select> -->
                  </div>

                  <div class="form-group"
                  v-if="responsibility=='remark_code_type' || responsibility == 'insurance_with_remark_code'">

                    <label for="name" class="form-label">Remark code type</label>
                    <multiselect
                      :multiple="true"
                      v-model="selected_remark_types"
                      :options="remark_types"
                    ></multiselect>
                    <!-- <select class="form-control" multiple>
                      <option value="0">Please select</option>
                      <option value="avoidable">Avoidable denials</option>
                      <option value="low_fruit">Low Fruits</option>
                      <option value="compliance">Compliance</option>
                    </select> -->

                  </div>

                  <button :disabled ="loading" type="submit" class="btn btn-primary bg-info my-2 border-0">
                    Save
                    <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
                  </button>

                </form>

              </div><!--card-body-->

            </div><!--card-->

          </div>
        </div>

      </div>
    </div>

    <memberPermissions @change="addPermission($event)" :role="role" />

    <impactFooter />

  </main>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import impactHeader from '@/components/layouts/impact-header.vue'
import impactSidebar from '@/components/layouts/impact-sidebar.vue'
import impactFooter from '@/components/layouts/impact-footer.vue'
import memberPermissions from '@/components/member-permissions.vue'
import Multiselect from "vue-multiselect";

export default {

  middleware:['auth', 'admin'],

  components : {
    impactHeader,
    impactSidebar,
    impactFooter,
    memberPermissions,
    Multiselect
  },

  head() {
    return {
      title:'Add new member'
    }
  },

  data() {

    return {
      name:null,
      email:null,
      role:null,
      responsibility:0,
      insurance_companies: [],
      remark_codes: [],
      change_permissions : false,
      permissions:[],
      loading:false,
      remark_types: ["low_fruit", "avoidable", "compliance"],
      selected_remark_types: [],
    };

  },

  watch: {
    role(value) {
      this.permissions = []
    }
  },

  computed: {
    ...mapGetters('profile', {
      payers: 'payers'
    })
  },

  methods: {

    ...mapActions('profile', {
      fetchPayers: 'fetchPayers'
    }),

    changePermissions() {
      $("#default").modal({
          keyboard : true
        });
    },

    addPermission(e) {
      if(e.target.checked) {
        if(this.permissions.indexOf(e.target.value) == -1) {
          this.permissions.push(e.target.value);
        }
      }
      else {
        var permissions = this.permissions.filter((permission) => {
          return permission != e.target.value;
        })
        this.permissions = permissions;
      }
    },

    async add() {
      this.loading = true;
      let data = this.getData();
if (data.insurance_companies && data.insurance_companies.length > 0) {
        const insurance_companies = data.insurance_companies.map(
          (item) => item["PAYER ID"]
        );
        data.insurance_companies = insurance_companies;
      }
      await this.$axios.post('provider/add-member', data)
      .then((res) => {
        this.$toast.show("Member has added. An email is sent to member with Login credentials.").goAway(5000)
        this.loading = false;
        this.resetData()
        })
      .catch((e) => {
        this.$toast.show("Something went wrong").goAway(5000)
        this.loading = false
      })

    },

    getData() {

      return {
        name : this.name,
        email : this.email,
        role : this.role,
        responsibility : this.responsibility,
        insurance_companies : this.insurance_companies,
        change_permissions  : this.change_permissions,
        permissions : this.permissions,
        remark_codes:
          this.responsibility === "remark_code_type" ||
          this.responsibility === "insurance_with_remark_code"
            ? this.selected_remark_types
            : [],
      }

    },

    resetData() {

      this.name = null,
      this.email = null,
      this.fillRole()
      this.responsibility = 0,
      this.insurance_companies = [],
      this.remark_codes = [],
      this.change_permissions = false,
      this.permissions = []

    },

    fillRole() {
      if(this.$can('add', 'manager')) {
        this.role = 'manager'
        return
      }
      this.role = 'collector'
    }

  },

  created() {
    this.fetchPayers()
    this.fillRole()
  }

}
</script>



<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__tags {
    border: 1px solid #cacfe7 !important;
    background: transparent;
    padding: 5px !important;
}

.multiselect__tag {
    background: #1e9ff2;
}
.multiselect__placeholder {
    display: inline-block !important;
    margin-bottom: 0px !important;
    padding-top: 0px !important;
}
.multiselect__option--highlight {
    background: #1e9ff2 !important;
}
.btn--underline {
  padding-left: 0px;
  text-decoration-line: underline;
}
</style>

