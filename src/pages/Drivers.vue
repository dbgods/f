<template>
  <div>
    <h1>Drivers</h1>
    <div id="tableHold3">
      <vue-good-table
        class="table"
        title="Drivers"
        :columns="driCols"
        :rows="drivers_data"
        :globalSearch="true"
        :paginate="true"
        :perPage="10"
      >
      </vue-good-table>
    </div>
    <button v-on:click="helloworld">Refresh</button>


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
      <input type="number" name="payroll" placeholder="Payroll ($)" v-model="formData.payroll">
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
      <select name="availability" v-model="formData.availability">
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      <input type="text" name="insurance" placeholder="Insurance" v-model="formData.insurance">
      <input type="text" name="warehouse" placeholder="Warehouse" v-model="formData.warehouse">
      <button type="submit">Submit</button>
    </form>
  </div>

  <div>
    <h2>Delete a Driver</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="id" placeholder="ID" v-model.number="id.id">
      <button type="submit">Submit</button>
    </form>
  </div>

  <div>
    <h2>Modify a Driver</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="text" name="name" placeholder="Name" v-model="formDataModify.name">
      <input type="text" name="address" placeholder="Address" v-model="formDataModify.address">
      <input type="text" name="contact" placeholder="Contact" v-model="formDataModify.contact">
      <select name="rank" v-model="formDataModify.rank">
        <option value="High">High</option>
        <option value="Mid">Mid</option>
        <option value="Low">Low</option>
      </select>
      <input type="number" name="payroll" placeholder="Payroll ($)" v-model="formDataModify.payroll">
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
      <select name="availability" v-model="formDataModify.availability">
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
  name: "Drivers",
  data() {
    return {
        id: {
        id: 0,
      },
      formData: {
        name: "",
        address: "",
        contact: "",
        rank: "",
        payroll: 0,
        licensenumber: 0,
        vehicle: 0,
        type: "",
        capacity: 0,
        availability: "",
        insurance: "",
        warehouse: "",

      },
      formDataModify: {
        name: "",
        address: "",
        contact: "",
        rank: "",
        payroll: 0,
        licensenumber: 0,
        vehicle: 0,
        type: "",
        capacity: 0,
        availability: "",
        insurance: "",
        warehouse: "",
      },
      drivers_data: [],
      driCols: [
        {
          label: "ID",
          field: "employee_id",
          filterable: true,
          type: "number",
          sortable: true
        },
        {
          label: "Name",
          field: "employee_name",
          filterable: true
        },
        {
          label: "Address",
          field: "employee_address",
          filterable: true
        },
        {
          label: "Contact",
          field: "employee_contact",
          filterable: true
        },
        {
          label: "Rank",
          field: "employee_rank",
          filterable: true
        },
        {
          label: "Payroll ($)",
          field: "driver_id",
          filterable: true,
          type: "number"
        },
        {
          label: "License",
          field: "license_number",
          filterable: true
        },
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
          filterable: true,
          type: "number"
        },
        {
          label: "Availability",
          field: "vehicle_availability",
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
  },
  created() {
    this.render()
  },
  methods: {
    helloworld: function() {
      this.render()
    },
    processForm: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formData))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/drivers", this.formData)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormDel: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.id))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/drivers" + "?id=" + this.id.id)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormMod: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formDataModify))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.put("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/drivers", this.formDataModify)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    render: function() {
      axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/drivers")
      .then(response => {
        console.log(">>>drivers");
        console.log(response.data);
        this.drivers_data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
