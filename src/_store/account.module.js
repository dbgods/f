import { userService } from '../_services';
import { router } from '../_helpers';
import axios from 'axios';
import index from '../_store';
const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        console.log("try");
        axios.defaults.headers.common['x-requested-with'] = 'local';
        axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/login",{

            "username" : username,
            "password" : password

        }).then(function (response) {
          console.log(response.data);
          // login successful if there's a jwt token in the response
          let user = response.data;

          if (user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
          }
          commit('loginSuccess', user);
          router.push('/');
        }).catch(function (error) {
          console.log(error);
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        });

//  UNCOMMENT to test get
        // axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/")
        // .then(function(response) {
        //   console.log(response);
        // })
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
      console.log("reg user");
      axios.defaults.headers.common['x-requested-with'] = 'local';
      axios.post("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/create",{

          "username" : user.username,
          "password" : user.password,
          "name" : user.name,
          "type" : user.type

      }).then(function (response) {
        console.log(response.data);
        router.push('/');
        commit('registered');
      }).catch(function (error) {
        console.log(error);
        commit('Reg_failure', error);
        dispatch('alert/error', error, { root: true });
      });
    }
};

const mutations = {
    packageGetFail() {
      console.log("oops");
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
