<template>
  <div>
    <h1>Customers</h1>
    <div id="tableHold6">
      <vue-good-table
        class="table"
        title="Customers"
        :columns="custCols"
        :rows="customer_data"
        :globalSearch="true"
        :paginate="true"
        :perPage="10"
      >
      </vue-good-table>
    </div>
    <button v-on:click="helloworld">Refresh</button>


  <div>
    <h2>Add a new Customer</h2>
    <form id="add_form" @submit.prevent="processForm">
      <input type="text" name="name" placeholder="Name" v-model="formData.name">
      <input type="text" name="contact" placeholder="Contact" v-model="formData.contact">
      <input type="text" name="address" placeholder="Address" v-model="formData.address">
      <input type="number" name="creditRating" placeholder="CreditRating" v-model="formData.creditRating">
      <button type="submit">Submit</button>
    </form>
  </div>


  <div>
    <h2>Delete a Customer</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="id" placeholder="ID" v-model.number="id.id">
      <button type="submit">Submit</button>
    </form>
  </div>


  <div>
    <h2>Modify a Customer</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="number" name="id" placeholder="ID" v-model="formDataModify.id">
      <input type="text" name="name" placeholder="Name" v-model="formData.name">
      <input type="text" name="contact" placeholder="Contact" v-model="formData.contact">
      <input type="text" name="address" placeholder="Address" v-model="formData.address">
      <input type="number" name="creditRating" placeholder="CreditRating" v-model="formData.creditRating">
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
  name: "Customers",
  data() {
    return {
      id: {
        id: 0,
      },
      customer_data: [],
      formData: {
        name: "",
        contact: "",
        address: "",
        creditRating: 0,
      },
      formDataModify: {
        id: 0,
        name: "",
        contact: "",
        address: "",
        creditRating: 0,
      },
      custCols: [
        {
          label: "ID.",
          field: "customer_id",
          filterable: true
        },
        {
          label: "Name",
          field: "customer_name",
          filterable: true
        },
        {
          label: "Contact",
          field: "customer_contact",
          filterable: true
        },
        {
          label: "Address",
          field: "customer_address",
          filterable: true
        },
        {
          label: "CreditRating",
          field: "customer_creditrating",
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
      this.render();
    },
    processForm: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formData))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/customers", this.formData)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormDel: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.id))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/customers" + "?id=" + this.id.id)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormMod: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formDataModify))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.put("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/customers", this.formDataModify)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    render: function() {
      axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/customers")
      .then(response => {
        console.log(">>>customers");
        console.log(response.data);
        this.customer_data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
