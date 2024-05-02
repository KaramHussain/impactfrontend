<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">
          <button class="btn btn-primary mb-2" @click.prevent="$router.push({path:'/file-tracker'})">
            All files
            <i class="la la-folder-open"></i>
          </button>

          <div class="content-header row">

              <div class="content-header-left col-md-6 col-12">
                <h3 class="content-header-title mb-0 d-inline-block">
                  File details
                </h3>

              </div>

              <div class="content-header-right col-md-6 col-12">

                <div v-if="user.created_by" class="text-right">
                  Assigned by
                  <strong>{{user.created_by.name}}</strong>
                  <div class="badge badge-primary">
                    {{user.created_by_role}}
                  </div>
                </div>

                <div class="form-group float-right w-50">
                  <input v-model="searchTerm" class="form-control form-control-sm" placeholder="Search..." />
                </div>

              </div>

              <div class="clearfix"></div>

          </div>

          <div class="content-body">

            <div class="row">
                <div class="col-12">
                    <div class="card">

                      <!-- Content -->
                      <div class="card-content">

                        <div class="card-body">

                          <div class="table-responsive mb-2">
                            <table class="table table-striped table-bordered">

                              <tr>
                                <th>#SN</th>
                                <th>Filename</th>
                                <th>
                                  <span>
                                    <span class="sortable" @click.prevent="sortBy('Status')">Status</span>
                                    <div class="arrow"
                                      :class="{'arrow--asc':sort.order == 'asc',
                                      'arrow--desc':sort.order == 'desc'}"
                                      v-if="sort.key == 'Status'">
                                    </div>
                                  </span>
                                </th>
                                <th>Claims processed</th>
                              </tr>

                              <tbody v-if="files.length">
                                <tr v-for="(file, index) in filteredItems(files, searchTerm, sort)" :key="index">
                                  <td>{{index + 1}}</td>
                                  <td>{{file['file']}}</td>
                                  <td class="text-align-center">
                                    <span data-toggle="tooltip" data-placement="top" title="File already exists." v-if="file['Status'].toLowerCase() == 'file already exists.'">
                                      <i class="la la-exclamation-triangle text-warning"></i>
                                    </span>
                                    <span data-toggle="tooltip" data-placement="top" title="Successfully entered" v-if="file['Status'].toLowerCase() == 'sucessfully entered'">
                                      <i class="la la-check text-success"></i>
                                    </span>
                                    <span data-toggle="tooltip" data-placement="top" title="Successfully entered" v-if="file['Status'].toLowerCase() == 'error in processing file'">
                                      <i class="la la-times text-danger"></i>
                                    </span>

                                  </td>
                                  <td class="text-align-center">{{file['Claims Processed']}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                        </div>

                      </div>

                    </div>
                </div>
            </div>

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

  middleware:['auth'],

  head() {
    return {
      title:'File details'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  data() {
    return {
      files: {},
      sort : {
        key : 'Status',
        order : 'asc'
      },
      searchTerm : ''
    }
  },

  methods: {

    sortBy(column) {
      this.sort.key = column
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },

    formattedName(name) {
      if(name) {
        name = name.toString()
        return name.charAt(0) + name.slice(1).toLowerCase().trim()
      }
      return ''
    },

    fetchFile() {
      if(!this.$route.params.id) {
        return this.$router.push({path:'/file-tracker'})
      }
      this.$axios.post(`/get_file_details`, {
      // this.$axios.post(`${this.ediUrl}/get_file_details`, {
        _id : this.$route.params.id
      })
      .then(({data}) => {
        if(data) {
          this.files = data.Files
        }
      })
      .catch((error) => {
        return this.$router.push({path:'/file-tracker'})
      })
    },



  },

  created() {
    this.fetchFile()
  }

}

</script>


