<template>
  <main>
    <div class="app-content content pl-0 ml-0">
      <div class="content-overlay"></div>
      <div class="content-wrapper">
        <div class="content-body">
          <div class="row flexbox-container">
            <div
              class="col-12 d-flex align-items-center justify-content-center"
            >
              <div class="card">
                <div class="card-header">
                  <h1 class="card-title display-1">Register</h1>
                </div>

                <div class="card-content">
                  <div class="card-body">
                    <form
                      class="form"
                      @submit.prevent="register"
                      @keydown="removeError($event.target.name)"
                    >
                      <div class="form-body">
                        <div class="form-group">
                          <div class="text-sm-left">
                            <fieldset class="custom-control custom-checkbox">
                              <input
                                name="is_doctor"
                                id="isDoctor"
                                type="checkbox"
                                v-model="provider.is_doctor"
                                class="custom-control-input"
                              />
                              <label for="isDoctor" class="custom-control-label"
                                >Are you a doctor?</label
                              >
                            </fieldset>
                          </div>
                        </div>
                        <div class="row" v-if="provider.is_doctor">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="npi"
                              :class="{ 'text-danger': errors.npi }"
                            >
                              NPI*
                            </label>
                            <div class="position-relative has-icon-left">
                              <input
                                :class="{ 'has-error': errors.npi }"
                                type="text"
                                id="npi"
                                class="form-control"
                                placeholder="Please enter your NPI"
                                name="npi"
                                v-model="provider.npi"
                                maxlength="10"
                                minlength="10"
                                @blur="fetchProviderDetails"
                                @keyup="keyupNPI"
                                @keypress="isNumber"
                              />
                              <div class="form-control-position">
                                <i class="ft-unlock"></i>
                              </div>
                            </div>
                            <span class="error-message" v-if="errors.npi">
                              {{ errors.npi[0] }}
                            </span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="name"
                              :class="{ 'text-danger': errors.name }"
                              >Name*</label
                            >
                            <div class="position-relative has-icon-left">
                              <input
                                type="text"
                                id="name"
                                class="form-control"
                                placeholder="Your full name"
                                name="name"
                                v-model="provider.name"
                                :class="{ 'has-error': errors.name }"
                              />
                              <div class="form-control-position">
                                <i class="ft-user"></i>
                              </div>
                            </div>
                            <div class="error-message" v-if="errors.name">
                              {{ errors.name[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row" v-if="provider.is_doctor">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="taxonomy_code"
                              :class="{ 'text-danger': errors.taxonomy_code }"
                              >Taxonomy Code*</label
                            >
                            <div class="position-relative has-icon-left">
                              <input
                                type="text"
                                id="taxonomy_code"
                                class="form-control"
                                placeholder="Your taxonomy code"
                                name="taxonomy_code"
                                v-model="provider.taxonomy_code"
                                :class="{ 'has-error': errors.taxonomy_code }"
                              />
                              <div class="form-control-position">
                                <i class="ft-user"></i>
                              </div>
                            </div>
                            <div
                              class="error-message"
                              v-if="errors.taxonomy_code"
                            >
                              {{ errors.taxonomy_code[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="companyname"
                              :class="{ 'text-danger': errors.name }"
                            >
                              Company Name*
                            </label>
                            <div class="position-relative has-icon-left">
                              <input
                                type="text"
                                id="companyname"
                                class="form-control"
                                placeholder="Company name"
                                name="company_name"
                                v-model="company.company_name"
                                :class="{ 'has-error': errors.company_name }"
                              />
                              <div class="form-control-position">
                                <i class="la la-briefcase"></i>
                              </div>
                            </div>
                            <div
                              class="error-message"
                              v-if="errors.company_name"
                            >
                              {{ errors.company_name[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="email"
                              :class="{ 'text-danger': errors.email }"
                              >Email*</label
                            >
                            <div class="position-relative has-icon-left">
                              <input
                                :class="{ 'has-error': errors.email }"
                                type="text"
                                id="email"
                                class="form-control"
                                placeholder="Your email address"
                                name="email"
                                v-model="provider.email"
                              />
                              <div class="form-control-position">
                                <i class="ft-user"></i>
                              </div>
                            </div>
                            <div class="error-message" v-if="errors.email">
                              {{ errors.email[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="phoneno"
                              :class="{ 'text-danger': errors.phone }"
                            >
                              Phone Number*
                            </label>
                            <div class="position-relative has-icon-left">
                              <input
                                :class="{ 'has-error': errors.phone }"
                                type="text"
                                id="phoneno"
                                class="form-control"
                                placeholder="Phone number"
                                name="phone"
                                v-model="company.phone"
                              />
                              <div class="form-control-position">
                                <i class="la la-briefcase"></i>
                              </div>
                            </div>
                            <div class="error-message" v-if="errors.phone">
                              {{ errors.phone[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-md-6 mb-2">
                            <label
                              for="password"
                              :class="{ 'text-danger': errors.password }"
                              >Password*</label
                            >
                            <div class="position-relative has-icon-left">
                              <input
                                :class="{ 'has-error': errors.password }"
                                type="password"
                                id="password"
                                class="form-control"
                                placeholder="Password"
                                name="password"
                                v-model="provider.password"
                                minlength="8"
                                maxlength="25"
                              />
                              <div class="form-control-position">
                                <i class="ft-unlock"></i>
                              </div>
                            </div>
                            <div class="error-message" v-if="errors.password">
                              {{ errors.password[0] }}
                            </div>
                          </div>
                          <div class="form-group col-md-6 mb-2">
                            <label
                              for="confirm_password"
                              :class="{
                                'text-danger': errors.confirm_password,
                              }"
                              >Confirm Password*</label
                            >
                            <div class="position-relative has-icon-left">
                              <input
                                :class="{ 'has-error': errors.password }"
                                type="password"
                                id="confirm_password"
                                class="form-control"
                                placeholder="Confirm password"
                                name="confirm_password"
                                v-model="provider.confirm_password"
                                minlength="8"
                                maxlength="25"
                              />
                              <div class="form-control-position">
                                <i class="ft-unlock"></i>
                              </div>
                            </div>
                            <div
                              class="error-message"
                              v-if="errors.confirm_password"
                            >
                              {{ errors.confirm_password[0] }}
                            </div>
                          </div>
                        </div>
                        <!-- <div class="row">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="address"
                              :class="{ 'text-danger': errors.address }"
                            >
                              Address
                            </label>
                            <div class="position-relative">
                              <autocomplete
                                :class="{ 'has-error': errors.address }"
                                v-model="company.address"
                                id="address"
                                classes="form-control"
                                name="address"
                                placeholder="Please enter your complete address"
                                @placeChanged="placeChanged"
                              />
                              <input :class="{'has-error':errors.address}" v-model="company.address" id="address" class="form-control" name="address" placeholder="Please enter your complete address" />
                            </div>
                            <span class="error-message" v-if="errors.address">
                              {{ errors.address[0] }}
                            </span>
                          </div>
                        </div> -->
                        <!-- address -->
                        <div class="row">
                          <div class="form-group col-md-6 mb-2">
                            <label
                              for="zipcode"
                              :class="{ 'text-danger': errors.zipcode }"
                              >Zip Code*</label
                            >
                            <div class="position-relative">
                              <!-- <input
                                :class="{ 'has-error': errors.zipcode }"
                                type="text"
                                id="zipcode"
                                class="form-control"
                                name="zipcode"
                                v-model="company.zipcode"
                                minlength="5"
                                maxlength="5"
                              /> -->
                              <zipcodeautocomplete
                                :class="{ 'has-error': errors.zipcode }"
                                v-model="company.zipcode"
                                id="zipcode"
                                classes="form-control"
                                name="zipcode"
                                placeholder="00000"
                                style="color: grey;"
                                @placeChanged="placeChanged"
                              />
                            </div>
                            <span class="error-message" v-if="errors.zipcode">
                              {{ errors.zipcode[0] }}
                            </span>
                          </div>
                          <div class="form-group col-md-6 mb-2">
                            <label
                              for="state"
                              :class="{ 'text-danger': errors.state }"
                              >State*</label
                            >
                            <div class="position-relative">
                              <!-- <select :class="{'has-error':errors.state}" v-model="company.state" name="state" id="state" class="form-control" @change="changeCity($event.target.value), removeError('state')">
                                                <option value="0">Please choose</option>
                                                <option :value="state.id" v-for="state in states" :key="state.id">
                                                  {{state.state}}
                                                </option>
                                              </select> -->
                              <input
                                :class="{ 'has-error': errors.state }"
                                v-model="company.state"
                                name="state"
                                id="state"
                                class="form-control"
                                @change="removeError('state')"
                              />
                            </div>
                            <span class="error-message" v-if="errors.state">
                              {{ errors.state[0] }}
                            </span>
                          </div>
                        </div>
                        <!-- zipcode -->
                        <div class="row">
                          <div class="form-group col-md-6 mb-2">
                            <label
                              for="city"
                              :class="{ 'text-danger': errors.city }"
                              >City*</label
                            >
                            <div class="position-relative">
                              <!-- <select :disabled="!cities.length" :class="{'has-error':errors.city}" v-model="company.city" name="city" id="city" class="form-control" @change="removeError('city')">
                                                <option value="0">Please choose</option>
                                                 <template v-if="cities.length">
                                                    <option :value="city.id" v-for="city in cities" :key="city.id">
                                                      {{city.city}}
                                                    </option>
                                                  </template>
                                              </select> -->
                              <input
                                :class="{ 'has-error': errors.city }"
                                v-model="company.city"
                                name="city"
                                id="city"
                                class="form-control"
                                @change="removeError('city')"
                              />
                            </div>
                            <span class="error-message" v-if="errors.city">
                              {{ errors.city[0] }}
                            </span>
                          </div>
                          <div class="form-group col-md-6 mb-2">
                            <label
                              for="county"
                              :class="{ 'text-danger': errors.county }"
                              >County</label
                            >
                            <div class="position-relative">
                              <input
                                :class="{ 'has-error': errors.county }"
                                type="text"
                                id="county"
                                class="form-control"
                                name="county"
                                v-model="company.county"
                              />
                            </div>
                            <span class="error-message" v-if="errors.county">
                              {{ errors.county[0] }}
                            </span>
                          </div>
                        </div>
                        <!-- state and city -->
                        <!-- <div class="form-group">
                          <div class="text-sm-left">
                            <fieldset class="custom-control custom-checkbox">
                              <input
                                name="is_doctor"
                                id="isDoctor"
                                type="checkbox"
                                v-model="provider.is_doctor"
                                class="custom-control-input"
                              />
                              <label for="isDoctor" class="custom-control-label"
                                >Are you a doctor?</label
                              >
                            </fieldset>
                          </div>
                        </div>
                        <div class="row" v-if="provider.is_doctor">
                          <div class="form-group col-12 mb-2">
                            <label
                              for="npi"
                              :class="{ 'text-danger': errors.npi }"
                            >
                              Npi
                            </label>
                            <div class="position-relative has-icon-left">
                              <input
                                :class="{ 'has-error': errors.npi }"
                                type="text"
                                id="npi"
                                class="form-control"
                                placeholder="Please enter your npi"
                                name="npi"
                                v-model="provider.npi"
                                maxlength="10"
                                minlength="10"
                              />
                              <div class="form-control-position">
                                <i class="ft-unlock"></i>
                              </div>
                            </div>
                            <span class="error-message" v-if="errors.npi">
                              {{ errors.npi[0] }}
                            </span>
                          </div>
                        </div> -->
                        <div class="form-group">
                          <div class="text-sm-left">
                            <fieldset class="custom-control custom-checkbox">
                              <input
                                id="agreedOnTerms"
                                type="checkbox"
                                name="agreed_on_terms"
                                v-model="agreed_on_terms"
                                class="custom-control-input"
                              />
                              <label
                                for="agreedOnTerms"
                                class="custom-control-label"
                              >
                                I have read and I agree to all
                                <a href="#">terms and services</a></label
                              >
                            </fieldset>
                          </div>
                        </div>
                      </div>
                      <div class="form-actions text-right">
                        <button
                          :disabled="loading"
                          type="submit"
                          class="btn btn-info btn-lg btn-block"
                        >
                          <i class="ft-unlock"></i>
                          Register
                          <i
                            v-if="loading"
                            class="fas fa-circle-notch fa-spin"
                          ></i>
                        </button>
                        <!-- <button
                          :disabled="loading"
                          @click="resetForm"
                          class="btn btn-info btn-lg btn-block"
                        >
                          Reset Form
                        </button> -->

                        <p class="text-center mt-2">
                          Already have an account ?
                          <nuxt-link :to="{ path: '/login' }">
                            Login
                          </nuxt-link>
                        </p>
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
import { validate } from "@/plugins/validationRules/register";
import impactHeader from "@/components/layouts/impact-header";
import autocomplete from "@/components/autocomplete";
import zipcodeautocomplete from "@/components/zipcodeautocomplete";

export default {
  middleware: "guest",

  layout: "one-column",

  head() {
    return {
      title: "Register",
    };
  },

  components: {
    impactHeader,
    autocomplete,
    zipcodeautocomplete,
  },

  data() {
    return {
      provider: {
        name: "",
        email: "",
        is_doctor: false,
        npi: "",
        taxonomy_code: "",
        password: "",
        confirm_password: "",
      },
      company: {
        company_name: "",
        address: "",
        state: "",
        city: "",
        county: "",
        zipcode: "",
        phone: "",
      },
      agreed_on_terms: false,
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      cities: "cities",
      states: "states",
    }),
  },

  methods: {
    ...mapActions({
      getStates: "getStates",
      getCities: "getCities",
      removeError: "validation/removeError",
    }),

    changeCity(id) {
      this.company.city = 0;
      this.getCities(id);
    },

    getData() {
      let provider = this.provider;
      let company = this.company;

      return {
        name: provider.name,
        email: provider.email,
        is_doctor: provider.is_doctor,
        npi: provider.npi,
        taxonomy_code: provider.taxonomy_code,
        password: provider.password,
        confirm_password: provider.confirm_password,
        company_name: company.company_name,
        address: company.address,
        state: company.state,
        city: company.city,
        county: company.county,
        zipcode: company.zipcode,
        phone: company.phone,
      };
    },

    resetForm() {
      (this.provider.name = null),
        (this.provider.email = null),
        (this.provider.is_doctor = false),
        (this.provider.npi = null),
        (this.provider.taxonomy_code = null),
        (this.provider.password = null),
        (this.provider.confirm_password = null),
        (this.company.company_name = null),
        (this.company.address = null),
        (this.company.state = null),
        (this.company.city = null),
        (this.company.county = null),
        (this.company.zipcode = null),
        (this.company.phone = null);
      this.agreed_on_terms = false;
    },

    async register() {
      let data = this.getData();
      // data["adress"] = document.querySelector("#address").value;

      if (!validate(this.$store, data)) {
        this.showErrors();
        return false;
      }

      if (!this.agreed_on_terms) {
        this.$toast.show("Please accept our terms and services").goAway(5000);
        return false;
      }
      
      this.loading = true;
      await this.$axios
        .post("provider/register", {
          ...data,
          // zipcode: data.zipcode.split('-')[0]
          //  + data.zipcode.split('-')[1],
        })
        .then((res) => {
          this.loading = false;
          this.$toast
            .show(
              "You have been registered. Please check your email to verify your account."
            )
            .goAway("5000");
          this.resetForm();
        })
        .catch((e) => {
          this.loading = false;
          this.showErrors();
        });
    },
    keyupNPI() {
      if (this.provider.npi.length === 10) {
        this.fetchProviderDetails();
      }
    },
    fetchProviderDetails() {
      this.loading = true;
      this.$axios
        .get(`provider/get_provider_info?npi=${this.provider.npi}`)
        .then((res) => {
          if (res && res.status === 200) {
            const data = res.data;
            if (data && data.npi.length > 0) {
              const provider = {
                name: `${data.provider_first_name} ${data.provider_last_name}`,
                npi: data.npi,
                taxonomy_code: data.healthcare_provider_taxonomy_code_1,
                is_doctor: this.provider.is_doctor,
              };
              const company = {
                company_name: data.provider_organization_name,
                phone: data.provider_business_mailing_address_telephone_number,
                state: data.provider_business_mailing_address_state_name,
                city: data.provider_business_practice_location_address_city_name,
                address: data.provider_business_mailing_address_postal_code + " " + 
                data.provider_business_practice_location_address_city_name + " " +
                data.provider_business_mailing_address_state_name + " " +
                data.provider_business_mailing_address_country_code,
                zipcode: data.provider_business_practice_location_address_postal_code && 
                  data.provider_business_practice_location_address_postal_code.length > 5 && 
                  data.provider_business_practice_location_address_postal_code.substr(0, 5)
                  // data.provider_business_practice_location_address_postal_code && 
                  // data.provider_business_practice_location_address_postal_code.length > 5 && 
                  // data.provider_business_practice_location_address_postal_code.substr(0, 5) + '-' + data.provider_business_practice_location_address_postal_code.substr(5),
              };
              this.provider = provider;
              this.company = company;
            } else {
            this.$toast
            .show(
              "We couldn’t find any details for the entered NPI. Please enter the data manually."
            )
            .goAway("5000");
          }
          }
        })
        .catch((e) => {
          this.$toast
            .error("Error in getting provider details. " + e)
            .goAway(5000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showErrors() {
      window.scrollTo({
        top: 20,
        behavior: "smooth",
      });

      this.$toast.error("Please Fix some errors below").goAway(5000);
    },

    placeChanged(data) {
      this.company.zipcode = "";
      this.company.country = "";
      this.company.state = "";
      this.company.city = "";
      this.company.county = "";
      this.company.address = "";
      data.forEach((place) => {
        if (place.types[0] == "postal_code") {
          this.company.zipcode = place.short_name;
          this.company.address = this.company.address + "," + place.short_name;
        }
        if (place.types[0] == "country") {
          this.company.country = place.short_name;
          this.company.address = this.company.address + " " + place.short_name;
        }
        if (place.types[0] == "administrative_area_level_1") {
          this.company.state = place.short_name;
          this.company.address = this.company.address + " " + place.short_name;
        }
        if (place.types[0] == "locality" || place.types[0] == "political") {
          this.company.city = place.short_name;
          this.company.address = this.company.address + " " + place.short_name;
        }
        if (place.types[0] == "administrative_area_level_2") {
          this.company.county = place.long_name;
          this.company.address = this.company.address + "," + place.short_name;
        }
      });
    },
    isNumber(val) {
      if (isNaN(Number(val.key))) {
        return val.preventDefault();
      }
    },
  },

  created() {
    this.getStates();
    this.getCities(0);
  },
};
</script>

<style lang="scss" scoped>
.has-error {
  border: 1px solid #dc3545;
}
.text-danger {
  color: #dc3545;
}
</style>
