<template>
  <div>
    <h1>Packages</h1>
    <div id="tableHold">
      <vue-good-table
        class="table"
        title="Packages"
        :columns="packCols"
        :rows="packRows"
        :globalSearch="true"
        :paginate="true"
        :perPage="5"
      >
      </vue-good-table>
    </div>
  <div>
    <p>Add or Modify</p>
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
      packRows: [],
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
          field: "package_driverid",
          filterable: true
        }
      ]
    };
  },
  computed: {
  rows: function () { 
    return this.packRows;
  }
},
  created: function() {
    this.next()
},
  methods: {
    next() {
      console.log("Sending")
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/packages")
      .then(response => {
        console.log(response.data[0]);
        this.packRows = response.data;
      }).catch(err => {
        console.log(err);
      })
    }
},
};
</script>
