<template>
  <main>
    <impactHeader />
    <impactSidebar />
    <!-- BEGIN: Content-->
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="content-wrapper py-0" id="ia-charts">
        <div class="content-header">
          <h2 class="mb-2">
            Impact Analysis
            <button @click="generatePdfAndDownload" class="btn btn-small">
              Download
            </button>
          </h2>
        </div>
        <div class="content-body">
          <!-- <button @click.prevent="$router.push({path:'/login'})" class="btn btn-primary">Login</button> -->
          <!-- Info cards -->
          <infoCardsCopy />

          <!-- From to Date -->
          <fromToDate />

          <!-- Buisness Graph -->
          <businessGraph />

          <!-- Paid work rvu graph -->
          <paidAmountRevenue />

          <!-- DenialTrends -->
          <denialTrends />

          <!-- Denial Trends For Collectors -->
          <!-- <denialTrendsCollectors /> -->

          <!-- Timesheet -->
          <timesheet />

          <!-- Compliance issues -->
          <complianceIssues />

          <!-- Pie -->
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <impactSummary />
            </div>

            <div class="col-md-6 col-sm-12">
              <denialsFruits />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Content-->

    <impactFooter />
  </main>
</template>

<script>
import infoCards from "@/components/info-cards";
import infoCardsCopy from "@/components/info-cards-copy";
import timesheet from "@/components/charts/timesheet";
import denialTrends from "@/components/charts/denial-trends";
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";
import businessGraph from "@/components/charts/buisness-graph";
import denialsFruits from "@/components/charts/denials-fruits";
import impactSummary from "@/components/charts/impact-summary";
import fromToDate from "@/components/charts/filters/from-to-date";
import complianceIssues from "@/components/charts/compliance-issues";
import paidAmountRevenue from "@/components/charts/paid_amount_revenue";
import denialTrendsCollectors from "@/components/charts/denial-trends-collectors";
import { mapActions, mapGetters } from "vuex";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  middleware: ["auth", "admin"],

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    businessGraph,
    denialTrends,
    denialTrendsCollectors,
    timesheet,
    complianceIssues,
    denialsFruits,
    impactSummary,
    fromToDate,
    infoCards,
    infoCardsCopy,
    paidAmountRevenue,
  },

  head() {
    return {
      title: "Dashboard",
    };
  },

  methods: {
    ...mapActions("graphs", {
      load: "load",
    }),
    generatePdfAndDownload() {
      window.html2canvas = html2canvas;
      const doc = new jsPDF("p", "pt", "a4");
      const elem = document.querySelector("#ia-charts");
      // const elem = document.querySelector("ia-business-graph");
      doc.html(elem, {
        callback: function (pdf) {
          pdf.save("testpdf.pdf");
        },
      });

      // html2canvas(document.getElementById("ia-business-graph"), {
      //   onrendered: function(canvas) {
      //     var img = canvas.toDataURL();
      //     var doc = new jsPDF();
      //     doc.addImage(img, 10, 10);
      //     doc.save("test.pdf");
      //   }
      // });
    },
  },

  mounted() {
    this.load({ load: true, range: "daily" });
  },
};
</script>
