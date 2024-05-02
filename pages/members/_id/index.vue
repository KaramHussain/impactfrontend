<template>
  <main>
    <impactHeader />

    <impactSidebar />

    <div class="app-content content">
      <div class="content-overlay"></div>

      <div class="content-wrapper">
        <div class="content-body">
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

          <!-- users view start -->
          <section class="users-view" v-else>
            <!-- users view media object start -->
            <div
              class="
                content-header
                d-flex
                justify-content-end
                align-items-center
              "
            >
              <nuxt-link
                :to="{ path: `/members` }"
                class="btn btn-primary mb-2"
              >
                All members
              </nuxt-link>
            </div>

            <hr />

            <div class="row">
              <div class="col-12 col-sm-7">
                <div class="media mb-2">
                  <a class="mr-1" href="#">
                    <img
                      :src="member.image"
                      alt="users view avatar"
                      class="users-avatar-shadow rounded-circle"
                      height="64"
                      width="64"
                    />
                  </a>
                  <div class="media-body pt-25">
                    <h4 class="media-heading">
                      <span class="users-view-name">{{ member.name }}</span>
                      <div
                        class="badge badge-primary badge-sm"
                        v-if="member.roles"
                      >
                        {{ member.roles.name }}
                      </div>
                    </h4>
                  </div>
                </div>
              </div>
              <div
                class="
                  col-12 col-sm-5
                  px-0
                  d-flex
                  justify-content-end
                  align-items-center
                  px-1
                  mb-2
                "
              >
                <a href="#" class="btn btn-sm mr-25 border">
                  <i class="ft-message-square font-small-3"></i>
                </a>
                <nuxt-link
                  :to="{ path: `/members/${$route.params.id}/edit` }"
                  class="btn btn-sm btn-primary"
                  >Edit</nuxt-link
                >
              </div>
            </div>

            <dashboard-cards :claims="claims" @clicked="filterClaims" />

            <date-filter :to.sync="filters.to" :from.sync="filters.from" />
            <button
              class="btn btn-primary btn-sm"
              @click.prevent="changePage(page)"
            >
              Filter
            </button>
            <button class="btn btn-secondary btn-sm" @click.prevent="reset">
              Reset
            </button>
            <search-filter
              @input="searchTerm = $event"
              placeholder="Search in claims"
              class="w-50 float-right"
            />

            <div class="clearfix"></div>

            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h4>Claims list</h4>
                  <div class="col-12">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <td>
                              <span class="sortable" @click="sortBy('status')"
                                >Status</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'status'"
                              ></div>
                            </td>

                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('claim_status')"
                                >Eob response</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'claim_status'"
                              ></div>
                            </td>
                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('payer_name')"
                                >Payer</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'payer_name'"
                              ></div>
                            </td>
                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('patient_name')"
                                >Patient</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'patient_name'"
                              ></div>
                            </td>
                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('doctor_name')"
                                >Doctor</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'doctor_name'"
                              ></div>
                            </td>
                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('total_claim_charges')"
                                >Charges</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'total_claim_charges'"
                              ></div>
                            </td>

                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('date_of_service')"
                                >Dos</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'date_of_service'"
                              ></div>
                            </td>

                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('date_of_assigned')"
                                >Assigned date</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'date_of_assigned'"
                              ></div>
                            </td>

                            <td>
                              <span
                                class="sortable"
                                @click="sortBy('date_of_submission')"
                                >Submit date</span
                              >
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'date_of_submission'"
                              ></div>
                            </td>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="claim in filteredItems(
                              claims,
                              searchTerm,
                              sort
                            )"
                            :key="claim.id"
                          >
                            <td>{{ claim.status }}</td>
                            <td>
                              <span
                                :class="claimStatusClass(claim.claim_status)"
                              >
                                {{ claim.claim_status }}
                              </span>
                            </td>
                            <td>{{ claim.payer_name }}</td>
                            <td>{{ claim.patient_name }}</td>
                            <td>{{ claim.doctor_name }}</td>
                            <td>{{ formatter(claim.total_claim_charges) }}</td>
                            <td>{{ AppDate(claim.date_of_service) }}</td>
                            <td>
                              <span v-if="claim.date_of_assigned">
                                {{ AppDate(claim.date_of_assigned) }}
                              </span>
                            </td>
                            <td>
                              <span v-if="claim.date_of_submission">
                                {{ AppDate(claim.date_of_submission) }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <pagination-links
              :resource="claims"
              :meta="meta"
              :totalPages="totalPages"
              :handler="changePage"
            />

            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h4>Details</h4>
                  <div class="row">
                    <div class="col-12 col-md-4">
                      <table class="table table-borderless">
                        <tbody>
                          <tr>
                            <td>Registered:</td>
                            <td>
                              {{ $moment(member.created_at.date).format("LL") }}
                            </td>
                          </tr>
                          <tr>
                            <td>Verified:</td>
                            <td class="users-view-verified">
                              {{ member.verified }}
                            </td>
                          </tr>

                          <tr>
                            <td>Status:</td>
                            <td>
                              <span
                                class="badge badge-success users-view-status"
                                v-if="member.active"
                                >Active</span
                              >
                              <span
                                class="badge badge-danger users-view-status"
                                v-else
                                >Not active</span
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-12 col-md-8">
                      <p class="text-dark ml-2" style="margin-top: 11px">
                        Permissions
                      </p>
                      <div
                        class="float-left ml-2 mb-2"
                        v-for="(
                          permission, index
                        ) in member.formattedPermissions"
                        :key="index"
                      >
                        {{ permission.display_name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <!-- <div class="row bg-primary bg-lighten-5 rounded mb-2 mx-25 text-center text-lg-left">
                                <div class="col-12 col-sm-4 p-2">
                                    <h6 class="text-primary mb-0">Money Collected: <span class="font-large-1 align-middle">$12500</span></h6>
                                </div>
                                <div class="col-12 col-sm-4 p-2">
                                    <h6 class="text-primary mb-0">Outstanding charges: <span class="font-large-1 align-middle">$53456</span></h6>
                                </div>
                                <div class="col-12 col-sm-4 p-2">
                                    <h6 class="text-primary mb-0">Submitted claims: <span class="font-large-1 align-middle">256</span></h6>
                                </div>
                            </div> -->
                  <h4>Basic info</h4>
                  <div class="col-12">
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td class="users-view-name">
                            {{ member.name }}
                          </td>
                        </tr>
                        <tr>
                          <td>E-mail:</td>
                          <td class="users-view-email">
                            {{ member.email }}
                          </td>
                        </tr>
                        <tr>
                          <td>Comapny:</td>
                          <td>
                            <span v-if="member.practise">
                              {{ member.practise.name }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h4>Responsibilities</h4>

                  <h5 class="my-2">Assigned Payers</h5>
                  <div class="col-12">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Contact</td>
                          <td>Address</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="payer in memberPayers"
                          :key="payer && payer['PAYER ID']"
                        >
                          <td class="users-view-name">{{ payer && payer["NAME"] }}</td>
                          <td>{{ payer && payer["COMMUNICATION NUMBER"] }}</td>
                          <td>{{ payer && payer["PAYER ADDRESS LINE"] }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <hr />
                  <div class="col-12">
                    <h5>Remark types</h5>
                    <ul v-for="code in member.remark_codes" :key="code">
                      <li>{{code}}</li>
                    </ul>
                    <!-- <ul>
                      <li>Avoidable</li>
                      <li>Low fruit</li>
                      <li>Compliance</li>
                    </ul> -->
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- users view ends -->
        </div>
      </div>
    </div>

    <impactFooter />
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";

import dashboardCards from "@/components/collectors/dashboard-cards";
import paginationLinks from "@/components/pagination/links";
import pagination from "@/components/pagination/index";
import searchFilter from "@/components/filters/search-filter";
import dateFilter from "@/components/filters/date-filter";

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
    dashboardCards,
    paginationLinks,
    searchFilter,
    dateFilter,
  },

  data() {
    return {
      member: {},
      memberPayers: [],
      loading: false,
      fetching: false,
      success: "fas fa-check-circle success",
      danger: "fas fa-times-circle danger",
      claims: [],
      meta: [],
      sort: {
        key: "status",
        order: "asc",
      },
      searchTerm: "",
      meta: {},
      page: 1,
      filters: {
        status: null,
        eob_response: null,
        to: null,
        from: null,
      },
    };
  },

  watch: {
    $route() {
      this.routePage();
      this.fetchClaimsForCollector(this.page, this.validatedFilters());
    },
  },

  computed: {
    ...mapGetters("profile", {
      payers: "payers",
      remarkTypes: "remarkTypes",
    }),

    totalPages() {
      return this.meta ? Math.ceil(this.meta.total / this.meta.per_page) : 0;
    },
  },

  methods: {
    ...mapActions("profile", {
      fetchPayers: "fetchPayers",
      getRemarkTypes: "getRemarkTypes",
    }),

    reset() {
      this.resetFilters();
      this.changePage(this.page);
    },

    validatedFilters() {
      let filters = {};
      for (const [key, value] of Object.entries(this.filters)) {
        if (value == null || value == 0 || value == "") {
          continue;
        }
        filters[key] = value;
      }
      return filters;
    },

    routePage() {
      if (this.$route.query && this.$route.query.page) {
        this.page = this.$route.query.page;
        return;
      }
      this.page = 1;
    },

    changePage(page) {
      this.updateRoute(page, this.validatedFilters());
    },

    updateRoute(page, filters) {
      this.$router.replace({
        query: {
          page,
          ...filters,
        },
      });
    },

    routeFilters() {
      if (this.$route.query) {
        let qs = this.$route.query;
        this.filters.status = qs.status || null;
        this.filters.eob_response = qs.eob_response || null;
        this.filters.from = qs.from || null;
        this.filters.to = qs.to || null;
      }
    },

    resetFilters() {
      this.filters.status = null;
      this.filters.eob_response = null;
      this.filters.from = null;
      this.filters.to = null;
    },

    sortBy(column) {
      this.sort.key = column;
      this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
    },

    async fetchMember() {
      this.loading = true;
      if (!this.$route.params.id) {
        this.$router.push({ path: "/members" });
      }
      await this.$axios
        .post(`/provider/fetch-member/${this.$route.params.id}`)
        .then(({ data }) => {
          this.member = data.data;
          const values = [];
          if (this.payers && this.payers.length > 0) {
            this.member.payers.forEach((payer) => {
              values.push(
                this.payers.find((p) => p["PAYER ID"] && p["PAYER ID"] === payer.payer_id)
              );
            });
          }
          this.memberPayers = values;
          this.loading = false;
          Promise.resolve();
        })
        .catch((err) => {
          this.$router.push({ path: "/members" });
          this.loading = false;
          Promise.reject();
        });
    },

    fetchClaimsForCollector(page, filters = {}) {
      page = page == null || page == "" ? this.page : page;

      this.fetching = true;

      this.$axios
        .post("/provider/get-collector-claims", {
          provider_id: this.member.id,
          page,
          ...filters,
        })
        .then(({ data }) => {
          this.claims = data.data;
          this.meta = data.meta;
          this.fetching = false;
        })
        .catch((e) => {
          this.$toast.show("No claims found").goAway(5000);
          this.fetching = false;
        });
    },

    remarkClass(type) {
      return this.remarkTypes.includes(type) ? this.success : this.danger;
    },

    getPayers(payers = []) {
      payers = !payers.length ? this.payers : payers;
      return payers.map((payer) => payer["PAYER ID"] && payer["PAYER ID"].toString());
    },

    claimStatusClass(status) {
      switch (status) {
        case "denied":
          return "danger";
          break;
        case "rejected":
          return "danger";
          break;
        case "accepted":
          return "success";
          break;
        default:
          return "warning";
          break;
      }
    },

    filterClaims({ formattedTitle }) {
      if (formattedTitle == "accepted") {
        this.filters.eob_response = formattedTitle;
      } else {
        this.filters.status = formattedTitle;
        if (formattedTitle != "submitted") {
          this.filters.eob_response = null;
        }
      }
      this.changePage(this.page, this.validatedFilters());
    },

    checkRoute() {
      this.routePage();
      this.routeFilters();
    },
  },

  created() {
    this.checkRoute();
    this.fetchPayers();
    this.fetchMember().then(() => {
        this.fetchClaimsForCollector(this.page, this.validatedFilters());
        this.getRemarkTypes(this.member.remark_codes);
      });
  },
};
</script>

