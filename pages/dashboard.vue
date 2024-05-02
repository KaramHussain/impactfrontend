<template>
  <main>
    <impactHeader />
    <impactSidebar />
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="content-header-left col-md-6 col-12 mb-2">
            <h3 class="content-header-title mb-0 d-inline-block">
              {{ user.name }}'s Dashboard
            </h3>
          </div>
          <div
            class="content-header-right col-md-6 col-12 mb-2 float-right text-right"
            v-if="user.created_by"
          >
            <assigned-by-info />
          </div>
        </div>
        <div class="content-body">
          <dashboard-cards :claims="claims" @clicked="filterClaims" />
          <div class="row">
            <div class="col-12">
              <div class="card">
                <!-- Content -->
                <div class="card-content">
                  <div class="card-body">
                    <section id="dom">
                      <div class="row">
                        <div class="col-12">
                          <div class="card">
                            <div class="card-header">
                              <h4 class="card-title">Claims</h4>
                            </div>
                            <div class="card-content collapse show">
                              <div
                                class="card-body card-dashboard dataTables_wrapper dt-bootstrap"
                              >
                                <div class="table-responsive">
                                  <table
                                    class="table table-striped table-bordered dom-jQuery-events"
                                  >
                                    <thead>
                                      <tr>
                                        <th>Patient</th>
                                        <th>Doctor</th>
                                        <th>Payer</th>
                                        <th>Total charges</th>
                                        <th>Patient responsibility</th>
                                        <th>DOS</th>

                                        <th>
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>

                                    <template v-if="fetching">
                                      <tbody>
                                        <tr colspan="9">
                                          <i
                                            class="fas fa-circle-notch fa-spin"
                                          ></i>
                                        </tr>
                                      </tbody>
                                    </template>

                                    <template v-else>
                                      <tbody v-if="claims.length">
                                        <tr
                                          v-for="(claim, index) in claims"
                                          :key="index"
                                        >
                                          <td>
                                            {{ ucFirst(claim.patient_name) }}
                                          </td>
                                          <td>
                                            {{ ucFirst(claim.doctor_name) }}
                                          </td>
                                          <td>
                                            {{ ucFirst(claim.payer_name) }}
                                          </td>
                                          <td>
                                            {{
                                              formatter(
                                                claim.total_claim_charges
                                              )
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              formatter(
                                                claim.patient_responsibility
                                              )
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              $moment(
                                                claim.date_of_service
                                              ).format("ll")
                                            }}
                                          </td>
                                          <td>
                                            <nuxt-link
                                              :to="{
                                                path: `/claims/${claim.claim_id}`
                                              }"
                                            >
                                              view
                                            </nuxt-link>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </template>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <!--card-body-->
              </div>
              <!-- card -->

              <!-- <client-only>

                    <template v-if="Number(meta.total) > Number(meta.per_page)">
                      <paginate
                        :page-count="totalPages"
                        :margin-pages="5"
                        :page-range="5"
                        :click-handler="changePageNumber"
                        :containerClass="'pagination justify-content-end'"
                        :page-class="'page-item'"
                        :page-link-class="'page-link'"
                        :prev-class="'page-item'"
                        :prev-link-class="'page-link'"
                        :next-class="'page-item'"
                        :next-link-class="'page-link'" />
                    </template>

                  </client-only> -->

              <nav aria-label="pagination" v-if="meta.total > meta.per_page">
                <ul class="pagination justify-content-right">
                  <li class="page-item" :class="{ disabled: page == 1 }">
                    <a
                      class="page-link"
                      href="#"
                      tabindex="-1"
                      @click.prevent="changePageNumber(page - 1)"
                      >Previous</a
                    >
                  </li>
                  <li
                    class="page-item"
                    :class="{ active: page == i }"
                    v-for="i in totalPages"
                    :key="i"
                  >
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="changePageNumber(i)"
                      >{{ i }} <span class="sr-only">(current)</span></a
                    >
                  </li>

                  <li
                    class="page-item"
                    :class="{ disabled: page == totalPages }"
                  >
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="changePageNumber(Number(page) + 1)"
                      >Next</a
                    >
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <impactFooter />
  </main>
</template>

<script>
//we will now show claims from edi service
//claims will be displayed all but according to assigned_date order
//all claims from edi will be matched with all claims with claims saved at carepays
//those with assigned_date higher means oldest will be displayed first

import axios from "axios";
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";
import assignedByInfo from "@/components/assigned-by-info";

import dashboardCards from "@/components/collectors/dashboard-cards";

export default {
  middleware: ["auth", "collector"],

  head() {
    return {
      title: "Dashboard"
    };
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    assignedByInfo,
    dashboardCards
  },

  data() {
    return {
      claims: [],
      page: 1,
      fetching: false,
      meta: {},
      filters: []
    };
  },

  watch: {
    $route() {
      this.routePage();
      this.paginate();
    }
  },

  computed: {
    totalPages() {
      return Math.ceil(Number(this.meta.total) / Number(this.meta.per_page));
    }
  },

  methods: {
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

    changePage(page) {
      this.updateRoute(page, this.validatedFilters());
    },

    updateRoute(page, filters) {
      this.$router.replace({
        query: {
          page,
          ...filters
        }
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

    changePageNumber(page) {
      this.$router.push({ query: { page } });
    },

    paginate() {
      this.fetchClaimsForCollector();
    },

    routePage() {
      if (this.$route.query && this.$route.query.page) {
        this.page = this.$route.query.page;
        return;
      }
      this.page = 1;
    },

    fetchClaimsForCollector() {
      let payers = this.getPayers();
      let rc_types = this.getRemarkTypes();
      let filters = this.validatedFilters();

      this.fetching = true;

      this.$axios
        .post("/provider/claims", {
          provider_id: this.user.id,
          practise_id: this.user.practise_id,
          payers,
          rc_types,
          page: this.page,
          ...filters
        })
        .then(({ data }) => {
          this.claims = data.data;
          this.meta = data.meta;
          this.fetching = false;
        })
        .catch(e => {
          this.$toast.show("No claims found").goAway(5000);
          this.fetching = false;
        });
    },

    getRemarkTypes() {
      //@todo only include which are not zero

      let low_fruit = this.user.remark_codes.find(code => code.low_fruit == 1);
      let avoidable = this.user.remark_codes.find(code => code.avoidable == 1);
      let compliance = this.user.remark_codes.find(
        code => code.compliance == 1
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

    getPayers() {
      return this.user.payers.map(payer => payer.payer_id.toString());
    }
  },

  created() {
    this.routePage();
    this.routeFilters();
    this.fetchClaimsForCollector();
  }
};
</script>
