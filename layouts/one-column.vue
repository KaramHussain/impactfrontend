<template>
  <html class="loading" lang="en" data-textdirection="ltr">
    <body
      data-col="1 column"
      class="h-100 vertical-layout vertical-menu 1-column"
      data-open="click"
      data-menu="vertical-menu"
    >
      <nuxt />
    </body>
  </html>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: "%s - Impact Analysis",
      meta: [
        { charset: "utf-8" },
        {
          hid: "description",
          name: "description",
          content: "Carepays for Providers -  Impact Analysis"
        }
      ]
    };
  }
};
</script>
