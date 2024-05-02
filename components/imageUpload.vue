<template>
  <input type="file" class="form-control" accept="image/*" @change="onChange">
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

export default {

  methods: {

    onChange(e) {

      if(!e.target.files.length) return false;

      let image = e.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(image);

      reader.onload = e => {
        let filename = e.target.result;
        this.$emit('onload', {image, filename});
      };



    }

  }

}
</script>
