<template>
  <div>
    <h1>Employees</h1>
    <div id="tableHold4">
      <vue-good-table
        class="table"
        title="Employees"
        :columns="empCols"
        :rows="employees_data"
        :globalSearch="true"
        :paginate="true"
        :perPage="10"
      >
      </vue-good-table>
    </div>
    <button v-on:click="helloworld">Refresh</button>

  <div>
    <h2>Add a new Employee</h2>
    <form id="add_form" @submit.prevent="processForm">
      <input type="text" name="name" placeholder="Name" v-model="formData.name">
      <input type="text" name="contact" placeholder="Contact" v-model="formData.contact">
      <input type="text" name="address" placeholder="Address" v-model="formData.address">
      <select name="position" v-model="formData.position">
        <option value="Manager">Manager</option>
        <option value="Driver">Driver</option>
      </select>
       <select name="rank" v-model="formData.rank">
        <option value="High">High</option>
        <option value="Mid">Mid</option>
        <option value="Low">Low</option>
      </select>
      <input type="number" name="payroll" placeholder="Payroll($)" v-model="formData.payroll">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Delete an Employee</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="id" placeholder="ID" v-model.number="id.id">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Modify an Employee</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="number" name="id" placeholder="ID" v-model="formDataModify.id">
      <input type="text" name="name" placeholder="Name" v-model="formDataModify.name">
      <input type="text" name="contact" placeholder="Contact" v-model="formDataModify.contact">
      <input type="text" name="address" placeholder="Address" v-model="formDataModify.address">
      <select name="position" v-model="formDataModify.position">
        <option value="Manager">Manager</option>
        <option value="Driver">Driver</option>
      </select>
      <select name="rank" v-model="formDataModify.rank">
        <option value="High">High</option>
        <option value="Mid">Mid</option>
        <option value="Low">Low</option>
      </select>
      <input type="number" name="payroll" placeholder="Payroll($)" v-model="formDataModify.urgency">
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
  name: "Employees",
  data() {
    return {
        id: {
        id: 0,
      },
      formData: {
        name: "",
        contact: "",
        address: "",
        position: "",
        rank: "",
        payroll: 0,
      },
      formDataModify: {
        id: 0,
        name: "",
        contact: "",
        address: "",
        position: "",
        rank: "",
        payroll: 0,
      },
      employees_data: [],
      empCols: [
        {
          label: "ID",
          field: "employee_id",
          filterable: true
        },
        {
          label: "Name",
          field: "employee_name",
          filterable: true
        },
        {
          label: "Contact",
          field: "employee_contact",
          filterable: true
        },
        {
          label: "Address",
          field: "employee_address",
          filterable: true
        },
        {
          label: "Position",
          field: "employee_position",
          filterable: true
        },
        {
          label: "Rank",
          field: "employee_rank",
          filterable: true
        },
        {
          label: "Payroll($)",
          field: "employee_payroll",
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
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/employees", this.formData)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormDel: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.id))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/employees" + "?id=" + this.id.id)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormMod: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formDataModify))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.put("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/employees", this.formDataModify)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    render: function() {
      axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/employees")
      .then(response => {
        console.log(">>>employees");
        console.log(response.data);
        this.employees_data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
