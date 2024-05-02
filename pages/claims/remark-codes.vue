<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">

          <div class="content-header row">
              <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                <h3 class="content-header-title mb-0 d-inline-block">Analyse problems</h3>

                <breadcrumbs />

              </div>

              <div class="content-header-right col-md-6 col-12">

                <date-filter />

              </div>

          </div>

          <div class="content-body">

            <remark-codes />

          </div>

        </div>

    </div>

  </main>

</template>

<script>

import { mapActions } from 'vuex'
import impactHeader from '@/components/layouts/impact-header'
import impactSidebar from '@/components/layouts/impact-sidebar'
import breadcrumbs from '@/components/breadcrumbs'
import dateFilter from '@/components/filters/date-filter'
import remarkCodes from '@/components/charts/remark-codes'

export default {

  middleware:['auth', 'admin'],

  head() {
    return {
      title: 'Claim remark codes'
    }
  },

  components: {
    impactHeader,
    impactSidebar,
    breadcrumbs,
    dateFilter,
    remarkCodes
  },

  data() {
    return {

    }
  }

}

</script>

