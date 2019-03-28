<template>
  <div>
    <h1>Customers</h1>
    <div id="tableHold6">
      <vue-good-table
        class="table"
        title="Customers"
        :columns="custCols"
        :rows="customers"
        :globalSearch="true"
        :paginate="true"
        :perPage="10"
      >
      </vue-good-table>
    </div>


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
      packCols: [
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
          field: "cutsomer_creditRating",
          filterable: true
        }
      ]
    };
  },
  computed: {
    complaints: function() {
      if (
        this.$store.state.complaints == null ||
        typeof this.$store.state.complaints == "undefined"
      ) {
        return [
          {
            Customer_id: 1,
            Customer_name: "Culley",
            Customer_contact: "296-182-3160",
            Customer_address: "2781 Gulseth Center",
            Cutsomer_creditRating: 397
          }
        ];
      } else {
        return this.$store.state.complaints;
      }
    }
  },
  created() {
  },
  methods: {
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
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/customers" + "?id=" + this.id)
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
    }
  }
};
</script>
