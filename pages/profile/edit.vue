<template>
  <main>
    <impactHeader />
    <impactSidebar />
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="content-wrapper">
        <div class="content-header row">
          <div class="col-12 mb-2">
            <h4>{{ user.name }}'s profile</h4>
            <div class="badge badge-primary">{{ user.roles.name }}</div>
          </div>
        </div>
        <div class="content-body">
          <!-- users edit start -->
          <section class="users-edit">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <ul class="nav nav-tabs mb-2" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link d-flex align-items-center active"
                        id="account-tab"
                        data-toggle="tab"
                        href="#account"
                        aria-controls="account"
                        role="tab"
                        aria-selected="true"
                      >
                        <i class="ft-user mr-25"></i
                        ><span class="d-none d-sm-block">Account</span>
                      </a>
                    </li>
                    <can I="edit" a="company">
                      <li class="nav-item">
                        <a
                          class="nav-link d-flex align-items-center"
                          id="information-tab"
                          data-toggle="tab"
                          href="#information"
                          aria-controls="information"
                          role="tab"
                          aria-selected="false"
                        >
                          <i class="ft-info mr-25"></i
                          ><span class="d-none d-sm-block"
                            >Company information</span
                          >
                        </a>
                      </li>
                    </can>
                    <li class="nav-item">
                      <a
                        class="nav-link d-flex align-items-center"
                        id="security-tab"
                        data-toggle="tab"
                        href="#security"
                        aria-controls="security"
                        role="tab"
                        aria-selected="false"
                      >
                        <i class="ft-info mr-25"></i
                        ><span class="d-none d-sm-block">Security</span>
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div
                      class="tab-pane active"
                      id="account"
                      aria-labelledby="account-tab"
                      role="tabpanel"
                    >
                      <!-- users edit media object start -->
                      <div class="media mb-2">
                        <a class="mr-2" href="#">
                          <img
                            :src="providerImage"
                            alt="users avatar"
                            class="users-avatar-shadow rounded-circle"
                            height="64"
                            width="64"
                          />
                        </a>
                        <div class="media-body">
                          <h4 class="media-heading">Avatar</h4>
                          <div class="col-12 px-0 d-flex">
                            <a
                              id="changePhoto"
                              href="#"
                              @click.prevent="changePhoto"
                              class="btn btn-sm btn-primary mr-25"
                              >Change</a
                            >
                          </div>
                        </div>
                      </div>
                      <!-- users edit media object ends -->

                      <!-- users edit account form start -->
                      <form
                        novalidate
                        @keydown="removeError($event.target.name)"
                      >
                        <div class="row">
                          <div class="col-12 col-sm-6">
                            <div class="form-group">
                              <div class="controls">
                                <label :class="{ 'text-danger': errors.name }"
                                  >Name</label
                                >
                                <input
                                  v-model="name"
                                  type="text"
                                  class="form-control"
                                  :class="{ 'has-error': errors.name }"
                                  name="name"
                                  placeholder="Name"
                                />
                              </div>
                              <div class="error-message" v-if="errors.name">
                                {{ errors.name[0] }}
                              </div>
                            </div>
                          </div>

                          <div class="col-12 col-sm-6">
                            <div class="form-group">
                              <div class="controls">
                                <label :class="{ 'text-danger': errors.name }"
                                  >Email</label
                                >
                                <input
                                  :class="{ 'has-error': errors.email }"
                                  v-model="email"
                                  type="email"
                                  class="form-control"
                                  name="email"
                                  placeholder="Email"
                                />
                              </div>
                              <div class="error-message" v-if="errors.email">
                                {{ errors.email[0] }}
                              </div>
                            </div>
                            <div class="form-group" v-if="user.is_doctor">
                              <div class="controls position-relative">
                                <label :class="{ 'text-danger': errors.npi }"
                                  >NPI</label
                                >
                                <input
                                  :class="{ 'has-error': errors.npi }"
                                  v-model="npi"
                                  type="text"
                                  class="form-control"
                                  placeholder="NPI"
                                  name="npi"
                                />
                              </div>
                              <div class="error-message" v-if="errors.npi">
                                {{ errors.npi[0] }}
                              </div>
                            </div>
                          </div>
                          <div
                            class="
                              col-12
                              d-flex
                              flex-sm-row flex-column
                              justify-content-end
                              mt-1
                            "
                          >
                            <button
                              @click.prevent="changeAccountInformation"
                              :disabled="account_loading"
                              type="submit"
                              class="
                                btn btn-primary
                                glow
                                mb-1 mb-sm-0
                                mr-0 mr-sm-1
                              "
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </form>
                      <!-- users edit account form ends -->
                    </div>

                    <!-- Company Information -->
                    <can I="edit" a="company">
                      <div
                        class="tab-pane"
                        id="information"
                        aria-labelledby="information-tab"
                        role="tabpanel"
                      >
                        <!-- users edit Info form start -->
                        <form
                          novalidate
                          @keydown="removeError($event.target.name)"
                          @change="removeError($event.target.name)"
                        >
                          <div class="row">
                            <div class="col-12 mt-1 mt-sm-0">
                              <div class="form-group">
                                <label :class="{ 'text-danger': errors.name }"
                                  >Company*</label
                                >

                                <input
                                  :class="{ 'has-error': errors.name }"
                                  v-model="company"
                                  type="text"
                                  class="form-control"
                                  placeholder="Company name"
                                  name="name"
                                />

                                <div class="error-message" v-if="errors.name">
                                  {{ errors.name[0] }}
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-6">
                                  <div class="form-group">
                                    <div class="controls">
                                      <label
                                        :class="{ 'text-danger': errors.phone }"
                                        >Phone*</label
                                      >

                                      <input
                                        :class="{ 'has-error': errors.phone }"
                                        v-model="phone"
                                        type="text"
                                        name="phone"
                                        class="form-control"
                                        placeholder="Phone number"
                                      />

                                      <div
                                        class="error-message"
                                        v-if="errors.phone"
                                      >
                                        {{ errors.phone[0] }}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-6">
                                  <div class="form-group">
                                    <div class="controls">
                                      <label
                                        :class="{
                                          'text-danger': errors.address,
                                        }"
                                        >Address*</label
                                      >

                                      <input
                                        :class="{ 'has-error': errors.address }"
                                        v-model="address"
                                        name="address"
                                        type="text"
                                        class="form-control"
                                        placeholder="Address"
                                      />

                                      <div
                                        class="error-message"
                                        v-if="errors.address"
                                      >
                                        {{ errors.address[0] }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="form-group col-md-6 mb-2">
                                  <label
                                    for="state"
                                    :class="{ 'text-danger': errors.state }"
                                    >State*</label
                                  >
                                  <div class="position-relative">
                                    <input
                                      :class="{ 'has-error': errors.state }"
                                      v-model="state"
                                      name="state"
                                      type="text"
                                      class="form-control"
                                      placeholder="State"
                                    />
                                  </div>
                                  <span
                                    class="error-message"
                                    v-if="errors.state"
                                  >
                                    {{ errors.state[0] }}
                                  </span>
                                </div>
                                <div class="form-group col-md-6 mb-2">
                                  <label
                                    for="city"
                                    :class="{ 'text-danger': errors.city }"
                                  >
                                    City*
                                  </label>
                                  <div class="position-relative">
                                    <input
                                      :class="{ 'has-error': errors.city }"
                                      v-model="city"
                                      name="city"
                                      type="text"
                                      class="form-control"
                                      placeholder="City"
                                    />
                                  </div>
                                  <span
                                    class="error-message"
                                    v-if="errors.city"
                                  >
                                    {{ errors.city[0] }}
                                  </span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="form-group col-md-6 mb-2">
                                  <label
                                    for="city"
                                    :class="{ 'text-danger': errors.county }"
                                  >
                                    County
                                  </label>
                                  <div class="position-relative">
                                    <input
                                      :class="{ 'has-error': errors.county }"
                                      v-model="county"
                                      name="county"
                                      type="text"
                                      class="form-control"
                                      placeholder="County"
                                    />
                                  </div>
                                  <span
                                    class="error-message"
                                    v-if="errors.county"
                                  >
                                    {{ errors.county[0] }}
                                  </span>
                                </div>
                                <div class="form-group col-md-6 mb-2">
                                  <label
                                    for="zipcode"
                                    :class="{ 'text-danger': errors.zipcode }"
                                  >
                                    Zip Code*
                                  </label>
                                  <div class="position-relative">
                                    <!-- <input
                                      :class="{ 'has-error': errors.zipcode }"
                                      v-model="zipcode"
                                      name="zipcode"
                                      type="text"
                                      class="form-control"
                                      placeholder="Zip Code"
                                    /> -->
                                    <zipcodeautocomplete
                                      :class="{ 'has-error': errors.zipcode }"
                                      v-model="zipcode"
                                      id="zipcode"
                                      classes="form-control"
                                      name="zipcode"
                                      placeholder="00000"
                                      @placeChanged="placeChanged"
                                      autocomplete="off"
                                    />
                                  </div>
                                  <span
                                    class="error-message"
                                    v-if="errors.zipcode"
                                  >
                                    {{ errors.zipcode[0] }}
                                  </span>
                                </div>
                              </div>
                              <!-- <div class="form-group">
                                <div class="controls">
                                  <label
                                    :class="{ 'text-danger': errors.zipcode }"
                                    >Zipcode</label
                                  >
                                  <input
                                    maxlength="5"
                                    minlength="5"
                                    v-model="zipcode"
                                    type="text"
                                    class="form-control"
                                    name="zipcode"
                                    placeholder="Address"
                                    :class="{ 'has-error': errors.zipcode }"
                                  />

                                  <div
                                    class="error-message"
                                    v-if="errors.zipcode"
                                  >
                                    {{ errors.zipcode[0] }}
                                  </div>
                                </div>
                              </div> -->
                            </div>

                            <div
                              class="
                                col-12
                                d-flex
                                flex-sm-row flex-column
                                justify-content-end
                                mt-1
                              "
                            >
                              <button
                                @click.prevent="changeCompanyInformation"
                                :disabled="company_loading"
                                type="button"
                                class="
                                  btn btn-primary
                                  glow
                                  mb-1 mb-sm-0
                                  mr-0 mr-sm-1
                                "
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </form>
                        <!-- users edit Info form ends -->
                      </div>
                    </can>

                    <!-- Security -->
                    <div
                      class="tab-pane"
                      id="security"
                      aria-labelledby="security-tab"
                      role="tabpanel"
                    >
                      <!-- security -->
                      <form
                        novalidate
                        @keydown="removeError($event.target.name)"
                      >
                        <div class="row">
                          <div class="col-12 mt-1 mt-sm-0">
                            <div class="form-group">
                              <div class="controls position-relative">
                                <label
                                  :class="{ 'text-danger': errors.password }"
                                  >Current password</label
                                >

                                <input
                                  :class="{ 'has-error': errors.password }"
                                  type="password"
                                  class="form-control"
                                  name="password"
                                  placeholder="Enter current password"
                                  v-model="password"
                                />

                                <div
                                  class="error-message"
                                  v-if="errors.password"
                                >
                                  {{ errors.password[0] }}
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                              <div class="controls">
                                <label
                                  :class="{
                                    'text-danger': errors.new_password,
                                  }"
                                >
                                  New password
                                </label>

                                <input
                                  :class="{ 'has-error': errors.new_password }"
                                  type="password"
                                  class="form-control"
                                  name="new_password"
                                  placeholder="Enter new password"
                                  v-model="new_password"
                                />

                                <div
                                  class="error-message"
                                  v-if="errors.new_password"
                                >
                                  {{ errors.new_password[0] }}
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="controls">
                                <label
                                  :class="{
                                    'text-danger': errors.confirm_new_password,
                                  }"
                                  >New password again</label
                                >

                                <input
                                  :class="{
                                    'has-error': errors.confirm_new_password,
                                  }"
                                  type="password"
                                  name="confirm_new_password"
                                  class="form-control"
                                  placeholder="Confirm new password"
                                  v-model="confirm_new_password"
                                />

                                <div
                                  class="error-message"
                                  v-if="errors.confirm_new_password"
                                >
                                  {{ errors.confirm_new_password[0] }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="
                              col-12
                              d-flex
                              flex-sm-row flex-column
                              justify-content-end
                              mt-1
                            "
                          >
                            <button
                              :disabled="password_loading"
                              type="button"
                              class="
                                btn btn-primary
                                glow
                                mb-1 mb-sm-0
                                mr-0 mr-sm-1
                              "
                              @click.prevent="changePassword"
                            >
                              Save changes <i class="fa fa-user"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                      <!-- users edit Info form ends -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- users edit ends -->
        </div>
      </div>
    </div>

    <photo @onImageUploaded="onImageUploaded" />

    <impactFooter />
  </main>
</template>

<script>
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";
import photo from "@/components/photo";
import { mapGetters, mapActions } from "vuex";
import zipcodeautocomplete from "@/components/zipcodeautocomplete";

export default {
  middleware: "auth",

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    photo,
    zipcodeautocomplete,
  },

  head() {
    return {
      title: "Edit profile",
    };
  },

  data() {
    return {
      password_loading: false,
      company_loading: false,
      account_loading: false,
    };
  },

  computed: {
    ...mapGetters({
      profile: "profile/profile",
      cities: "cities",
      states: "states",
      providerImage: "profile/providerImage",
    }),

    name: {
      set(key) {
        this.editInfo({ param: "name", value: key, section: "profile" });
      },
      get() {
        return this.profile.name;
      },
    },

    password: {
      set(key) {
        this.editInfo({ param: "password", value: key, section: "profile" });
      },
      get() {
        return this.profile.password;
      },
    },

    new_password: {
      set(key) {
        this.editInfo({
          param: "new_password",
          value: key,
          section: "profile",
        });
      },
      get() {
        return this.profile.new_password;
      },
    },

    confirm_new_password: {
      set(key) {
        this.editInfo({
          param: "confirm_new_password",
          value: key,
          section: "profile",
        });
      },
      get() {
        return this.profile.confirm_new_password;
      },
    },

    email: {
      set(key) {
        this.editInfo({ param: "email", value: key, section: "profile" });
      },
      get() {
        return this.profile.email;
      },
    },

    company: {
      set(key) {
        this.editInfo({ param: "company", value: key, section: "profile" });
      },
      get() {
        return this.profile.company;
      },
    },

    address: {
      set(key) {
        this.editInfo({ param: "address", value: key, section: "profile" });
      },
      get() {
        if (
          this.profile &&
          this.profile.address &&
          typeof this.profile.address === "string"
        ) {
          return this.profile.address.toUpperCase();
        } else {
          return "";
        }
      },
    },

    phone: {
      set(key) {
        this.editInfo({ param: "phone", value: key, section: "profile" });
      },
      get() {
        return this.profile.phone;
      },
    },

    npi: {
      set(key) {
        this.editInfo({ param: "npi", value: key, section: "profile" });
      },
      get() {
        return this.profile.npi;
      },
    },

    state: {
      set(key) {
        this.editInfo({ param: "state", value: key, section: "profile" });
      },
      get() {
        return this.profile.state;
      },
    },

    city: {
      set(key) {
        this.editInfo({ param: "city", value: key, section: "profile" });
      },
      get() {
        return this.profile.city;
      },
    },
    county: {
      set(key) {
        this.editInfo({ param: "county", value: key, section: "profile" });
      },
      get() {
        return this.profile.county;
      },
    },
    zipcode: {
      set(key) {
        this.editInfo({ param: "zipcode", value: key, section: "profile" });
      },
      get() {
        return this.profile.zipcode;
      },
    },
  },

  methods: {
    ...mapActions({
      autoFillAuthInfo: "autoFillAuthInfo",
      editInfo: "profile/editInfo",
      getCities: "getCities",
      getStates: "getStates",
      changeMemberPassword: "profile/changeMemberPassword",
      changeMemberAccount: "profile/changeMemberAccount",
      changeMemberCompany: "profile/changeMemberCompany",
      removeError: "validation/removeError",
      setErrors: "validation/setErrors",
    }),

    onImageUploaded() {
      $("#photo").modal("hide");
    },

    changeCity(id) {
      this.editInfo({ param: "city", value: 0, section: "profile" });
      this.getCities(id);
    },

    changePassword() {
      this.password_loading = true;
      this.changeMemberPassword()
        .then((res) => {
          this.$toast.show("Password updated").goAway(5000);
          this.resetPasswords();
          this.password_loading = false;
        })
        .catch((e) => {
          this.password_loading = false;
          this.$toast.show("Something went wrong").goAway(5000);
        });
    },

    resetPasswords() {
      this.editInfo({ param: "password", value: null, section: "profile" });
      this.editInfo({ param: "new_password", value: null, section: "profile" });
      this.editInfo({
        param: "confirm_new_password",
        value: null,
        section: "profile",
      });
    },

    changeAccountInformation() {
      if (!this.validateAccountInfo()) {
        return false;
      }

      this.account_loading = true;
      this.changeMemberAccount()
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.$toast.show("Changes saved").goAway(5000);
          } else {
            this.$toast
              .show(
                "Something went wrong, please see validation errors, if any"
              )
              .goAway(5000);
          }
        })
        .catch((e) => {
          this.$toast.show("Something went wrong").goAway(5000);
        })
        .finally(() => {
          this.account_loading = false;
        });
    },

    changeCompanyInformation() {
      this.company_loading = true;
      this.changeMemberCompany()
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.$toast.show("Changes saved").goAway(5000);
          } else {
            this.$toast
              .show(
                "Something went wrong, please see validation errors, if any"
              )
              .goAway(5000);
          }
        })
        .catch((e) => {
          this.$toast.show("Something went wrong").goAway(5000);
        })
        .finally(() => {
          this.company_loading = false;
        });
    },
    changePhoto() {
      $("#photo").modal({
        keyboard: true,
      });
    },

    validateAccountInfo() {
      let errors = {};

      if (this.name == "" || this.name == null) {
        errors["name"] = ["Name is required"];
      }

      if (this.email == "" || this.email == null) {
        errors["email"] = ["Email is required"];
      }

      if (this.npi == "" || this.npi == null) {
        errors["npi"] = ["NPI is required"];
      }

      if (Object.entries(errors).length > 0) {
        this.setErrors(errors);
        return false;
      }

      return true;
    },
    placeChanged(data) {
      this.zipcode = "";
      this.country = "";
      this.state = "";
      this.city = "";
      this.county = "";
      this.address = "";
      data.forEach((place) => {
        if (place.types[0] == "postal_code") {
          this.zipcode = place.short_name;
          this.address = this.address + " " + place.short_name;
        }
        if (place.types[0] == "country") {
          this.country = place.short_name;
          this.address = this.address + " " + place.short_name;
        }
        if (place.types[0] == "administrative_area_level_1") {
          this.state = place.short_name;
          this.address = this.address + " " + place.short_name;
        }
        if (place.types[0] == "locality" || place.types[0] == "political") {
          this.city = place.short_name;
          this.address = this.address + " " + place.short_name;
        }
        if (place.types[0] == "administrative_area_level_2") {
          this.county = place.long_name;
          this.address = this.address + ", " + place.short_name;
        }
      });
    },
  },

  created() {
    this.autoFillAuthInfo({ module: "profile" });
    this.getStates();
    this.getCities(this.state || 0);
  },
};
</script>
