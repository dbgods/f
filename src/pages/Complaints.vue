<template>
  <div>
    <h1>Complaints</h1>
    <div id="tableHold">
      <vue-good-table
        class="table"
        title="Complaints"
        :columns="packCols"
        :rows="complaints_data"
        :globalSearch="true"
        :paginate="true"
        :perPage="5"
      >
      </vue-good-table>
    </div>
    <button v-on:click="helloworld">Refresh</button>


  <div>
    <h2>Add a new Complaint</h2>
    <form id="add_form" @submit.prevent="processForm">
      <input type="text" name="info" placeholder="Info" v-model="formData.info">
      <input type="text" name="departmentinvolved" placeholder="Departmentinvolved" v-model="formData.departmentinvolved">
      <select name="type" v-model="formData.type">
      <option value="Damage">Damage</option>
      <option value="Lost">Lost</option>
      <option value="Delay">Delay</option>
      <option value="Customs">Customs</option>
      <option value="Modify">Modify</option>
    </select>
      <input type="text" name="urgency" placeholder="Urgency" v-model="formData.urgency">
      <input type="text" name="timestamp" placeholder="timestamp" v-model="formData.timestamp">
      <button type="submit">Submit</button>
    </form>
  </div>


  <div>
    <h2>Delete a Complaint</h2>
    <form id="delete_form" @submit.prevent="processFormDel">
      <input type="number" name="id" placeholder="ID" v-model.number="id.id">
      <button type="submit">Submit</button>
    </form>
  </div>


  <div>
    <h2>Modify a Complaint</h2>
    <form id="add_form" @submit.prevent="processFormMod">
      <input type="number" name="id" placeholder="ID" v-model="formDataModify.id">
      <input type="text" name="info" placeholder="info" v-model="formDataModify.info">
      <input type="text" name="departmentinvolved" placeholder="departmentinvolved" v-model="formDataModify.departmentinvolved">
      <select name="type" v-model="formDataModify.type">
        <option value="Damage">Damage</option>
        <option value="Lost">Lost</option>
        <option value="Delay">Delay</option>
        <option value="Customs">Customs</option>
        <option value="Modify">Modify</option>
      </select>
      <input type="text" name="urgency" placeholder="urgency" v-model="formDataModify.urgency">
      <input type="text" name="timestamp" placeholder="timestamp" v-model="formDataModify.timestamp">
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
  name: "Complaints",
  data() {
    return {
      id: {
        id: 0,
      },
      complaints_data: [],
      formData: {
        info: "",
        departmentinvolvend: "",
        type: "",
        urgency: "",
        timestamp: "",
      },
      formDataModify: {
        id: 0,
        info: "",
        departmentinvolved: "",
        type: "",
        urgency: "",
        timestamp: "",
      },
      packCols: [
        {
          label: "ID.",
          field: "complaint_id",
          filterable: true
        },
        {
          label: "Info",
          field: "complaint_info",
          filterable: true
        },
        {
          label: "Department Involved",
          field: "complaint_departmentinvolved",
          filterable: true
        },
        {
          label: "Type",
          field: "complaint_type",
          filterable: true
        }
      ]
    };
  },
  computed: {
  },
  created() {
    this.render();
  },
  methods: {
    helloworld: function() {
      this.render();
    },
    processForm: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formData))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/complaints", this.formData)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormDel: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.id))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.delete("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/complaints" + "?id=" + this.id.id)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    processFormMod: function() {
      console.log("Processing")
      console.log(JSON.stringify(this.formDataModify))
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.put("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/complaints", this.formDataModify)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
    },
    render: function() {
      axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/complaints")
      .then(response => {
        console.log(">>>complaints");
        console.log(response.data);
        this.complaints_data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
