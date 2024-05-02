<template>
    <!-- Member permissions -->
    <div class="modal fade text-left" id="memberDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">

              <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel1">Member</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>

              <div class="modal-body py-2" v-if="member">

                <template v-if="loading">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </template>

                <template v-else>

                  <div class="table-responsive">
                    <table class="table table-bordered">

                      <tr>
                        <td>Role</td>
                        <td>Active</td>
                        <td>Insurance companies</td>
                        <td>Remark codes</td>
                      </tr>

                      <tbody>
                        <tr>
                          <td>
                            <select class="form-control form-control-sm">
                              <option value="0">Please choose</option>
                              <option value="manager">Manager</option>
                              <option value="collector">Collector</option>
                            </select>
                          </td>
                          <td>
                            <button class="btn btn-primary btn-sm">Deactivate</button>
                          </td>
                          <td>

                            <select class="form-control form-control-sm" multiple>

                              <option value="0">Please choose</option>

                              <template v-if="payers.length">
                                <option :value="payer.id" v-for="payer in payers" :key="payer.id">
                                  {{payer.name}}
                                </option>
                              </template>

                            </select>
                          </td>

                          <td>
                            <select class="form-control" multiple>
                              <option value="0">Please select</option>
                              <option value="avoidable">Avoidable denials</option>
                              <option value="low_fruit">Low Fruits</option>
                              <option value="compliance">Compliance</option>
                            </select>
                          </td>

                        </tr>

                      </tbody>

                    </table>
                  </div>

                </template>

              </div>

              <div class="modal-footer">
                  <button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal">
                    Close
                  </button>
              </div>

          </div>
      </div>
    </div>

</template>

<script>
export default {

  props: {
    id: {
      type : Number,
      required : true
    },
    type: {
      type : String,
      default : 'view'
    }
  },

  data() {
    return {
      member  : {},
      loading : false,
      payers  : []
    }
  },

  watch: {
    id(val) {
      this.fetchMember()
    }
  },

  methods: {

    async fetchMember() {

      this.loading = true
      await this.$axios.post(`provider/${this.id}`)
      .then(({data}) => {
        this.member = data.data
        this.loading = false
      })
      .catch((e) => {
        this.loading = false
      });

    },

    async fetchPayers() {

      await this.$axios.get('payer-list')
      .then(res => this.payers = res.data)

    }

  },

  created() {
    this.fetchMember();
    this.fetchPayers();
  }

}
</script>

