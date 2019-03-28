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

    <div>
    <h2>Add a new Complaint</h2>
    <form id="add_form" @submit.prevent="processForm">
      <select name="type" v-model="formData.type">
        <option value="SUV">SUV</option>
        <option value="MiniVan">MiniVan</option>
        <option value="BigTruck">BigTruck</option>
        <option value="MediumTruck">MediumTruck</option>
        <option value="SmallTruck">SmallTruck</option>
      </select>
      <input type="number" name="capacity" placeholder="Capacity" v-model="formData.capacity">
      <select name="availability" v-model="formData.availability">
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      <select name="whehterToRepair" v-model="formData.whetherToRepair">
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      <input type="text" name="insurance" placeholder="Insurance" v-model="formData.insurance">
      <input type="text" name="warehouse" placeholder="Warehouse" v-model="formData.warehouse">
      <button type="submit">Submit</button>
    </form>
  </div>

  <div>
    <h2>Delete a Package</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="vehicle_number" placeholder="Vehicle" v-model.number="vehicle_number.vehicle_number">
      <button type="submit">Submit</button>
    </form>
  </div>

  <div>
    <h2>Modify a Complaint</h2>
    <form id="add_form" @submit.prevent="processForm">
      <select name="type" v-model="formDataModify.type">
        <option value="SUV">SUV</option>
        <option value="MiniVan">MiniVan</option>
        <option value="BigTruck">BigTruck</option>
        <option value="MediumTruck">MediumTruck</option>
        <option value="SmallTruck">SmallTruck</option>
      </select>
      <input type="number" name="capacity" placeholder="Capacity" v-model="formDataModify.capacity">
      <select name="availability" v-model="formDataModify.availability">
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      <select name="whehterToRepair" v-model="formDataModify.whetherToRepair">
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      <input type="text" name="insurance" placeholder="Insurance" v-model="formDataModify.insurance">
      <input type="text" name="warehouse" placeholder="Warehouse" v-model="formDataModify.warehouse">
      <button type="submit">Submit</button>
    </form>
  </div>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { VueGoodTable } from "vue-good-table";
import axios from "axios";

export default {
  name: "Vehicles",
  data() {
    return {
      vehicle_number: {
        vehicle_number: 0,
      },
      formData: {
        type: "",
        capacity: 0,
        availability: "",
        whehterToRepair: "",
        insurnace: "",
        warehouse: "",
      },
      formDataModify: {
        vehicle_number: 0,
        type: "",
        capacity: 0,
        availability: "",
        whehterToRepair: "",
        insurnace: "",
        warehouse: "",
      },
      vehiCols: [
        {
          label: "Vehicle",
          field: "vehicle_number",
          filterable: true
        },
        {
          label: "Type",
          field: "vehicle_type",
          filterable: true
        },
        {
          label: "Capacity",
          field: "vehicle_maxcapacity",
          filterable: true
        },
        {
          label: "Availability",
          field: "vehicle_availability",
          filterable: true
        },
        {
          label: "WhetherToRepair",
          field: "vehicle_whetherToRepair",
          filterable: true
        },
        {
          label: "Insurance",
          field: "insurance_number",
          filterable: true
        },
        {
          label: "Warehouse",
          field: "warehouse_region",
          filterable: true
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
