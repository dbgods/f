<template>
    <div>
        <h1>Custom Queries</h1>
        <div>
            <h2>Custom Selection (Vehicles)</h2>
            <vue-good-table
            class="table"
            title="Custom Selection"
            :columns="selection_cols"
            :rows="selection_data"
            :globalSearch="true"
            :paginate="true"
            :perPage="10"
            >
            </vue-good-table>
            <p>Select Column, Inequality & Condition</p>
            <form @submit.prevent="selectionMethod">
                <select name="column" v-model="selection.column">
                    <option value="vehicle_number">Number</option>
                    <option value="vehicle_type">Customer</option>
                    <option value="vehicle_maxcapacity">Max Capacity</option>
                    <option value="vehicle_availability">Availablity</option>
                    <option value="vehicle_whethertorepair">Whether to Repair</option>
                    <option value="insurance_number">Insurance No.</option>
                    <option value="warehouse_region">Warehouse Region</option>
                </select>
                <select name="ineq" v-model="selection.sign">
                    <option value="=">Equals</option>
                    <option value="!=">Not Equals</option>
                    <option value=">">More Than</option>
                    <option value="<">Less Than</option>
                </select>
                <input type="text" name="where1" placeholder="Condition" v-model="selection.condition">
                <input type="checkbox" name="vehicle" value="true" v-model="selection.isNumber">Is Number?<br>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div>
            <h2>Custom Projection (One Column)</h2>
            <vue-good-table
            class="table"
            title="Custom Projection"
            :columns="projection_cols"
            :rows="projection_data"
            :globalSearch="true"
            :paginate="true"
            :perPage="10"
            >
            </vue-good-table>
            <p>Select Table & Column</p>
            <form @submit.prevent="projectionMethod">
                <select name="table" v-model="projection.table">
                    <option value="complaint">Complaint</option>
                    <option value="customer">Customer</option>
                    <option value="driver">Driver</option>
                    <option value="employee">Employee</option>
                    <option value="insurance">Insurance</option>
                    <option value="manager">Manager</option>
                    <option value="package">Package</option>
                    <option value="receiver">Receiver</option>
                    <option value="sender">Sender</option>
                </select>
                <input type="text" name="column" placeholder="Column Name" v-model="projection.column">
                <button type="submit">Submit</button>
            </form>
            
        </div>
        <div>
            <h2>Custom Join</h2>
            <!-- <vue-good-table
            class="table"
            title="Custom Join"
            :columns="empCols"
            :rows="employees"
            :globalSearch="true"
            :paginate="true"
            :perPage="10"
            >
            </vue-good-table> -->
            <p>Table 1 & Join Condition</p>
            <form>
                <select name="table1" v-model="join.table1">
                    <option value="complaint">Complaint</option>
                    <option value="customer">Customer</option>
                    <option value="driver">Driver</option>
                    <option value="employee">Employee</option>
                    <option value="insurance">Insurance</option>
                    <option value="manager">Manager</option>
                    <option value="package">Package</option>
                    <option value="receiver">Receiver</option>
                    <option value="sender">Sender</option>
                </select>
                <input type="text" name="where1" placeholder="Join Column" v-model="join.table1_joincondition">

                <p>Table 2 & Join Condition</p>
                <select name="table2" v-model="join.table2">
                    <option value="complaint">Complaint</option>
                    <option value="customer">Customer</option>
                    <option value="driver">Driver</option>
                    <option value="employee">Employee</option>
                    <option value="insurance">Insurance</option>
                    <option value="manager">Manager</option>
                    <option value="package">Package</option>
                    <option value="receiver">Receiver</option>
                    <option value="sender">Sender</option>
                </select>
                <input type="text" name="where2" placeholder="Join Column" v-model="join.table2_joincondition">    
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
    name: "Custom",
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