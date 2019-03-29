<template>
  <div>
    <h1>Vehicles</h1>
    <div id="tableHold">
      <vue-good-table
        class="table"
        title="Packages"
        :columns="vehicleCols"
        :rows="vehicles_data"
        :globalSearch="true"
        :paginate="true"
        :perPage="3"
      >
      </vue-good-table>
    </div>
    <button v-on:click="helloworld">Refresh</button>

  <div>
    <h2>Add a new Vehicle</h2>
    <form @submit.prevent="processForm">
      <input type="text" name="type" placeholder="Type" v-model="formData.type">
      <input type="number" name="maxcapacity" placeholder="Max Capacity" v-model.number="formData.maxcapacity">
      <input type="text" name="warehouse_region" placeholder="Warehouse Region" v-model="formData.warehouseregion">
      <p>Availability: {{ availability }}</p>
      <select name="whethertorepair" v-model="formData.availability">
      <option selected="selected" value="true">True</option>
      <option value="false">False</option>
      </select>
      <p>Repair Status Selected: {{ whethertorepair }}</p>
      <select name="whethertorepair" v-model="formData.whethertorepair">
      <option selected="selected" value="true">True</option>
      <option value="false">False</option>
      </select>
      <p>Insurance:</p><br>
      <input type="text" name="insurance_number" placeholder="Insurance No." v-model="insuranceForm.insurance_number">
      <select name="whethertorepair" v-model="insuranceForm.insurance_coverage">
      <option selected="selected" value="Full">Full</option>
      <option value="Partial">Partial</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Delete a Vehicle</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="text" name="vehiclenumber" placeholder="Vehicle No" v-model="vehicleno.number">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <h2>Modify a Vehicle</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="text" name="number" placeholder="Vehicle No." v-model="formDataModify.number">
      <input type="text" name="type" placeholder="Type" v-model="formDataModify.type">
      <input type="number" name="maxcapacity" placeholder="Max Capacity" v-model.number="formDataModify.maxcapacity">
      <input type="text" name="warehouse_region" placeholder="Warehouse Region" v-model="formDataModify.warehouseregion">
      <p>Availability: {{ availability }}</p>
      <select name="whethertorepair" v-model="formDataModify.availability">
      <option selected="selected" value="true">True</option>
      <option value="false">False</option>
      </select>
      <p>Repair Status Selected: {{ whethertorepair }}</p>
      <select name="whethertorepair" v-model="formDataModify.whethertorepair">
      <option selected="selected" value="true">True</option>
      <option value="false">False</option>
      </select>
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
  data() {
      return {
        vehicles_data: [],
        vehicleno: {
          number: ""
        },
        insuranceForm: {
          insurance_number: "",
          insurance_coverage: "",
        },
        formDataModify: {
          number: "",
          type: "",
          maxcapacity: 0,
          availability: "",
          whethertorepair: "",
          insurancenumber: "",
          warehouseregion: "",
        },
        formData: {
          number: "",
          type: "",
          maxcapacity: 0,
          availability: "",
          whethertorepair: "",
          insurancenumber: "",
          warehouseregion: "",
        },
        vehicleCols: [
        {
          label: "Vehicle No.",
          field: "vehicle_number",
          filterable: true
        },
        {
          label: "Type",
          field: "vehicle_type",
          filterable: true
        },
        {
          label: "Status",
          field: "vehicle_maxcapacity",
          filterable: true
        },
        {
          label: "Availability",
          field: "vehicle_availability",
          filterable: true
        },
        {
          label: "Needs Repair?",
          field: "vehicle_whethertorepair",
          filterable: true
        },
        {
          label: "Insurance No.",
          field: "insurance_number",
          filterable: true
        },
        {
          label: "Warehouse",
          field: "warehouse_region",
          filterable: true
        }
      ]
      }
  },
  computed: {
    whethertorepair: function() {
      if (this.formData.whethertorepair == "true") {
        this.formData.whethertorepair = true;
        return "True"
      } else {
        this.formData.whethertorepair = false;
        return "False"
      }
      console.log(JSON.stringify(this.formData))
    },
    availability: function() {
      if (this.formData.availability == "true") {
        this.formData.availability = true;
        return "True"
      } else {
        this.formData.availability = false;
        return "False"
      }
      console.log(JSON.stringify(this.formData))
    },
    vehicles: function() {
      if (
        this.$store.state.vehicles == null ||
        typeof this.$store.state.vehicles == "undefined"
      ) {
        return [
          {
            vehicle_number: 1,
            vehicle_type: "SUV",
            vehicle_maxcapacity: 15,
            vehicle_availability: "True",
            vehicle_whetherToRepair: "False",
            insurance_number: "38-198-0818",
            warehouse_region: "A03"
          }
        ];
      } else {
        return this.$store.state.vehicles;
      }
    }
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
      console.log(JSON.stringify(this.insuranceForm))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/vehicles/insurance", this.insuranceForm)
      .then(response => {
        console.log(JSON.stringify(response.data));
        console.log("Now Creating Vehicle")
        this.formData.insurancenumber = this.insuranceForm.insurance_number;
        return axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/vehicles/", this.formData)
      }).then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormDel: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.trackingNo))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/vehicles" + "?number=" + this.vehicleno.number)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormMod: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formDataModify))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.put("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/vehicles", this.formDataModify)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    render: function() {
      axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/vehicles")
      .then(response => {
        console.log(">>>vehicles");
        console.log(response.data);
        this.vehicles_data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
