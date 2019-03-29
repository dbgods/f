<template>
    <div>
        <h1>Statistics</h1>
        <div>
            <h2>Aggregation</h2><br>
            <p>Average Salary of each type of Employee</p>
            <vue-good-table
            class="table"
            title="Salary"
            :columns="salary_cols"
            :rows="salary_data"
            :globalSearch="true"
            :paginate="true"
            :perPage="3"
            >
            </vue-good-table>
        </div>
        <div>
            <p># Complaints per Department, group by Department</p>
            <vue-good-table
            class="table"
            title="Complaints"
            :columns="complains_cols"
            :rows="complains_data"
            :globalSearch="true"
            :paginate="true"
            :perPage="3"
            >
            </vue-good-table>
        </div>

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
            salary_cols: [
                {
                    label: "Number of Employees",
                    field: "Number of Employees"
                },
                {
                    label: "Average Salary ($)",
                    field: "Average Salary"
                },
                {
                    label: "Employee Type",
                    field: "Employee Type"
                }, 
            ],
            salary_data: [],
            complains_data: [],
            complains_cols: [
                {
                    label: "# Complaints",
                    field: "countresult"
                },{
                    label: "Department",
                    field: "departmentinvolved"
                },
            ],
        }
    },
    created() {
        console.log("Salary Query:")
        console.log(JSON.stringify(this.selection))
        axios.defaults.headers.common['x-requested-with'] = 'local';
        axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/special/salary")
        .then(response => {
            console.log(JSON.stringify(response.data));
            this.salary_data = response.data;
        }).catch(function (error) {
            console.log(error);
        });
        // Complaints
        console.log(JSON.stringify(this.selection))
        axios.defaults.headers.common['x-requested-with'] = 'local';
        axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/special/complain")
        .then(response => {
            console.log(JSON.stringify(response.data));
            this.complains_data = response.data;
        })
    },
    methods: {
    }
};
</script>