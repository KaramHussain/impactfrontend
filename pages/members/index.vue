<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">
          <div class="content-header row">
              <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                  
                  <h3 class="content-header-title mb-0 d-inline-block">Members</h3>

                  <div class="row breadcrumbs-top d-inline-block">
                      <div class="breadcrumb-wrapper col-12">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item">
                                <span v-if="user.roles.name == 'collector'">
                                  <nuxt-link :to="{path:'/dashboard'}">Home</nuxt-link>
                                </span>
                                <span v-else>
                                  <nuxt-link :to="{path:'/'}">Home</nuxt-link>
                                </span>
                              </li>
                              <li class="breadcrumb-item active">
                                Members
                              </li>
                          </ol>
                      </div>
                  </div>

              </div>

              <div class="content-header-right col-md-6 col-12">
                <div class="btn-group float-md-right">
                    <button @click.prevent="$router.push({path:'/members/new'})" class="btn btn-info mb-1" type="button" aria-haspopup="true" aria-expanded="false">
                      Add new
                    </button>
                </div>
                <div class="clearfix"></div>
                <div class="form-group">
                  <label for="date" class="form-label">Search</label>
                  <input type="search" class="form-control form-control-sm" v-model="searchTerm" placeholder="Search columns">
                </div>

              </div>

          </div>

          <div class="content-body">

            <section id="dom">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Members list</h4>
                            </div>
                            <div class="card-content collapse show">
                                <div class="card-body card-dashboard dataTables_wrapper dt-bootstrap">

                                  <div class="table-responsive">
                                      <table class="table table-striped table-bordered dom-jQuery-events">
                                          <thead>
                                              <tr>
                                                <th>
                                                  <span class="sortable" @click="sortBy('name')">
                                                    Name

                                                    <div class="arrow"
                                                    :class="{'arrow--asc':sort.order == 'asc',
                                                      'arrow--desc':sort.order == 'desc'}"
                                                      v-if="sort.key == 'name'">
                                                    </div>
                                                  </span>

                                                </th>
                                                <th>

                                                  <span class="sortable" @click="sortBy('roles.name')">
                                                    Role

                                                    <div class="arrow"
                                                    :class="{'arrow--asc':sort.order == 'asc',
                                                      'arrow--desc':sort.order == 'desc'}"
                                                      v-if="sort.key == 'roles.name'">
                                                    </div>
                                                  </span>

                                                </th>
                                                <th>

                                                  <span class="sortable" @click="sortBy('created_by.name')">
                                                    Invited by

                                                    <div class="arrow"
                                                    :class="{'arrow--asc':sort.order == 'asc',
                                                      'arrow--desc':sort.order == 'desc'}"
                                                      v-if="sort.key == 'created_by.name'">
                                                    </div>
                                                  </span>

                                                </th>
                                                <th>
                                                   <span class="sortable" @click="sortBy('created_at.date')">
                                                    Joined at

                                                    <div class="arrow"
                                                    :class="{'arrow--asc':sort.order == 'asc',
                                                      'arrow--desc':sort.order == 'desc'}"
                                                      v-if="sort.key == 'created_at.date'">
                                                    </div>
                                                  </span>

                                                </th>
                                                <th>

                                                  <span class="sortable" @click="sortBy('assigned_claims')">
                                                    Assigned claims 

                                                    <div class="arrow"
                                                    :class="{'arrow--asc':sort.order == 'asc',
                                                      'arrow--desc':sort.order == 'desc'}"
                                                      v-if="sort.key == 'assigned_claims'">
                                                    </div>
                                                  </span>

                                                </th>
                                                <th>

                                                  <span class="sortable" @click="sortBy('submitted_claims')">
                                                    Submitted claims

                                                    <div class="arrow"
                                                    :class="{'arrow--asc':sort.order == 'asc',
                                                      'arrow--desc':sort.order == 'desc'}"
                                                      v-if="sort.key == 'submitted_claims'">
                                                    </div>
                                                  </span>

                                                </th>
                                                <th>Actions</th>
                                              </tr>
                                          </thead>

                                          <tbody v-if="filteredItems.length">

                                            <tr v-for="member in filteredItems" :key="member.id">

                                                <td>{{member.name}}</td>
                                                <td>
                                                  <span v-if="member.roles">
                                                    {{member.roles.name}}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span v-if="member.created_by">{{member.created_by.name}}</span>
                                                </td>
                                                <td>
                                                  <span v-if="member.created_at">
                                                    {{AppDate(member.created_at.date)}}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span v-if="member.assigned_claims">
                                                    {{member.assigned_claims}}
                                                  </span>
                                                </td>

                                                <td>
                                                  <span v-if="member.submitted_claims">
                                                    {{member.submitted_claims}}
                                                  </span>
                                                </td>

                                                <td>

                                                  <can I="edit" :a="member.roles.name">
                                                    <nuxt-link :to="{path:`/members/${member.id}/edit`}" type="button" class="btn btn-success btn-sm">Edit</nuxt-link>
                                                  </can>
                                                  <can I="view" :a="member.roles.name">
                                                    <nuxt-link :to="{path:`/members/${member.id}`}" type="button" class="btn btn-primary btn-sm">View</nuxt-link>
                                                  </can>
                                                  <can I="delete" :a="member.roles.name">
                                                    <button @click.prevent="deleteMember(member)" type="button" class="btn btn-danger btn-sm ">
                                                      Delete
                                                    </button>
                                                  </can>

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

                <template v-if="members.length && meta.total > meta.per_page">
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

    <impactFooter />

  </main>

