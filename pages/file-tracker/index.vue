<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">
          <div class="content-header">
            <h4>Files Tracker</h4>

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
                                                                    <span class="sortable" @click="sortBy('filename')">
                                                                      Filename
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'filename'">
                                                                      </div>
                                                                    </span>
                                                                  </th>

                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('date_upload')">
                                                                      Date upload
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'date_upload'">
                                                                      </div>
                                                                    </span>
                                                                  </th>
                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('time_upload')">
                                                                      Time upload
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'time_upload'">
                                                                      </div>
                                                                    </span>
                                                                  </th>

                                                                  <th>
                                                                    <span class="sortable" @click="sortBy('no_of_files')">
                                                                      No of files
                                                                      <div class="arrow"
                                                                      :class="{'arrow--asc':sort.order == 'asc',
                                                                       'arrow--desc':sort.order == 'desc'}"
                                                                       v-if="sort.key == 'no_of_files'">
                                                                      </div>
                                                                    </span>
                                                                  </th>

                                                                  <th>
                                                                    <span>
                                                                      Status
                                                                    </span>
                                                                  </th>

                                                                  <th>Action</th>
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

                                                              <template v-if="filteredItems(paginatedItems, searchTerm, sort).length">
                                                                <tr v-for="(file, index) in filteredItems(paginatedItems, searchTerm, sort)" :key="index">

                                                                  <td><span>{{file['filename']}}</span></td>

                                                                  <td>
                                                                    <span>{{$moment(file['date_upload']).format('ll')}}</span>
                                                                  </td>

                                                                  <td><span>{{file['time_upload']}}</span></td>

                                                                  <td><span>{{file['no_of_files']}}</span></td>

                                                                  <td><span>{{file['Status']}}</span></td>

                                                                  <td>
                                                                    <span v-if="file['Status'].toLowerCase() != 'uploaded'">
                                                                      <nuxt-link :to="{path:`/file-tracker/${file['_id']}`}">view</nuxt-link>
                                                                    </span>
                                                                  </td>

                                                                </tr>
                                                              </template>

                                                              <template v-else>
                                                                <p>No Files Found</p>
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
      title:'File Tracker'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  data() {
    return {
      files : [],
      fetching    : false,
      filters : {
        date  : null
      },
      page    : 1,
      perPage : 12,
      from    : 0,
      to      : 12,
      sort : {
        key : 'Status',
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

    filteredFiles() {

      if(this.filters.date != '' && this.filters.date != null) {
        let date = this.$moment(this.filters.date).format('YYYY-MM-DD');
        return this.files.filter(code => {
          let fileDate = this.$moment(code['date_upload']).format('YYYY-MM-DD')
          return fileDate === date
        })
      }

      return this.files

    },

    paginatedItems() {
      if(this.filteredFiles.length) {
        return this.filteredFiles.slice(this.from, this.to)
      }
      return []
    },

    totalPages() {
      return Math.round(this.files.length / this.perPage)
    },

  },

  methods: {

    sortBy(column) {
      this.sort.key = column
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },

    fetchFiles() {
      this.fetching = true
      this.$axios.post(`${this.ediUrl}/get_upload_details`, {
        "provider_id": this.user.practise_id
      })
      .then(({data}) => {
        this.files = data
        this.fetching = false
      })
      .catch((e) => {
        this.$toast.show("No Files found").goAway(5000)
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
    this.fetchFiles()
    this.checkRoute()
    this.checkPage()
  }

}

</script>

