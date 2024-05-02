<template>

  <div id="members-line-items">

    <div class="card">
      <div class="card-content mt-1">
          <div class="table-responsive">
              <table id="recent-orders-doctors" class="table table-hover table-xl mb-0">
                  <thead>
                      <tr>
                          <th class="border-top-0">#LN</th>
                          <th class="border-top-0">POS</th>
                          <th class="border-top-0">TOS</th>
                          <th class="border-top-0">MOD</th>
                          <th class="border-top-0">CPT</th>
                          <th class="border-top-0">Description</th>
                          <th class="border-top-0">Units</th>
                          <th class="border-top-0">Charge</th>
                          <th class="border-top-0">Remark code</th>
                          <th class="border-top-0">Remark code description</th>
                      </tr>
                  </thead>

                  <tbody>

                    <tr v-for="(item, index) in lineItems" :key="index">
                      <td>{{index + 1}}</td>
                      <td>{{item.pos}}</td>
                      <td>{{item.tos}}</td>
                      <td>{{item.mod}}</td>
                      <td>{{item.cpt}}</td>
                      <td>{{item.cpt_description}}</td>
                      <td>{{item.units}}</td>
                      <td>{{formatter(item.charge)}}</td>
                      <td>{{item.remark_code}}</td>
                      <td>{{item.remark_code_description}}</td>
                    </tr>

                  </tbody>

              </table>
          </div>
      </div>
    </div>

  </div>

</template>

<script>
import lineItems from '@/api/lineNumbers'
export default {
  data() {
    return {
      lineItems
    }
  }
}
</script>

<style>

</style>
