<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">

            <div class="content-header row">


              <div class="content-header-left col-md-6 col-12 mb-2">
                <h3 class="content-header-title mb-0 d-inline-block">
                  Claim Revisions
                </h3>
              </div>

              <div class="content-header-right col-md-6 col-12 mb-2">
                <assigned-by-info class="float-right" />
                <div class="clearfix"></div>
              </div>

            </div>

            <div class="content-body">

                <div class="card">
                    <div class="card-body">
                        {{revisions}}
                    </div>
                </div>

            </div>

        </div>

    </div>

    <impactFooter />

  </main>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'

//layout
import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'
import assignedByInfo from '@/components/assigned-by-info'


export default {

  middleware:['auth'],

  head() {
    return {
      title:'Claim Revisions'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    assignedByInfo
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {

    ...mapGetters('claims', {
        revisions: 'revisions'
    }),

    claimId() {
      return this.$route.params.id
    }
  
  },

  methods: {

    ...mapActions('claims', {
        fetchRevisions: 'fetchRevisions'
    })

  },

  created() {
    this.fetchRevisions(this.claimId)
  }

}

</script>

