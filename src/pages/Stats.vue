<template>
    <div>
        <h1>In Progress..</h1>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { VueGoodTable } from "vue-good-table";
import axios from "axios";

export default {
    name: "Stats",
    data() {
        return {
            projection: {
                table: "",
                column: "",
            },
            projection_data: [],
            projection_cols: [
            ],
            selection_data: [],
            selection_cols: [
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
                label: "Max Capacity",
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
      ],
            selection: {
                column: "",
                sign: "",
                condition: "",
                isNumber: "false"
            },
            join: {
                table1: "",
                table1_condition: "",
                table2: "",
                table2_condition: ""
            }
        }
    },
    computed: {

    },
    methods: {
        selectionMethod: function() {
            console.log("Selection Query")
            console.log(JSON.stringify(this.selection))
            axios.defaults.headers.common['x-requested-with'] = 'local';
            axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/special/selection", this.selection)
            .then(response => {
                console.log(JSON.stringify(response.data));
                this.selection_data = response.data;
            })
        },
        projectionMethod: function() {
            console.log("Projection Query")
            console.log(JSON.stringify(this.projection))
            this.projection_cols = [{
                    label: this.projection.column,
                    field: this.projection.column,
            }]
            axios.defaults.headers.common['x-requested-with'] = 'local';
            axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/special/projection", this.projection)
            .then(response => {
                console.log(JSON.stringify(response.data));
                this.projection_data = response.data;
            })
        }
    }
};
</script>