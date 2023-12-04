import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateExcersise() {
  const [exercise, setExcercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: "",
    users: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      if (response.data.length > 1) {
        setExcercise((prevState) => {
          return {
            ...prevState,
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          };
        });
      }
    });
  }, []);

  function createExercisehandler(type, e) {
    setExcercise((prevState) => {
      return {
        ...prevState,
        [type]: e.target.value.trim(),
      };
    });
  }

  function submitFormHandler(e) {
    e.preventDefault();
    const newexercise = {
      username: exercise.username,
      description: exercise.description,
      duration: Number(exercise.duration),
      date: new Date(exercise.date),
    };

    axios
      .post("http://localhost:5000/exercises/add", newexercise)
      .then((res) => console.log(res.data));

    // const newexercise ={
    //     ...exercise
    // }

    console.log(newexercise);
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={submitFormHandler}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.usernname}
            onChange={(e) => createExercisehandler("username", e)}
          >
            {exercise.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={(e) => createExercisehandler("description", e)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={(e) => createExercisehandler("duration", e)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>

          <input
            type="date"
            onChange={(e) => createExercisehandler("date", e)}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExcersise;
