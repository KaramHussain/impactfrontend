<template>
  <main>
    <impactHeader />
    <impactSidebar />
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="content-wrapper">
        <div class="content-body">
          <h1 class="mb-2">Upload EDI files and generate claims</h1>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h1 class="card-title display-1">Upload File</h1>
                </div>
                <div class="card-content">
                  <div class="card-body">
                    <form class="form" @submit.prevent="submit">
                      <div class="form-body">
                        <div class="form-group">
                          <label class="d-block">Claim Type</label>
                          <!-- <fieldset class="radio d-inline-block mr-2">
                            <label>
                              <input
                                type="radio"
                                name="claim_type"
                                value="835"
                                v-model="type"
                              />
                              835
                            </label>
                          </fieldset> -->
                          <fieldset class="radio d-inline-block">
                            <label>
                              <input
                                type="radio"
                                name="claim_type"
                                value="837"
                                v-model="type"
                              />
                              837
                            </label>
                          </fieldset>
                        </div>
                        <div class="row">
                          <div class="form-group col-12 mb-2">
                            <label for="name">Upload EDI File (ZIP)</label>
                            <div class="position-relative">
                              <input
                                @change="onChange"
                                accept="application/x-zip-compressed"
                                type="file"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-actions text-right">
                        <button
                          :disabled="loading"
                          type="submit"
                          class="btn btn-info"
                        >
                          <i class="ft-upload"></i>
                          Upload
                          <i
                            class="fas fa-circle-notch fa-spin"
                            v-if="loading"
                          ></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";

export default {
  middleware: "auth",
  head() {
    return {
      title: "Upload EDI File"
    };
  },
  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },
  data() {
    return {
      type: "835",
      files: null,
      loading: false
    };
  },
  methods: {
    onChange(e) {
      this.files = null;
      if (!e.target.files) return false;
      let files = e.target.files[0];
      this.files = files;
    },
    submit() {
      let data = new FormData();
      let email = this.user.email;
      if (!this.type) {
        this.$toast.show("Please select claim type").goAway(2000);
        return false;
      }
      if (!this.files) {
        this.$toast.show("Please choose a file first").goAway(2000);
        return false;
      }
      this.loading = true;
      data.append("file", this.files);
      data.append("date_upload", this.$moment().format("YYYY-MM-DD"));
      data.append("time_upload", this.$moment().format("HH:ss"));
      data.append("provider_id", this.user.practise_id);
      data.append("email", email);
      data.append("claim_type", this.type);
      this.$axios
        // .post(`/eob_load`, data)
        .post(`${this.ediUrl}/eob_load`, data)
        .then(({ data }) => {
          this.loading = false;
          this.files = null;
          if (data == "The file type is not supported.") {
            this.$toast.show(data).goAway(5000);
            return false;
          }
          this.$toast.show("Files uploaded").goAway(5000);
        })
        .catch(e => {
          this.loading = false;
          this.$toast
            .show(
              e.message ||
                "Something went wrong in uploading. please try again later"
            )
            .goAway(5000);
        });
    },

    validateData() {
      return !this.files || !this.type;
    }
  }
};
</script>
