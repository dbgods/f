<template>
  <div>
    <h1>Drivers</h1>
    <div id="tableHold3">
      <vue-good-table
        class="table"
        title="drivers"
        :columns="driCols"
        :rows="drivers"
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
  name: "Drivers",
  data() {
    return {
      driCols: [
        {
          label: "ID",
          field: "employee_id"
        },
        {
          label: "Name",
          field: "employee_name"
        },
        {
          label: "Rank",
          field: "employee_rank"
        },
        {
          label: "Payroll ($)",
          field: "driver_id"
        },
        {
          label: "Contact",
          field: "employee_contact"
        },
        {
          label: "Address",
          field: "employee_address"
        },
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
    drivers: function() {
      if (
        this.$store.state.drivers == null ||
        typeof this.$store.state.drivers == "undefined"
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
        return this.$store.state.drivers;
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
