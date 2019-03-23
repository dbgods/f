<template>
  <div>
    <h1>Packages</h1>
    <div id="tableHold">
      <vue-good-table
        class="table"
        title="Packages"
        :columns="packCols"
        :rows="packages"
        :globalSearch="true"
        :paginate="true"
        :perPage="5"
      >
      </vue-good-table>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "Packages",
  data() {
    return {
      packCols: [
        {
          label: "Tracking No.",
          field: "Package_TrackingNo",
          filterable: true
        },
        {
          label: "Content",
          field: "Package_Content",
          filterable: true
        },
        {
          label: "Type",
          field: "Package_Type",
          filterable: true
        },
        {
          label: "Status",
          field: "Package_Status",
          filterable: true
        },
        {
          label: "Driver",
          field: "Employee_Name",
          filterable: true
        }
      ]
    };
  },
  computed: {
    packages: function() {
      if (
        this.$store.state.Packages == null ||
        typeof this.$store.state.Packages.data == "undefined"
      ) {
        return [
          {
            Package_TrackingNo: "1294YE32",
            Package_Content: "Documents",
            Package_Type: "Envelope",
            Package_Status: "En Route",
            Employee_Name: "Jarred Huskell"
          },
          {
            Package_TrackingNo: "4252YE30",
            Package_Content: "Furniture",
            Package_Type: "Crate",
            Package_Status: "At shipment facility",
            Employee_Name: "Kevin Matthew"
          }
        ];
      } else {
        return this.$store.state.Packages.data;
      }
    }
  },
  created() {},
  methods: {}
};
</script>
