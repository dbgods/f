<template>
  <div>
    <h1>Vehicles</h1>
    <div id="tableHold4">
      <vue-good-table
        class="table"
        title="vehicles"
        :columns="vehiCols"
        :rows="vehicles"
        :globalSearch="true"
        :paginate="true"
        :perPage="10"
      >
      </vue-good-table>
    </div>

    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "Vehicles",
  data() {
    return {
      vehiCols: [
        {
          label: "Vehicle",
          field: "vehicle_number"
        },
        {
          label: "Type",
          field: "vehicle_type"
        },
        {
          label: "Capacity",
          field: "vehicle_maxcapacity"
        },
        {
          label: "License",
          field: "license_number"
        },
        {
          label: "Insurance",
          field: "insurance_number"
        },
        {
          label: "Warehouse",
          field: "warehouse_region"
        }
      ]
    };
  },
  computed: {
    vehicles: function() {
      if (
        this.$store.state.vehicles == null ||
        typeof this.$store.state.vehicles == "undefined"
      ) {
        return [
          {
            Complaint_number: "274",
            Complaint_type: "Late Delivery",
            Complaint_Urgency: 2,
            Complaint_Info: "Package arrived a week late",
            Complaint_DepartmentInvolved: "Warehouses"
          }
        ];
      } else {
        return this.$store.state.vehicles;
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
