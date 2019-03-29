<template>
    <div class="jumbotron" style="width: 100% !important; background-color: #ccd !important">
      <ul v-show="!isNotLoggedIn" style="width: 100% !important;">
        <li style="display:inline-block;margin-right:10px;">
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
              <router-link to="/" class="router">Home</router-link>
          </button>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Packages" class="router">Packages</router-link>
          </button>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Complaints" class="router">Complaints</router-link>
          </button>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Vehicles" class="router">Vehicles</router-link>
          </button>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Drivers" class="router">Drivers</router-link>
          </button>
        </li>
        <li v-show="isManager" style="display:inline-block;margin-right:10px;" >
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Employees" class="router">Employees</router-link>
          </button>
        </li>
        <li v-show="isManager" style="display:inline-block;margin-right:10px;" >
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Customers" class="router">Customers</router-link>
          </button>
        </li>
        <li v-show="isManager" style="display:inline-block;margin-right:10px;" >
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Custom" class="router">Custom</router-link>
          </button>
        </li>
        <li v-show="isManager" style="display:inline-block;margin-right:10px;" >
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/Stats" class="router">Statistics</router-link>
          </button>
        </li>
        <li style="display:inline-block;text-align:right;">
          <button type="button" name="button" style=" border-radius: 5px !important;background-color: #e8c010 !important">
          <router-link to="/login"> Logout</router-link>
          </button>
        </li>
      </ul>
        <div class="container">
            <div class="row">
                <div>
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        isManager() {
          return this.$store.state.isManager;
        },
        isNotLoggedIn() {
          return this.$store.state.notLoggedIn;
        },
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear'
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    }
};
</script>

<style media="screen">
 .button{
   border-radius: 5px !important
 }
</style>
