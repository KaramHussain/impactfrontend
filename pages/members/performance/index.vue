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
                  <!-- {{user.name}}'s Dashboard -->
                   Dashboard
                </h3>
              </div>

              <assigned-by-info />

          </div>

          <div class="content-body">

            <performance-wrapper>

              <performance
                v-for="member in members"
                :key="member.id"
                :member="member"
              />

            </performance-wrapper>

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
import performance from '@/components/members-performance/index'
import performanceWrapper from '@/components/members-performance/wrapper'
import assignedByInfo from '@/components/assigned-by-info'

export default {
  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    performance,
    performanceWrapper,
    assignedByInfo
  },

  head() {
    return {
      title: 'Members performance'
    }
  },

  data() {
    return {
      members
    }
  }
}
</script>


