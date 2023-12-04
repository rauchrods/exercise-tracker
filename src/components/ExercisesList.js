import React, { useEffect, useState } from "react";
import axios from "axios";

function ExercisesList() {
  const [exercises, setExcercises] = useState([]);
  const [isedit, setIsEdit] = useState(false);
  const [exercise, setExcercise] = useState({});

  useEffect(() => {
    fetchExercisesHandler();
  }, []);

  function fetchExercisesHandler() {
    axios
      .get('http://localhost:5000/exercises')
      .then((response) => {
        setExcercises(response.data);
      })
      .catch((err) => console.log(err));
  }

  function fetchExerciseByIdHandler(id) {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        setExcercise(response.data);
        setIsEdit(true);
        
      })
      .catch((err) => console.log(err));
  }

  console.log(exercise);
  function deleteExerciseHandler(id) {
    console.log(id);
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchExercisesHandler();
      })
      .catch((err) => console.log(err));
  }

  function updateExercisehandler(type, e) {
    setExcercise((prevState) => {
      return {
        ...prevState,
        [type]: e.target.value.trim(),
      };
    });
    console.log(exercise);
  }

  function submitFormHandler(e) {
    e.preventDefault();
    const updatedexercise = {
      username: exercise.username,
      description: exercise.description,
      duration: Number(exercise.duration),
      date: new Date(exercise.date),
    };

    axios
      .post(`http://localhost:5000/exercises/update/${exercise._id}`,updatedexercise)
      .then((response) => {
        console.log(response.data);  
        setIsEdit(false);
        fetchExercisesHandler();      
      })
      .catch((err) => console.log(err));

    console.log(updatedexercise);
  }

  console.log(exercises);

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {exercises.length === 0 ? (
            <tr><td>no exercises found</td></tr>
          ) : (
            exercises.map((exercise) => {
              return (
                <tr key={exercise._id}>
                  <td>{exercise.username}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.date.substring(0,10)}</td>
                  <td>
                    <button onClick={() => deleteExerciseHandler(exercise._id)}>
                      Delete
                    </button>
                    <button onClick={() => fetchExerciseByIdHandler(exercise._id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {
        isedit &&
        <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={submitFormHandler}>
          <div className="form-group">
          <label>User: </label>
            <input
              type="text"
              className="form-control"
              value={exercise.username}
              onChange={(e) => updateExercisehandler("username", e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={exercise.description}
              onChange={(e) => updateExercisehandler("description", e)}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={exercise.duration}
              onChange={(e) => updateExercisehandler("duration", e)}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
  
            <input
              type="date"
              value={exercise.date.substring(0,10)}
              onChange={(e) => updateExercisehandler("date", e)}
            />
          </div>
  
          <div className="form-group">
            <input
              type="submit"
              value="Update Exercise Log"
              className="btn btn-primary"
            />
            <button className="btn btn-danger" onClick={()=>setIsEdit(false)}>Cancel</button>
          </div>
        </form>
      </div>
      }
    </div>
  );
}

export default ExercisesList;
