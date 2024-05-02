<template>
  <input
    autocomplete="off"
    :id="id"
    :name="name"
    type="text"
    :class="classes"
    placeholder="Please enter your location"
    v-model="address"
    maxlength="5"
    @keypress="isNumber"
    @focus="onFocusZipcode"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    classes: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      address: null,
    };
  },

  computed: {
    ...mapGetters("index_and_search", {
      search: "search",
    }),
  },

  methods: {
    isNumber(val) {
      if (isNaN(Number(val.key))) {
        return val.preventDefault();
      }
    },
    addHyphen() {
      let ele = document.getElementById("zipcode");
      if (ele.value.length > 5 && !isNaN(Number(ele.value))) {
        ele = ele.value.split("-").join(""); // Remove dash (-) if mistakenly entered.
        let finalVal = ele.match(/.{1,5}/g).join("-");
        document.getElementById("zipcode").value = finalVal;
      }
    },
    onFocusZipcode() {
      let ele = document.getElementById("zipcode");
      if (ele.value.length > 9) {
        ele.value = "";
      }
    }
  },

  watch: {
    address(address) {
      this.$emit("input", address);
    },
  },

  mounted: function () {
    let vm = this;
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631)
    );
    var input = document.getElementById(this.id);
    var options = {
      bounds: defaultBounds,
      types: ["(regions)"],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    //Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions({ country: ["us"] });

    // Specify only the data fields that are needed.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

    autocomplete.addListener("place_changed", function () {
      var place = autocomplete.getPlace();
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      const zipCode = place.address_components.find((p) =>
        p.types.includes("postal_code")
      );
      vm.address = zipCode.short_name;
      vm.$emit("placeChanged", place.address_components);
      //vm.setUserLatLng({lat, lng});
      return;

      // var address = '';
      // if (place.address_components) {
      //   address = [
      //     (place.address_components[0] && place.address_components[0].short_name || ''),
      //     (place.address_components[1] && place.address_components[1].short_name || ''),
      //     (place.address_components[2] && place.address_components[2].short_name || ''),
      //     (place.address_components[3] && place.address_components[3].short_name || ''),
      //     (place.address_components[4] && place.address_components[4].short_name || ''),
      //     (place.address_components[5] && place.address_components[5].short_name || ''),
      //     (place.address_components[6] && place.address_components[6].short_name || ''),
      //     (place.address_components[7] && place.address_components[7].short_name || ''),
      //   ].join(' ');
      //   vm.address = address;
      // }
    });
  },
};
</script>
