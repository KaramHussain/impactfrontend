<template>

  <div>

    <table border="2" class="claim-table">

      <tr class="t-head">
        <td colspan="4" class="text--dark">
          Rendering Provider
          <a href="#" @click.prevent="$emit('edit', 'renderingProvider')">
            <i class="fas fa-pen"></i>
          </a>
        </td>
      </tr>
      <tr>
        <td colspan="4" style="height: 125px">
          <p>
            Full Name: 
            {{renderingProviderDetails?.Rendering_provider_Name}}
          </p>
          <p>Full Address:
            <!-- {{renderingProvider['RENDERING PROVIDER NATIONAL PROVIDER IDENTIFIER']}} -->
          </p>
        </td>
        <!-- <td colspan="4" style="height: 125px">
          <p>
            Full Name: 
            {{renderingProvider['RENDERING PROVIDER FIRST NAME']}}
            {{renderingProvider['RENDERING PROVIDER LAST NAME']}}
          </p>
          <p>Full Address:
            {{renderingProvider['RENDERING PROVIDER NATIONAL PROVIDER IDENTIFIER']}}
          </p>
        </td> -->
      </tr>

      <tr>
        <td class="text--dark">NPI:</td>
        <td colspan="3">{{renderingProviderDetails?.Rendering_provider_NPI}}</td>
      </tr>

      <tr>
        <td class="text--dark">SSN:</td>
        <td></td>

        <td class="text--dark">TAXID:</td>
        <td></td>
      </tr>

      <tr>
        <td class="text--dark">UPIN:</td>
        <td></td>

        <td class="text--dark">TaxonomyCode:</td>
        <td></td>
      </tr>

      <tr>
        <td class="text--dark">Speciality:</td>
        <td colspan="3"></td>
      </tr>

      <tr>
        <td class="text--dark">Provider Signature:</td>
        <td>Y</td>
        <td class="text--dark">Signature Date:</td>
        <td>{{AppDate(date)}}</td>
      </tr>

    </table>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      date: undefined,
      renderingProviderDetails: null
    }
  },

  mounted(){
    let renderingProviderDetailsObject = localStorage.getItem('renderingProviderDetails')
    if(renderingProviderDetailsObject != undefined){
      this.renderingProviderDetails = JSON.parse(renderingProviderDetailsObject)
      console.log("rendering provider details", this.renderingProviderDetails)
    }else{
      console.log("rendering provider is undefined", renderingProviderDetailsObject)
    }
  },
  computed: {
    ...mapGetters('claims', {
      renderingProvider: 'renderingProvider'
    })
  }

}
</script>

