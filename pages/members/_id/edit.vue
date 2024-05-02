<template>
  <main>
    <impactHeader />

    <impactSidebar />

    <div class="app-content content">
      <div class="content-overlay"></div>

      <div class="content-wrapper">
        <div class="content-body">
          <!-- users edit start -->
          <section class="users-edit">
            <div
              class="
                content-header
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <h4 class="mb-2">Edit member</h4>
              <nuxt-link
                :to="{ path: `/members` }"
                class="btn btn-primary mb-2"
              >
                All members
              </nuxt-link>
            </div>

            <div class="card">
              <div class="card-content">
                <div
                  class="
                    card-body
                    d-flex
                    align-items-center
                    justify-content-center
                    px-5
                    py-5
                  "
                  v-if="loading"
                >
                  <span class="text-center">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </span>
                </div>

                <div class="card-body" v-else>
                  <div class="media mb-2">
                    <a class="mr-2" href="#">
                      <img
                        :src="member.image"
                        alt="users avatar"
                        class="users-avatar-shadow rounded-circle"
                        height="64"
                        width="64"
                      />
                    </a>
                    <div class="media-body">
                      <h4 class="media-heading">{{ member.name }}</h4>
                      <span class="badge-sm">{{ member.email }}</span
                      ><br />
                      <span
                        class="badge badge-primary badge-sm"
                        v-if="member.roles"
                      >
                        {{ member.roles.name }}
                      </span>
                    </div>
                  </div>

                  <form novalidate>
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Member name"
                            v-model="member.name"
                          />
                        </div>
                        <div class="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Member email"
                            v-model="member.email"
                            :disabled="member.verified"
                          />
                        </div>
                        <div class="form-group">
                          <label>Role</label>
                          <select class="form-control" v-model="role">
                            <can I="edit" a="manager">
                              <option value="manager">Manager</option>
                            </can>
                            <can I="edit" a="collector">
                              <option value="collector">Collector</option>
                            </can>
                          </select>
                        </div>
                        <div class="form-group custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="status"
                            v-model="active"
                          />
                          <label class="custom-control-label" for="status"
                            >Active</label
                          >
                        </div>
                      </div>
                      <div
                        class="form-group row"
                        v-if="user.roles.name == 'admin'"
                      >
                        <div class="col-12 text-center text-sm-left pr-0">
                          <fieldset class="custom-control custom-checkbox">
                            <button
                              id="change-permissions"
                              @click="changePermissions($event)"
                              type="button"
                              class="btn btn-link btn--underline"
                            >
                              Manage permissions
                            </button>
                          </fieldset>
                        </div>
                      </div>

                        <div class="col-12 flexbox-contianer py-1">
                        <label for="name" class="form-label"
                          >Responsibilities</label
                        >
                        <select class="form-control" v-model="responsibility">
                          <option value="0">Please select</option>
                          <option value="eob">EOB</option>
                          <option value="insurance_company">
                            Insurance company
                          </option>
                          <option value="remark_code_type">
                            Remark code type (Avoidable)
                          </option>
                          <option value="insurance_with_remark_code">
                            Insurance company with remark code
                          </option>
                        </select>
                        </div>

                      <div
                        class="col-12 flexbox-contianer"
                        v-if="
                          responsibility == 'insurance_company' ||
                          responsibility == 'insurance_with_remark_code'
                        "
                      >
                        <label>Assign Payers</label>
                        <div class="form-group">
                          <multiselect
                            :multiple="true"
                            v-model="insurance_companies"
                            :options="payers"
                            label="PAYER NAME"
                            track-by="PAYER ID"
                          ></multiselect>
                        </div>
                      </div>

                      <div
                        class="col-12 flexbox-contianer"
                        v-if="
                          responsibility == 'remark_code_type' ||
                          responsibility == 'insurance_with_remark_code'
                        "
                      >
                        <label>Assign Remark types</label>
                        <div class="form-group">
                          <multiselect
                            :multiple="true"
                            v-model="selected_remark_types"
                            :options="remark_types"
                          ></multiselect>
                        </div>
                      </div>

                      <div
                        class="
                          col-12
                          d-flex
                          flex-sm-row flex-column
                          justify-content-end
                          mt-1
                        "
                      >
                        <button
                          :disabled="updating"
                          @click.prevent="updateUser"
                          type="submit"
                          class="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <!-- users edit ends -->
        </div>
      </div>
    </div>

    <memberPermissionsDialog
      @change="addPermission($event)"
      :formattedPermissions="permissions"
      :role="role ? role : ''"
    />

    <impactFooter />
  </main>
