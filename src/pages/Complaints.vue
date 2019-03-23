<template>
  <div>
    <h1>Complaints</h1>
    <div id="tableHold2">
      <vue-good-table
        class="table"
        title="complaints"
        :columns="compCols"
        :rows="complaints"
        :globalSearch="true"
        :paginate="true"
        :perPage="5"
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
  name: "Complaints",
  data() {
    return {
      compCols: [
        {
          label: "Complaint No.",
          field: "Complaint_number"
        },
        {
          label: "Typr",
          field: "Complaint_type"
        },
        {
          label: "Urgency",
          field: "Complaint_Urgency"
        },
        {
          label: "Info",
          field: "Complaint_Info"
        },
        {
          label: "Department",
          field: "Complaint_DepartmentInvolved"
        }
      ]
    };
  },
  computed: {
    complaints: function() {
      if (
        this.$store.state.Complaints == null ||
        typeof this.$store.state.Complaints.data == "undefined"
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
        return this.$store.state.Complaints.data;
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
