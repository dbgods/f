<template>
  <div>
    <h1>Drivers</h1>
    <div id="tableHold3">
      <vue-good-table
        class="table"
        title="Drivers"
        :columns="driCols"
        :rows="drivers"
        :globalSearch="true"
        :paginate="true"
        :perPage="10"
      >
      </vue-good-table>
    </div>

    <div>
    <h2>Add a new Driver</h2>
    <form id="add_form" @submit.prevent="processForm">
      <input type="text" name="name" placeholder="Name" v-model="formData.name">
      <input type="text" name="address" placeholder="Address" v-model="formData.address">
      <input type="text" name="contact" placeholder="Contact" v-model="formData.contact">
      <select name="rank" v-model="formData.rank">
        <option value="High">High</option>
        <option value="Mid">Mid</option>
        <option value="Low">Low</option>
      </select>
      <input type="number" name="driverid" placeholder="Payroll ($)" v-model="formData.payroll">
      <input type="number" name="lincensenumber" placeholder="License" v-model="formData.licensenumber">
      <input type="number" name="vehicle" placeholder="Vehicle" v-model="formData.vehicle">
      <select name="type" v-model="formData.type">
        <option value="SUV">SUV</option>
        <option value="MiniVan">MiniVan</option>
        <option value="BigTruck">BigTruck</option>
        <option value="MediumTruck">MediumTruck</option>
        <option value="SmallTruck">SmallTruck</option>
      </select>
      <input type="number" name="capacity" placeholder="Capacity" v-model="formData.capacity">
      <input type="text" name="availability" placeholder="Availability" v-model="formData.availability">
      <input type="text" name="insurance" placeholder="Insurance" v-model="formData.insurance">
      <input type="text" name="warehouse" placeholder="Warehouse" v-model="formData.warehouse">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Delete a Package</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="id" placeholder="ID" v-model.number="ID.id">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Modify a Package</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="text" name="name" placeholder="Name" v-model="formDataModify.name">
      <input type="text" name="address" placeholder="Address" v-model="formDataModify.address">
      <input type="text" name="contact" placeholder="Contact" v-model="formDataModify.contact">
      <select name="rank" v-model="formDataModify.rank">
        <option value="High">High</option>
        <option value="Mid">Mid</option>
        <option value="Low">Low</option>
      </select>
      <input type="number" name="driverid" placeholder="Payroll ($)" v-model="formDataModify.payroll">
      <input type="number" name="lincensenumber" placeholder="License" v-model="formDataModify.licensenumber">
      <input type="number" name="vehicle" placeholder="Vehicle" v-model="formDataModify.vehicle">
      <select name="type" v-model="formDataModify.type">
        <option value="SUV">SUV</option>
        <option value="MiniVan">MiniVan</option>
        <option value="BigTruck">BigTruck</option>
        <option value="MediumTruck">MediumTruck</option>
        <option value="SmallTruck">SmallTruck</option>
      </select>
      <input type="number" name="capacity" placeholder="Capacity" v-model="formDataModify.capacity">
      <input type="text" name="availability" placeholder="Availability" v-model="formDataModify.availability">
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
