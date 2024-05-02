<template>

  <div id="members-performance">

      <div class="card">
        <div class="card-header">
            <h4 class="card-title">Collectors performance</h4>
        </div>
        <div class="card-content mt-1">
            <div class="table-responsive">
                <table id="recent-orders-doctors" class="table table-hover table-xl mb-0">
                    <thead>
                        <tr>
                            <th class="border-top-0">Date of service</th>
                            <th class="border-top-0">Insurance name</th>
                            <th class="border-top-0">Insurance type</th>
                            <th class="border-top-0">Type of service</th>
                            <th class="border-top-0">Total charges</th>
                            <th class="border-top-0">Pending</th>
                            <th class="border-top-0">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                      <slot></slot>
                    </tbody>

                </table>
            </div>
        </div>
      </div>

  </div>

</template>

<script>
export default {


}
</script>

