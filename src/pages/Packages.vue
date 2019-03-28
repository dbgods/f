<template>
  <div>
    <h1>Packages</h1>
    <div id="tableHold">
      <vue-good-table
        class="table"
        title="Packages"
        :columns="packCols"
        :rows="packages"
        :globalSearch="true"
        :paginate="true"
        :perPage="5"
      >
      </vue-good-table>
    </div>
  <div>
    <h2>Add a new Package</h2>
    <form id="add_form" @submit.prevent="processForm">
      <input type="text" name="content" placeholder="Content" v-model="formData.content">
      <input type="text" name="type" placeholder="Type" v-model="formData.type">
      <select name="status" v-model="formData.status">
      <option value="Loading">Loading</option>
      <option value="Out of Warehouse">Out of Warehouse</option>
      <option value="Half Way">Half Way</option>
      <option value="Missing">Missing</option>
      <option value="Delivered">Delivered</option>
    </select>
      <input type="text" name="sender_id" placeholder="Sender ID" v-model="formData.senderid">
      <input type="text" name="receiver_id" placeholder="Receiver ID" v-model="formData.receiverid">
      <input type="text" name="driver_id" placeholder="Driver ID" v-model="formData.driverid">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Delete a Package</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="trackingno" placeholder="Tracking No" v-model.number="trackingNo.trackingno">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Modify a Package</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="number" name="trackingno" placeholder="Tracking No" v-model="formDataModify.trackingno">
      <input type="text" name="content" placeholder="Content" v-model="formDataModify.content">
      <input type="text" name="type" placeholder="Type" v-model="formDataModify.type">
      <select name="status" v-model="formDataModify.status">
        <option value="Loading">Loading</option>
        <option value="Out of Warehouse">Out of Warehouse</option>
        <option value="Half Way">Half Way</option>
        <option value="Missing">Missing</option>
        <option value="Delivered">Delivered</option>
      </select>
      <input type="text" name="sender_id" placeholder="Sender ID" v-model="formDataModify.senderid">
      <input type="text" name="receiver_id" placeholder="Receiver ID" v-model="formDataModify.receiverid">
      <input type="text" name="driver_id" placeholder="Driver ID" v-model="formDataModify.driverid">
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
  name: "Packages",
  data() {
    return {
      trackingNo: {
        trackingno: 0,
      },
      formData: {
        content: "",
        type: "",
        status: "",
        senderid: "",
        receiverid: "",
        driverid: "",
      },
      formDataModify: {
        trackingno: 0,
        content: "",
        type: "",
        status: "",
        senderid: "",
        receiverid: "",
        driverid: "",
      },
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
          field: "Driver",
          filterable: true
        },
        {
          label: "Sender",
          field: "sender",
          filterable: true
        },
        {
          label: "Origin",
          field: "sender_address",
          filterable: true
        },
        {
          label: "Receiver",
          field: "receiver",
          filterable: true
        },
        {
          label: "Destination",
          field: "receiver_address",
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
  methods: {
    processForm: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formData))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/packages", this.formData)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormDel: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.trackingNo))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/packages" + "?trackingno=" + this.trackingNo)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormMod: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formDataModify))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.put("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/packages", this.formDataModify)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    }
  }
};
</script>
