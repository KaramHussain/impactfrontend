<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">

          <div class="content-header row">
              <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                <h3 class="content-header-title mb-0 d-inline-block">Collectors</h3>

                <breadcrumbs />

              </div>

              <div class="content-header-right col-md-6 col-12">

                <analyzer />

                <date-filter />

                <search-filter @input="searchTerm = $event" placeholder="search by role, name..." />

              </div>

          </div>

          <div class="content-body">

            <section id="dom">

              <div class="row">
                  <div class="col-12">
                      <div class="card">

                          <div class="card-content collapse show">
                              <div class="card-body card-dashboard dataTables_wrapper dt-bootstrap">

                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered dom-jQuery-events">
                                        <thead>
                                            <tr>
                                              <th>
                                                <span class="sortable" @click="sortBy('name')">
                                                  Collector

                                                  <div class="arrow"
                                                  :class="{'arrow--asc':sort.order == 'asc',
                                                    'arrow--desc':sort.order == 'desc'}"
                                                    v-if="sort.key == 'name'">
                                                  </div>
                                                </span>

                                              </th>
                                              <th>

                                                <span class="sortable" @click="sortBy('roles.name')">
                                                  Roles

                                                  <div class="arrow"
                                                  :class="{'arrow--asc':sort.order == 'asc',
                                                    'arrow--desc':sort.order == 'desc'}"
                                                    v-if="sort.key == 'roles.name'">
                                                  </div>
                                                </span>

                                              </th>
                                              <th>

                                                <span class="sortable" @click="sortBy('created_by.name')">
                                                  Collected

                                                  <div class="arrow"
                                                  :class="{'arrow--asc':sort.order == 'asc',
                                                    'arrow--desc':sort.order == 'desc'}"
                                                    v-if="sort.key == 'created_by.name'">
                                                  </div>
                                                </span>

                                              </th>
                                              <th>
                                                  <span class="sortable" @click="sortBy('created_at.date')">
                                                  Pending

                                                  <div class="arrow"
                                                  :class="{'arrow--asc':sort.order == 'asc',
                                                    'arrow--desc':sort.order == 'desc'}"
                                                    v-if="sort.key == 'created_at.date'">
                                                  </div>
                                                </span>

                                              </th>
                                              <th>Avg days to collect</th>
                                            </tr>
                                        </thead>

                                        <tbody v-if="filteredItems(collectors, searchTerm, sort).length">

                                          <tr v-for="collector in filteredItems(collectors, searchTerm, sort)" :key="collector.id">

                                              <td>{{collector.name}}</td>
                                              <td>
                                                <span v-if="collector.roles">
                                                  {{collector.roles.name}}
                                                </span>
                                              </td>
                                              <td>
                                                <span v-if="collector.created_by">{{collector.created_by.name}}</span>
                                              </td>
                                              <td>
                                                <span v-if="collector.created_at">
                                                  {{$moment(collector.created_at.date).format('LL')}}
                                                </span>
                                              </td>
                                              <td>
                                                {{21}}
                                              </td>
                                          </tr>

                                        </tbody>
                                    </table>
                                </div>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>

            </section>

            <client-only>

              <template v-if="collectors.length && meta.total > meta.per_page">
                <paginate
                  :page-count="totalPages"
                  :margin-pages="5"
                  :page-range="5"
                  :click-handler="changePage"
                  :containerClass="'pagination justify-content-end'"
                  :page-class="'page-item'"
                  :page-link-class="'page-link'"
                  :prev-class="'page-item'"
                  :prev-link-class="'page-link'"
                  :next-class="'page-item'"
                  :next-link-class="'page-link'" />
              </template>

            </client-only>

          </div>

        </div>

    </div>

  </main>

</template>

<script>

import impactHeader from '@/components/layouts/impact-header'
import impactSidebar from '@/components/layouts/impact-sidebar'
import breadcrumbs from '@/components/breadcrumbs'
import searchFilter from '@/components/filters/search-filter'
import dateFilter from '@/components/filters/date-filter'
import analyzer from '@/components/collectors/analyzer'

export default {

  middleware:['auth', 'admin'],

  head() {
    return {
      title:'Members list'
    }
  },

  components: {
    impactHeader,
    impactSidebar,
    breadcrumbs,
    searchFilter,
    dateFilter,
    analyzer
  },

  data() {
    return {
      collectors:[],
      sort: {
        key: 'name',
        order: 'asc'
      },
      searchTerm : '',
      loading:false,
      meta: {},
      page : 1,
      filters: {}
    }
  },

  computed: {

    totalPages() {
      return Math.ceil(this.meta.total / this.meta.per_page)
    }

  },

  watch: {
    $route() {
      this.routePage()
      this.getCollectorReports(this.page, this.validateFilters())
    }
  },

  methods: {

    routePage() {
      if(this.$route.query && this.$route.query.page) {
        this.page = this.$route.query.page;
        return;
      }
      this.page = 1;
    },

    changePage(page) {
      this.updateRoute(page, this.validateFilters());
    },

    updateRoute(page, filters) {

      this.$router.replace({
        query: {
          page,
          ...filters
        }
      });

    },

    validateFilters() {
      let filters = {};
      for(const [key, value] of Object.entries(this.filters)) {
        if(value == null || value == 0 || value == '') {
          continue;
        }
        filters[key] = value;
      }
      return filters;
    },

    sortBy(column) {
      this.sort.key = column
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },

    async getCollectorReports(page, filters = {}) {
      this.loading = true
      page = page == null || page == '' ? this.page : page
      await this.$axios.post(`provider/get-collectors-with-claims?page=${page}`)
      .then(({data}) => {
        this.collectors = data.data
        this.meta = data.meta
        this.loading = false
      })
      .catch(e => {
        this.loading = false
      });
    }

  },

  created() {
    this.getCollectorReports();
    this.routePage();
  }

}

</script>

122