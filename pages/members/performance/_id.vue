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
                  {{user.name}}'s Dashboard
                </h3>
              </div>


              <div class="content-header-right col-md-6 col-12 mb-2 float-right text-right">

                <assigned-by-info />

                <info-header />

              </div>

          </div>

          <div class="content-body">

            <div class="float-right">

              <date-filter />

            </div>

            <div class="clearfix"></div>

            <performance-wrapper>
              <performance :member="member" />
            </performance-wrapper>

            <cpt-line-items />

            <member-history />

          </div>

        </div>

    </div>

    <impactFooter />
  </main>
</template>

<script>

import members from '@/api/members'
import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'
import assignedByInfo from '@/components/assigned-by-info'
import performance from '@/components/members-performance'
import performanceWrapper from '@/components/members-performance/wrapper'
import cptLineItems from '@/components/members-performance/cpt-line-items'
import memberHistory from '@/components/members-performance/history'
import infoHeader from '@/components/members-performance/info-header'
import DateFilter from '@/components/members-performance/date-filter'

export default {

  middleware: ['auth'],

  components: {
    performance,
    impactHeader,
    impactFooter,
    impactSidebar,
    assignedByInfo,
    performanceWrapper,
    cptLineItems,
    memberHistory,
    infoHeader,
    DateFilter
  },

  head() {
    return {
      title: 'Members performance'
    }
  },

  computed: {

    id() {
      //assuming id should be an integer
      let id = this.$route.params.id
      return id ? parseInt(id) : 0
    },

    member() {

      if(!members.length) return {}
      console.log(members.find(member => member.id === this.id));
      return members.find(member => member.id === this.id)

    }

  }

}
</script>


