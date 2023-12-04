import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    age: 0,
    address: "",
  });

  function updateUserhandler(type, e) {
    setUser((prevState) => ({
      ...prevState,
      [type]: e.target.value.trim(),
    }));
  }

  console.log(user);

  async function submitUserHandler(e) {
    e.preventDefault();
    console.log(user);

    await axios
      .post("http://localhost:5000/users/add", user)
      .then((response) => {
        setUser({
          username: "",
          email: "",
          age: 0,
          address: "",
        });

        return response.data;
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={submitUserHandler}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={user.username}
            onChange={(e) => updateUserhandler("username", e)}
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            required
            className="form-control"
            value={user.email}
            onChange={(e) => updateUserhandler("email", e)}
          />
        </div>
        <div className="form-group">
          <label>Age: </label>
          <input
            type="number"
            className="form-control"
            value={user.age}
            onChange={(e) => updateUserhandler("age", e)}
          />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input
            type="text"
            className="form-control"
            value={user.address}
            onChange={(e) => updateUserhandler("address", e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
