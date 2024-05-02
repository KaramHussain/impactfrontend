<template>

  <tr class="pull-up" style="text-align:center">
    <td class="text-truncate">{{AppDate(member.date, 'll')}}</td>
    <td class="text-truncate p-1">
      {{member.insurance_name}}
    </td>
    <td>
        <button type="button" class="btn btn-sm btn-outline-primary round">
          {{member.insurance_type}}
        </button>
    </td>
    <td class="text-truncate">{{member.type_of_service}}</td>
    <td>{{formatter(member.total_charges)}}</td>
    <td>{{formatter(member.pending_charges)}}</td>
    <td class="icons">

      <nuxt-link :to="{name: 'members-performance-id', params: { id: member.id } }">
        <i class="la la-eye" title="View"></i>
      </nuxt-link>

    </td>
  </tr>

</template>

<script>
export default {

    props: {
        member: {
          type: Object,
          required:true
        }
    }

}
</script>

