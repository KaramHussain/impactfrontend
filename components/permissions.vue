<template>
  <main v-if="permissions.length">
    <div class="row p-1">
    <div
      v-for="permission in permissions"
      :key="permission.id"
      class="custom-control custom-checkbox col-lg-3 col-md-3 col-sm-3 py-1"
    >
      <input
        :checked="shouldChecked(permission)"
        :name="permission.name"
        type="checkbox"
        class="custom-control-input"
        :id="permission.name"
        @change="addPermission($event)"
        :value="permission.id"
      />
      <label :for="permission.name" class="custom-control-label">
        {{ permission.display_name }}
      </label>
    </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    checked: {
      default: function () {
        return [];
      },
      type: Array,
    },
  },

  computed: {
    ...mapGetters("profile", {
      permissions: "permissions",
    }),
  },

  methods: {
    ...mapActions("profile", {
      fetchPermissions: "fetchPermissions",
    }),

    shouldChecked(permission) {
      let memberPermission = this.checked.find((p) => p.id == permission.id);
      if (memberPermission) {
        return true;
      }
      return false;
    },

    addPermission(e) {
      this.$emit("change", e);
    },
  },

  created() {
    this.fetchPermissions();
  },
};
</script>
