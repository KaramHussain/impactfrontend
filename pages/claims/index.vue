<template>
  <main>
    <impactHeader />

    <impactSidebar />

    <div class="app-content content">
      <div class="content-overlay"></div>

      <div class="content-wrapper">
        <div class="row">
          <div class="col-md-6">
            <h3 class="content-header-title mb-0 d-inline-block mr-2">
              Claims List
            </h3>
            <breadcrumbs path="claims" />
          </div>

          <div class="col-md-6">
            <div class="dropdown d-inline-block" style="width: 65%">
              <a
                class="btn btn-light filter-btn btn-sm dropdown-toggle"
                href="#"
                role="button"
                id="responseLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select headers
              </a>

              <div class="dropdown-menu" aria-labelledby="responseLink">
                <a
                  class="dropdown-item"
                  href="javascript:void(0)"
                  v-for="{ key, value } in claimHeaders"
                  :key="value"
                >
                  <label :for="value">
                    <input
                      type="checkbox"
                      class="claimHeader"
                      :id="value + '_claimHeader'"
                      :value="value"
                      name="claimHeader"
                    />
                    {{ key }}
                  </label>
                </a>
              </div>
            </div>

            <button
              class="btn btn-primary btn-sm d-inline-block"
              style="width: 32%"
              @click="createGraph"
            >
              Collectors Performance
            </button>
          </div>
        </div>

        <claimlist-cards
          :stats="stats"
          class="my-2 mx-0"
          @clicked="filterClaims"
        />

        <div class="content-header row">
          <div class="col-12">
            <h4 class="my-1">Front & backend Filters</h4>
            <date-filter :to.sync="filters.to" :from.sync="filters.from" />
          </div>

          <div class="col-12">
            <div class="form-group row">
              <div class="col-md-4 col-12">
                <label class="form-label" for="status">Status</label>

                <div class="dropdown">
                  <a
                    class="btn btn-light filter-btn btn-sm dropdown-toggle"
                    href="#"
                    role="button"
                    id="statusLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select Status
                  </a>

                  <div class="dropdown-menu" aria-labelledby="statusLink">
                    <a
                      class="dropdown-item"
                      href="javascript:void(0)"
                      v-for="{ key, value } in statuses"
                      :key="value"
                    >
                      <label :for="value">
                        <input
                          :checked="shouldBeChecked(value, 'status')"
                          type="checkbox"
                          :id="value"
                          :value="value"
                          name="status"
                          @change="addFilter($event, 'status')"
                        />
                        {{ key }}
                      </label>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-12">
                <label class="form-label" for="status">Eob response</label>

                <div class="dropdown">
                  <a
                    class="btn btn-light filter-btn btn-sm dropdown-toggle"
                    href="#"
                    role="button"
                    id="responseLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select response
                  </a>

                  <div class="dropdown-menu" aria-labelledby="responseLink">
                    <a
                      class="dropdown-item"
                      href="javascript:void(0)"
                      v-for="{ key, value } in claimStatuses"
                      :key="value"
                    >
                      <label :for="value">
                        <input
                          :checked="shouldBeChecked(value, 'eob_response')"
                          type="checkbox"
                          :id="value"
                          :value="value"
                          name="eobResponse"
                          @change="addFilter($event, 'eob_response')"
                        />
                        {{ key }}
                      </label>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-12">
                <label class="form-label" for="payers">Payers</label>

                <div class="dropdown">
                  <a
                    class="btn btn-light filter-btn btn-sm dropdown-toggle"
                    href="#"
                    role="button"
                    id="responseLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select Payers
                  </a>

                  <div class="dropdown-menu" aria-labelledby="responseLink">
                    <a
                      class="dropdown-item"
                      href="javascript:void(0)"
                      v-for="payer in payers"
                      :key="payer['PAYER ID']"
                    >
                      <label :for="payer['PAYER ID']">
                        <input
                          :checked="shouldBeChecked(payer['PAYER ID'], 'payer')"
                          type="checkbox"
                          :id="payer['PAYER ID']"
                          :value="payer['PAYER ID']"
                          name="payer"
                          @change="addFilter($event, 'payer')"
                        />
                        {{ payer["PAYER NAME"] }}
                      </label>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-12 mt-2">
                <label class="form-label" for="status">Sort by</label>
                <select
                  id="status"
                  class="form-control form-control-sm"
                  v-model="filters.sort_by"
                >
                  <option
                    :value="value"
                    v-for="{ key, value } in sorts"
                    :key="value"
                  >
                    {{ key }}
                  </option>
                </select>
              </div>

              <div class="col-md-4 col-12 mt-2">
                <label for="orderBy" class="form-label">Order by</label>
                <select
                  id="orderBy"
                  class="form-control form-control-sm"
                  v-model="filters.order_by"
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>

              <div class="filter col-md-2 col-12 mt-2">
                <label style="visibility: hidden">Filter</label><br />
                <button
                  class="btn btn-primary btn-sm px-2"
                  @click.prevent="filter"
                >
                  Filter
                </button>
              </div>

              <div class="col-md-2 col-12 mt-2">
                <label style="visibility: hidden">Reset</label><br />
                <button
                  class="btn btn-secondary btn-sm px-2"
                  @click.prevent="reset"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-12">
            <label for="">Analyze Performance</label>
            <analyzer class="mb-2" />
          </div>

          <div class="content-header-right col-md-6 col-12">
            <search-filter
              @input="searchTerm = $event"
              placeholder="Search in claims"
            />
          </div>
        </div>

        <div class="content-body">
          <section id="dom">
            <div class="card">
              <div class="card-content collapse show">
                <div
                  class="card-body card-dashboard dataTables_wrapper dt-bootstrap"
                >
                  <div class="table-responsive">
                    <div>
                      <h2>Uploaded Files</h2>
                      <ul>
                        <li>
                          <!-- {{ AppDate(file.Time) }} -->
                        </li>
                      </ul>
                    </div>
                    <table
                      class="table table-striped table-bordered dom-jQuery-events"
                    >
                      <thead>
                        <tr>
                          <th>
                            <span class="sortable" @click="sortBy('status')">
                              Status

                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'status'"
                              ></div>
                            </span>
                          </th>

                          <th>
                            <span
                              class="sortable"
                              @click="sortBy('claim_status')"
                            >
                              EOB Response

                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'claim_status'"
                              ></div>
                            </span>
                          </th>

                          <th>
                            <span
                              class="sortable"
                              @click="sortBy('total_claim_charges')"
                            >
                              Claim charges

                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'total_claim_charges'"
                              ></div>
                            </span>
                          </th>

                          <th>
                            <span
                              class="sortable"
                              @click="sortBy('date_of_service')"
                            >
                              DOS

                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'date_of_service'"
                              ></div>
                            </span>
                          </th>

                          <th>
                            <span
                              class="sortable"
                              @click="sortBy('payer_name')"
                            >
                              Payer
                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'payer_name'"
                              ></div>
                            </span>
                          </th>

                          <!-- <th>
                                        <span class="sortable" @click="sortBy('patient_name')">
                                        Patient
                                          <div class="arrow"
                                          :class="{'arrow--asc':sort.order == 'asc',
                                            'arrow--desc':sort.order == 'desc'}"
                                            v-if="sort.key == 'patient_name'">
                                          </div>
                                        </span>
                                      </th> -->

                          <th>
                            Remark types
                            <div
                              class="arrow"
                              :class="{
                                'arrow--asc': sort.order == 'asc',
                                'arrow--desc': sort.order == 'desc',
                              }"
                              v-if="sort.key == 'remark_types'"
                            ></div>
                          </th>

                          <th>
                            <span
                              class="sortable"
                              @click="sortBy('provider.name')"
                            >
                              Person working

                              <div
                                class="arrow"
                                :class="{
                                  'arrow--asc': sort.order == 'asc',
                                  'arrow--desc': sort.order == 'desc',
                                }"
                                v-if="sort.key == 'provider.name'"
                              ></div>
                            </span>
                          </th>

                          <th>Actions</th>
                        </tr>
                      </thead>

                      <!-- <tbody v-if="filteredItems(claims, searchTerm, sort).length"> -->
                      <tbody v-for="file in uploadedFiles" :key="file.id">
                        <tr>
                          <!-- <tr v-for="(claim, index) in filteredItems(claims, searchTerm, sort)" :key="index"> -->

                          <!-- <td>{{claim.status}}</td> -->
                          <td>{{file.file_type == '837' ? "Not Submitted" : ""}}</td>
                          <td class="text-warning">
                            {{file.file_type == '837' ? "in-progress" : ""}}
                            
                            <!-- <span :class="claimStatusClass(claim.claim_status)">
                                          {{claim.claim_status}}
                                        </span> -->
                            <!-- EOB response -->
                          </td>

                          <!-- <td>{{formatter(claim.total_claim_charges)}}</td>
                                      <td>{{AppDate(claim.date_of_service)}}</td> -->

                          <td>{{file.Total_Claim_Charge_Amount}}</td>
                          <td>{{ AppDate(file.Time) }}</td>

                          <!-- <td>{{claim.payer_name}}</td> -->
                          <td>{{file.Payer_Last_Name}}</td>

                          <!-- <td>{{claim.patient_name}}</td> -->

                          <td>
                            <!-- <span v-if="hasType('low_fruit', index)">Low fruit, </span>
                                        <span v-if="hasType('avoidable', index)"> Avoidable, </span>
                                        <span v-if="hasType('compliance', index)"> Compliance </span> -->
                          </td>

                          <td>
                            <!-- <span v-if="claim.provider != null">
                                          {{claim.provider.name}}
                                        </span>
                                        <span v-else>
                                          None
                                        </span> -->
                            Muskaan
                          </td>

                          <td>
                            <!-- <nuxt-link :to="{path:`/claims/${file.id}`}">view</nuxt-link> -->
                            <button
                              class="btn btn-info text-white mx-2"
                              @click="fetchDataById(file._id)"
                            >
                              View
                            </button>
                            <!-- <button
                              class="btn btn-info text-white mx-2"
                              @click="fetchDataById('65705f52438358190e68e8cd')"
                            >
                              View
                            </button> -->
                          </td>
                          <!-- <td v-if="claim.remark_codes">

                                        <nuxt-link :to="{path:`/claims/${claim.claim_id}`}">view</nuxt-link>

                                      </td> -->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <pagination-links
            :resource="claims"
            :meta="meta"
            :totalPages="totalPages"
            :handler="changePage"
          />
        </div>
      </div>
    </div>

    <impactFooter />
  </main>
