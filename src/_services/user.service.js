import { authHeader } from "../_helpers";
import axios from "axios";
export const userService = {
  login,
  logout,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  // console.log("try");
  // return user => {
  //   axios({
  //     method: "POST",
  //     url:
  //       "https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/login/",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-requested-with": "local"
  //     },
  //     body: JSON.stringify({ username, password }),
  //     crossdomain: true
  //   }).then(function(response) {
  //     console.log(response.data);
  //     // login successful if there's a jwt token in the response
  //     let user = response.data;
  //     // if (user.token) {
  //     //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     //     localStorage.setItem('user', JSON.stringify(user));
  //     // }
  //   });
  // }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}


function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`http://localhost:4000/users`, requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`http://localhost:4000/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`http://localhost:4000/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`http://localhost:4000/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
