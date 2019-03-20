<template>
  <div>
      <report-pub></report-pub>
      <!-- <profession-report-chart v-if="!($store.state.reportType)"></profession-report-chart> -->
      <profession-report-chart v-if="!($store.state.reportType)"></profession-report-chart>
  </div>
</template>

<script>
import ReportPub from '@/components/reportPub'
// import ProfessionReportChart from '@/components/professionReportChart'
import ProfessionReportChart from '@/components/proReportCharts'
export default {
    components:{
        ReportPub,
        ProfessionReportChart
    }
};
</script>