</template>

<script>
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";
import breadcrumbs from "@/components/breadcrumbs";
import analyzer from "@/components/collectors/analyzer";
import claimlistCards from "@/components/collectors/claimlist-cards";
import searchFilter from "@/components/filters/search-filter";
import dateFilter from "@/components/filters/date-filter";
import paginationLinks from "@/components/pagination/links";
import pagination from "@/components/pagination/index";
import axios from "axios";

import { mapGetters, mapActions } from "vuex";

export default {
  middleware: ["auth", "admin"],

  head() {
    return {
      title: "Claims list",
    };
  },

  components: {
    analyzer,
    impactHeader,
    impactFooter,
    impactSidebar,
    breadcrumbs,
    claimlistCards,
    searchFilter,
    dateFilter,
    paginationLinks,
  },

  data() {
    return {
      claims: [],
      stats: {},
      sort: {
        key: "name",
        order: "asc",
      },
      searchTerm: "",
      loading: false,
      meta: {},
      page: 1,
      filters: {
        from: null,
        to: null,
        status: new Array(),
        eob_response: new Array(),
        payer: new Array(),
        sort_by: "date",
        order_by: "asc",
      },
      patientDetails: {},
      insuranceDetails: {},
      claimsDetails: {},
    };
  },

  computed: {
    //muskaan

    uploadedFiles() {
      return this.$store.state.uploadedFiles;
    },

    //muskaan
    ...mapGetters({
      payers: "profile/payers",
    }),

    totalPages() {
      return this.meta ? Math.ceil(this.meta.total / this.meta.per_page) : 0;
    },

    statuses() {
      return [
        { value: "to_be_reviewed", key: "To be reviewed" },
        { value: "assigned", key: "Assigned" },
        { value: "submitted", key: "Submitted" },
        { value: "resolved", key: "Resolved" },
      ];
    },

    claimStatuses() {
      return [
        { key: "Pending", value: "pending" },
        { key: "Processing", value: "processing" },
        { key: "Rejected", value: "rejected" },
        { key: "Denied", value: "denied" },
        { key: "Accepted", value: "accepted" },
      ];
    },

    sorts() {
      return [
        { key: "Date", value: "date" },
        { key: "Date of service", value: "dos" },
        { key: "Total charges", value: "total_charges" },
      ];
    },

    claimHeaders() {
      return [
        { key: "Resubmitted", value: "submitted" },
        { key: "Expected Revenue", value: "expected_revenue" },
        { key: "Avg collected raito", value: "avg_collected_raito" },
        { key: "Avg days to collect", value: "avg_days_to_collect" },
        { key: "Collected revenue", value: "collected_revenue" },
      ];
    },

    validatedClaimHeaders() {
      let headers = Array.from(
        document.querySelectorAll(".claimHeader:checked")
      );
      if (!headers.length) return;
      return headers.map((header) => header.value);
    },
  },

  watch: {
    $route() {
      this.routePage();
      this.getClaims(this.page, this.validatedFilters());
    },
  },

  methods: {
    //muskaan start

    async fetchDataById(fileId) {
      try {
        console.log("called fetch by id on button click");
        await axios
          .post(
            "https://upload-stage.carebidsexchange.com/api/patient_information",
            {
              id: fileId,
            }
          )
          .then(async (response) => {
            if (response.data.errors) {
              console.log("in errors",response.data.errors)
              console.log("Oops! Something Went Wrong.");
              this.$toast.show("Oops! Something Went Wrong.").goAway(5000);

            } else {
              console.log("in success")
              console.log("Data fetched successfully:", response.data);
              this.patientDetails = response.data?.Patient_detail;
              this.insuranceDetails = response.data?.Insurance;
              this.claimsDetails = response.data?.Claims;
              this.claimsDetails['transactionType'] = response.data?.Claim837type
              this.insuranceDetails['Insurance_plan'] = response.data?.Insurance_plan
              // this.apiResponseReceived = true;

              await localStorage.setItem(
                "patientDetails",
                JSON.stringify(response.data?.Patient_detail)
              );
              await localStorage.setItem(
                "insuranceDetails",
                JSON.stringify(response.data?.Insurance)
              );
              await localStorage.setItem(
                "claimsDetails",
                JSON.stringify(response.data?.Claims)
              );
              await localStorage.setItem(
                "billingProviderDetails",
                JSON.stringify(response.data?.Billing_provider)
              );
              await localStorage.setItem(
                "renderingProviderDetails",
                JSON.stringify(response.data?.Rendering_provider)
              );

              await localStorage.setItem('ediFormPath', `/claims/${fileId}`)

              console.log(
                "response data",
                this.patientDetails,
                this.insuranceDetails,
                this.claimsDetails
              );
              this.$router.push(`/claims/${fileId}`);
            }
          })
          .catch((error) => {
            console.log("error", error);
            // alert("Oops! Server Error.");
            console.log("Oops! Server Error.");
          });

        // console.log(typeof fileId);
        // console.log(fileId);
        // this.$router.push(`/claims/${fileId}`);
        // Handle the fetched data as needed, e.g., update the state or navigate to another page
      } catch (error) {
        console.error("Error fetching data by ID:", error);
      }
    },

    //muskaan end

    ...mapActions({
      fetchPayers: "profile/fetchPayers",
    }),

    createGraph() {
      this.$router.push({
        name: "claims-reports",
        query: { graphType: this.validatedClaimHeaders },
      });
    },

    shouldBeChecked(value, type) {
      if (
        (value == "assigned" || value == "to_be_reviewed") &&
        this.$route.query.status &&
        (this.$route.query.status == "unpaid_claims" ||
          Array.from(this.$route.query.status.includes("unpaid_claims")))
      ) {
        return true;
      }
      return this.filters[type].includes(value);
    },

    addFilter(event, type) {
      let values = [...this.filters[type]];
      if (event.target.checked) {
        values = [...values, event.target.value];
      } else {
        values = values.filter((res) => res !== event.target.value);
      }
      this.$set(this.filters, type, values);
    },

    filterClaims({ formattedTitle }) {
      let statuses = this.statuses.map((status) => status.value.toLowerCase());
      let claimStatuses = this.claimStatuses.map((status) =>
        status.value.toLowerCase()
      );

      statuses.push("unpaid_claims");

      if (claimStatuses.includes(formattedTitle)) {
        this.filters.eob_response = formattedTitle;
      } else {
        this.filters.status = formattedTitle;
        if (formattedTitle != "submitted") {
          this.filters.eob_response = [];
        }
      }
      this.filter();
    },

    filter() {
      this.changePage(this.page, this.validatedFilters());
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
        this.filters.from = qs.from;
        this.filters.to = qs.to;
        this.filters.status = qs.status || [];
        this.filters.eob_response = qs.eob_response || [];
        this.filters.payer = qs.payer || [];
        this.filters.sort_by = qs.sort_by || "date";
        this.filters.order_by = qs.order_by || "asc";
      }
    },

    reset() {
      this.filters.from = null;
      this.filters.to = null;
      this.filters.status = [];
      this.filters.eob_response = [];
      this.filters.payer = [];
      this.filters.sort_by = "date";
      this.filters.order_by = "asc";
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

    sortBy(column) {
      this.sort.key = column;
      this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
    },

    async getClaims(page, filters = {}) {
      this.loading = true;
      page = page == null || page == "" ? this.page : page;
      await this.$axios
        .post("provider/get-claims-with-collector", {
          practise_id: this.user.practise_id,
          page,
          ...filters,
        })
        .then(({ data }) => {
          this.claims = data.data || {};
          this.meta = data.meta || {};
          this.stats = data.hasOwnProperty("stats") ? data.stats[0] : {};
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
        });
    },

    remarkTypes(key) {
      let low_fruit = 0,
        avoidable = 0,
        compliance = 0;

      this.claims[key].remark_codes.forEach((code) => {
        code.low_fruit == 1 ? (low_fruit = 1) : "";
        code.avoidable == 1 ? (avoidable = 1) : "";
        code.compliance == 1 ? (compliance = 1) : "";
      });

      return { low_fruit, avoidable, compliance };
    },

    hasType(name, key) {
      return this.remarkTypes(key)[name] == 1;
    },
  },

  created() {
    //muskaan
    // Dispatch the action when the component is created
    this.$store.dispatch("fetchUploadedFiles");
    //muskaan
    this.routePage();
    this.routeFilters();
    this.fetchPayers();
    this.getClaims(this.page, this.validatedFilters());
  },
};
</script>

<style lang="scss" scoped>
.dropdown .dropdown-menu .dropdown-item {
  padding: 5px 15px !important;
}
.filter-btn {
  background: #fff !important;
  color: #222 !important;
  width: 100%;
  text-align: left;
  border: 1px solid #babfc7 !important;
}
</style>
