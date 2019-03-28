<template>
  <div>
    <h1>Packages</h1>
    <div id="tableHold">
      <vue-good-table
        class="table"
        title="Packages"
        :columns="packCols"
        :rows="packRows"
        :globalSearch="true"
        :paginate="true"
        :perPage="5"
      >
      </vue-good-table>
    </div>
  <div>
    <p>Add or Modify</p>
  </div>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { VueGoodTable } from "vue-good-table";
import axios from "axios";

//import 'vue-good-table/dist/vue-good-table.css'
import axios from 'axios';

export default {
  name: "Packages",
  data() {
    return {
      packRows: [],
      packCols: [
        {
          label: "Tracking No.",
          field: "package_trackingno",
          filterable: true
        },
        {
          label: "Content",
          field: "package_content",
          filterable: true
        },
        {
          label: "Type",
          field: "package_type",
          filterable: true
        },
        {
          label: "Status",
          field: "package_status",
          filterable: true
        },
        {
          label: "Driver",
          field: "package_driverid",
          filterable: true
        }
      ]
    };
  },
  computed: {
    packages: function() {
      if (
        this.$store.state.packages == null ||
        typeof this.$store.state.packages == "undefined"
      ) {
        return [
          {
            package_trackingno: "1294YE32",
            package_content: "Documents",
            pacakge_type: "Envelope",
            package_status: "En Route",
            package_driverid: "Jarred Huskell"
          },
          {
            package_trackingno: "4252YE30",
            package_content: "Furniture",
            pacakge_type: "Crate",
            package_status: "At shipment facility",
            package_driverid: "Kevin Matthew"
          }
        ];
      } else {

        return this.$store.state.packages;
      }
    }
  },
  created() {
  },
  methods: {}
};
</script>
