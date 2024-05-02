<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">
          <div class="content-header">
            <h4>Denied Claims</h4>

            <div class="row">

              <div class="col-4">
                <div class="form-group">
                  <label for="date" class="form-label">Date</label>
                  <input type="date" class="form-control form-control-sm" v-model="filters.date">
                </div>
              </div>

              <div class="col-4"></div>

              <div class="col-4">

                <div class="form-group">
                  <label for="date" class="form-label">Search</label>
                  <input type="search" class="form-control form-control-sm" v-model="searchTerm" placeholder="Search columns">
                </div>

              </div>

            </div>

          </div>

          <div class="content-body">

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

                                            <div class="card-content collapse show">
                                                <div class="card-body card-dashboard dataTables_wrapper dt-bootstrap">

                                                    <div class="table-responsive">
                                                        <table class="table table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('REMARK CODE')">
                                                                      Remark code
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'REMARK CODE'">
                                                                      </div>
                                                                    </span>
                                                                  </th>
                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('REMARK DESCRIPTION')">
                                                                      Code description
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'REMARK DESCRIPTION'">
                                                                      </div>
                                                                    </span>
                                                                  </th>
                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('DATE')">
                                                                      Date
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'DATE'">
                                                                      </div>
                                                                    </span>
                                                                  </th>

                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('COUNT')">
                                                                      Code frequency
                                                                      <div class="arrow" :class="{'arrow--asc':sort.order == 'asc', 'arrow--desc':sort.order == 'desc'}" v-if="sort.key == 'COUNT'"></div>
                                                                    </span>
                                                                  </th>


                                                                </tr>
                                                            </thead>

                                                            <template v-if="fetching">
                                                              <tbody>
                                                                <tr colspan="9">
                                                                  <i class="fas fa-circle-notch fa-spin"></i>
                                                                </tr>
                                                              </tbody>
                                                            </template>

                                                            <template v-else>

                                                              <template v-if="filteredItems(this.paginatedItems, this.searchTerm, this.sort).length">
                                                                <tr v-for="(code, index) in filteredItems(this.paginatedItems, this.searchTerm, this.sort)" :key="index">
                                                                  <td><span>{{code['REMARK CODE']}}</span></td>
                                                                  <td><span>{{code['REMARK DESCRIPTION']}}</span></td>
                                                                  <td><span>{{$moment(code['DATE']).format('ll')}}</span></td>
                                                                  <td><span>{{code['COUNT']}}</span></td>
                                                                </tr>
                                                              </template>

                                                              <template v-else>
                                                                <p>No record found</p>
                                                              </template>

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
                        </div><!--card-body-->

                    </div> <!-- card -->

                    <client-only>

                      <template v-if="Number(totalPages) >= Number(perPage)">
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
        </div>

    </div>

    <impactFooter />

  </main>

</template>

<script>

import axios from 'axios'
import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'

export default {

  middleware:['auth'],

  head() {
    return {
      title:'Remark codes'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  data() {
    return {
      remarkCodes : [],
      fetching    : false,
      filters : {
        date  : null
      },
      page    : 1,
      perPage : 50,
      from    : 0,
      to      : 50,
      sort : {
        key : 'REMARK CODE',
        order : 'asc'
      },
      searchTerm : ''
    }
  },

  watch: {

    'filters.date'() {
      this.changeQuery()
    },

    $route() {
      this.paginate()
    }

  },

  computed: {

    filteredRemarkCodes() {

      if(this.filters.date != '' && this.filters.date != null) {
        let date = this.$moment(this.filters.date).format('YYYY-MM-DD');
        return this.remarkCodes.filter(code => {
          let codeDate = this.$moment(code['DATE']).format('YYYY-MM-DD')
          return codeDate === date
        })
      }

      return this.remarkCodes

    },

    paginatedItems() {
      if(this.filteredRemarkCodes.length) {
        return this.filteredRemarkCodes.slice(this.from, this.to)
      }
      return []
    },


    totalPages() {
      return Math.round(this.remarkCodes.length / this.perPage)
    },

  },

  methods: {

    sortBy(column) {
      this.sort.key = column
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },

    fetchRemarkCodes() {
      this.fetching = true
      this.$axios.post(`/get_remark`, {
        "provider_id": this.user.practise_id
      })
      .then(({data}) => {
        this.remarkCodes = data
        this.fetching = false
      })
      .catch((e) => {
        this.$toast.show("Could not find any claims at the moment").goAway(5000)
        this.fetching = false
      })

    },

    checkRoute() {
      if(this.$route.query) {
        this.filters.date = this.$route.query.date ? this.$route.query.date : null
        this.page = this.$route.query.page ? this.$route.query.page : 1
      }
    },

    paginate() {
      this.from = Number(this.page - 1) * Number(this.perPage)
      this.to   = Number(this.from) + this.perPage
    },

    checkPage() {
      if(this.page > 1) {
        this.paginate()
      }
    },

    changePage(page) {
      this.page = page
      this.changeQuery()
    },

    changeQuery() {
      let queryString = this.getQueryString()
      this.$router.push({
        query:{
          ...queryString
        }
      })
    },

    getQueryString() {
      let data = {}
      if(this.filters.date != null && this.filters.date != '') {
        data['date'] = this.filters.date
      }
      data['page'] = this.page
      return data
    }

  },

  created() {
    this.fetchRemarkCodes()
    this.checkRoute()
    this.checkPage()
  }

}

</script>

<style lang="scss">
  .sortable  {
    cursor:pointer;
  }
  .arrow {
    display:inline-block;
    vertical-align: middle;
    width:0;
    height:0;
    margin-left:5px;
    opacity:0.6;

    &--asc {
      border-left:4px solid transparent;
      border-right:4px solid transparent;
      border-bottom:4px solid #222;
    }

    &--desc {
      border-left:4px solid transparent;
      border-right:4px solid transparent;
      border-top:4px solid #222;
    }

  }
</style>