</template>

<script>
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";
import permissions from "@/components/permissions";
import memberPermissionsDialog from "@/components/member-permissions-dialog.vue";
import { mapGetters, mapActions } from "vuex";
import Multiselect from "vue-multiselect";

export default {
  middleware: ["auth", "admin"],

  head() {
    return {
      title: "Members list",
    };
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    permissions,
    memberPermissionsDialog,
    Multiselect,
  },

  data() {
    return {
      member: {},
      loading: false,
      change_permissions: false,
      permissions: [],
      role: null,
      active: 0,
      responsibility: 'insurance_with_remark_code',
      updating: false,
      insurance_companies: [],
      remark_types: ["low_fruit", "avoidable", "compliance"],
      selected_remark_types: [],
    };
  },

  computed: {
    ...mapGetters("profile", {
      payers: "payers",
    }),
  },

  methods: {
    ...mapActions("profile", {
      fetchPayers: "fetchPayers",
    }),

    shouldSelectPayer(id) {
      id = id != null && id != "undefined" ? id.toString() : id;
      return this.memberPayers.indexOf(id) > -1;
    },

    updatePayers(e) {
      this.memberPayers = payer;
    },

    updateMemberPayers(payer) {
      if (payer == "undefined") return;
      let payer_info = this.member.payers.find((this_payer) => {
        return `${this_payer.payer_id}` == `${payer}`;
      });
      if (payer_info != "undefined") {
        // this.$set(payer_info, 'payer_id', payer)
      }
    },

    async fetchUser() {
      this.loading = true;
      if (!this.$route.params.id) {
        this.$router.push("/members");
      }
      await this.$axios
        .post(`/provider/fetch-member/${this.$route.params.id}`)
        .then(({ data }) => {
          this.member = data.data;
          this.insurance_companies = this.payers.filter((payer) =>
            this.member.payers
              .map((p) => p.payer_id)
              .includes(payer["PAYER ID"])
          );
          this.fillDetails();
          this.loading = false;
        })
        .catch((err) => {
          this.$router.push("/members");
          this.loading = false;
        });
    },

    async updateUser() {
      let payers = [];
      if (this.insurance_companies && this.insurance_companies.length > 0) {
        const insurance_companies = this.insurance_companies.map(
          (item) => item["PAYER ID"]
        );
        payers = insurance_companies;
      }

      let data = this.getData();
      data["name"] = this.member.name
      data["payers"] = payers;
      data["remark_codes"] = this.selected_remark_types;
      data["responsibility"] = this.responsibility;
      this.updating = true;

      await this.$axios
        .post(`/provider/update-member/${this.$route.params.id}`, data)
        .then(({ data }) => {
          this.updating = false;
          this.$toast.show("Changes saved").goAway(5000);
        })
        .catch((err) => {
          this.updating = false;
          this.$toast.show(err.response.data.errors[0]).goAway(5000);
        });
    },

    getData() {
      return {
        permissions: [...new Set(this.permissions)],
        role: this.role,
        active: this.active,
      };
    },

    changePermissions(e) {
      $("#default").modal({
        keyboard: true,
      });
    },

    fillDetails() {
      this.role = this.member.roles.id === 2 ? 'manager' : 'collector';
      this.active = this.member.active;
      this.permissions = this.member.formattedPermissions.map((p) => {
        return p.id;
      });
    },

    addPermission(e) {
      if (e.target.checked) {
        this.permissions.push(parseInt(e.target.value));
      } else {
        var permissions = this.permissions.filter((permission) => {
          return permission != parseInt(e.target.value);
        });
        this.permissions = permissions;
      }
    },

    remarkTypes() {
      //@todo only include which are not zero
      let low_fruit = this.member.remark_codes.find(
        (code) => code.low_fruit == 1
      );
      let avoidable = this.member.remark_codes.find(
        (code) => code.avoidable == 1
      );
      let compliance = this.member.remark_codes.find(
        (code) => code.compliance == 1
      );

      let remark_code_types = [];

      if (low_fruit) {
        remark_code_types.push("lowfruit");
      }

      if (avoidable) {
        remark_code_types.push("avoidable");
      }

      if (compliance) {
        remark_code_types.push("compliance");
      }

      return remark_code_types;
    },

    shouldSelectedType(type) {
      return this.remarkTypes().includes(type);
    },
  },

  created() {
    this.fetchUser();
    this.fetchPayers();
  },
};
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