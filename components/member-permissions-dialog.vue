<template>
  <!-- Member permissions -->
  <div
    class="modal fade text-left"
    id="default"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel1"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel1">
            Edit member permissions
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body py-2">
          <h4>Member Permissions</h4>

          <template>
            <permissions
              @change="$emit('change', $event)"
              :checked="permissionsForRole"
            />
          </template>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn grey btn-outline-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import permissions from "./permissions";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    permissions,
  },

  props: {
    role: {
      type: String,
      required: true,
    },
    formattedPermissions: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      rolePermissions: "profile/rolePermissions",
      permissions: "profile/permissions",
    }),

    permissionsForRole() {
      
      if (this.role == "" || this.role == null || typeof this.role != "string")
        return [];

      let role = this.rolePermissions.find((role) => role.name == this.role);
      let assignedPermissions = this.permissions.filter(p => this.formattedPermissions.includes(p.id));
      
      if (role && assignedPermissions) {
        const items = [...role.permissions, ...assignedPermissions];
        this.emitPermissions([...role.permissions, ...assignedPermissions]);
        return [...role.permissions, ...assignedPermissions];
      } else if (role) {
        this.emitPermissions(role.permissions);
        return role.permissions;
      }

      return [];
    },

  },

  methods: {
    ...mapActions({
      fetchRolePermissions: "profile/fetchRolePermissions",
      fetchPermissions: "profile/fetchPermissions",
    }),

    emitPermissions(permissions) {
      permissions.forEach((permission) => {
        let e = {
          target: {
            checked: true,
            value: permission.id,
          },
        };
        this.$emit("change", e);
      });
    },
  },

  created() {
    this.fetchRolePermissions();
    this.fetchPermissions();
  },

};
</script>