</template>

<script>

import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'

export default {

  middleware:['auth', 'admin'],

  head() {
    return {
      title:'Members list'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  data() {
    return {
      members:[],
      sort : {
        key : 'name',
        order : 'asc'
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
    },

    filteredItems() {

      let data = this.members

      data = data.filter((row) => {

        return Object.keys(row).some((key) => {
          let value = row[key]
          return  String(value).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        })

      })

      if(this.sort.key) {

        data = this.lodash.orderBy(data, (i) => {

          let value = i[this.sort.key]

          if(this.sort.key.indexOf('.') > -1) {
            let nested_key = this.sort.key.split('.')
            value = i[nested_key[0]][nested_key[nested_key.length-1]]
            if(this.sort.key == 'created_at.date') {
              value = i[nested_key[0]][nested_key[nested_key.length-1]]
              value = this.$moment(value).format('ll')
            }
          }


          if(!isNaN(parseFloat(value))) {
            return parseFloat(value) // if number
          }

          return String(value).toLowerCase()

        }, this.sort.order)

      }

      return  data

    }

  },

  watch: {
    $route() {
      this.routePage()
      this.getMembers(this.page, this.validateFilters())
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

    async getMembers(page, filters = {}) {
      this.loading = true
      page = page == null || page == '' ? this.page : page
      await this.$axios.get(`provider/all?page=${page}`)
      .then(({data}) => {
        this.members = data.data
        this.meta = data.meta
        this.loading = false
      })
      .catch(e => {
        this.loading = false
      });
    },

    deleteMember(member) {

      if(!this.$can('delete', member.roles.name)) return false

      if(!confirm("Are you sure! member will be deleted")) return false

      this.$axios.post(`provider/delete-member/${member.id}`)
      .then((res) => {
        this.$toast.show("Member deleted").goAway(5000)
        this.deleteMemberFromList(member)
      })
      .catch((err) => {
        this.$toast.show("Action not allowed").goAway(5000)
      })

    },

    deleteMemberFromList(deletedMember) {
      this.members = this.members.filter(member => {
        return member.id != deletedMember.id
      })
    }

  },

  created() {
    this.getMembers();
    this.routePage();
  }

}

</script>

