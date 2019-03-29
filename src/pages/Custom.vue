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
            <vue-good-table
            class="table"
            title="Custom Join"
            :columns="join_cols"
            :rows="join_data"
            :globalSearch="true"
            :paginate="true"
            :perPage="10"
            >
            </vue-good-table>
            <p>Table 1, Join Condition & Selected Columns (Comma Delimited)</p>
            <form @submit.prevent="joinMethod">
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
                <input type="text" name="where1" placeholder="Join Column" v-model="join.table1_condition">
                <input type="text" name="cols1" placeholder="Column(s)" v-model="join.table1_cols">

                <p>Table 2, Join Condition & Selected Columns</p>
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
                <input type="text" name="where2" placeholder="Join Column" v-model="join.table2_condition">    
                <input type="text" name="cols1" placeholder="Column(s)" v-model="join.table2_cols">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div>
            <h2>Division</h2><br>
            <p>Division</p>
            <vue-good-table
            class="table"
            title="Division"
            :columns="division_cols"
            :rows="division_data"
            :globalSearch="true"
            :paginate="true"
            :perPage="3"
            >
            </vue-good-table>
            <form @submit.prevent="divisionMethod">
                <p>Main Table</p>
                <select name="table" v-model="division.table">
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
                <p>Divisor Table</p>
                <select name="table" v-model="division.tabledivisor">
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
                <input type="text" name="divisor" placeholder="All Column (Divisor)" v-model="division.all">
                <input type="text" name="divisor" placeholder="What to Find Column (Joiner)" v-model="division.where">
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
            division: {
                table: "",
                tabledivisor: "",
                all: "",
                where: "",
            },
            division_data: [],
            division_cols: [],
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
                table1_cols: "",
                table2: "",
                table2_condition: "",
                table2_cols: "",
            },
            join_data: [],
            join_cols: []
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
        },
        joinMethod: function() {
            console.log("Join Query")
            console.log(JSON.stringify(this.join))
            axios.defaults.headers.common['x-requested-with'] = 'local';
            axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/special/join", this.join)
            .then(response => {
                // Join Columns
                Object.keys(response.data[0]).map(x => {
                    this.join_cols.push({
                        label: x,
                        field: x
                    })
                })

                console.log(JSON.stringify(response.data));
                this.join_data = response.data;
            })
        },
        divisionMethod: function() {
            console.log("Division Query")
            console.log(JSON.stringify(this.division))
            axios.defaults.headers.common['x-requested-with'] = 'local';
            axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/special/division", this.division)
            .then(response => {
                // Join Columns
                Object.keys(response.data[0]).map(x => {
                    this.division_cols.push({
                        label: x,
                        field: x
                    })
                })

                console.log(JSON.stringify(response.data));
                this.division_data = response.data;
            })
        }
    }
};
</script>