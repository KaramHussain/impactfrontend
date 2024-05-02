<template>
  <!-- Member permissions -->
  <div
    class="modal fade text-left"
    id="photo"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel1"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel1">Change profile photo</h4>
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
          <h4>Upload profile picture</h4>
          <div class="image-preview">
            <figure class="image-preview__img">
              <img :src="image" alt="user image" />
              <span v-if="!defaultImage">
                <a
                  href="#"
                  class="delete-button text-danger"
                  @click.prevent="deleteImage"
                  >Delete</a
                >
              </span>
            </figure>
          </div>
          <div class="form-group my-sm">
            <label for="" class="form-label">Add/Change Image</label>
            <imageUpload @onload="onload" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn grey btn-outline-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn grey btn-outline-secondary"
            @click.prevent="persist"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageUpload from "./imageUpload";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    imageUpload
  },

  props: {},

  data() {
    return {
      src: "",
      uploaded: false
    };
  },

  computed: {
    ...mapGetters("profile", {
      profile: "profile",
      providerImage: "providerImage"
    }),

    image: {
      set(key) {
        this.editInfo({
          param: "provider_image",
          value: key,
          section: "profile"
        });
      },
      get() {
        return this.providerImage;
      }
    },

    imageName() {
      let path = this.user.image.split("/");
      let image = path[path.length - 1];
      return image;
    },

    defaultImage() {
      if (this.image) {
        if (this.imageName == "default.png") {
          return true;
        }
      }
      return false;
    }
  },

  methods: {
    ...mapActions({
      autoFillAuthInfo: "autoFillAuthInfo",
      editInfo: "profile/editInfo",
      updateUserOriginalImage: "profile/updateUserOriginalImage"
    }),

    onload(data) {
      this.image = data.filename;
      this.src = data.image;
    },

    persist() {
      if (this.src == "") return false;

      let data = new FormData();
      data.append("image", this.src);

      this.$axios.post("provider/update-image", data).then(() => {
        this.$toast.show("Image Saved").goAway("5000");
        this.updateUserOriginalImage(this.image);
        this.$emit("onImageUploaded");
      });
    },

    deleteImage() {
      this.$axios.post("provider/delete-image").then(({ data }) => {
        if (data) {
          this.image = data;
          this.updateUserOriginalImage(this.image);
          this.$toast.show("Image saved").goAway(5000);
        }
      });
    }
  },

  created() {
    this.autoFillAuthInfo({ module: "profile" });
  }
};
</script>

<style lang="scss" scoped>
.image-preview {
  width: 100%;
  height: 20rem;
  border: 2px dashed #ccc;
  margin: 0 auto;
  position: relative;

  &__img {
    width: 15rem;
    height: 15rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      display: block;
      object-fit: cover;
      border: 1px solid #ccc;
      padding: 2px;
    }
  }
}
</style>
