import React, { useState } from "react"
import { useHistory } from "react-router";

export const NewWorkoutForm = () => {

    const [workoutEntry, updateWorkout] = useState({
        date:0,
        description: "",
        timeSpent: 0
    });

    const history = useHistory()

    // below is the object that we want to send to our API
    const saveWorkout = (event) => {
        event.preventDefault()

        const newWorkout = {
            date:workoutEntry.date,
            description: workoutEntry.description,
            timeSpent: workoutEntry.timeSpent,
            userId: parseInt(localStorage.getItem("gainz_user"))
           
           
        }


        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newWorkout)   //send body of the request can only send strings so must strigify 
        }
        return fetch("http://localhost:8088/workoutEntries", fetchOption)
            .then(() => {
                history.push("/workouts") //push to browser history and take user to tickets
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Workout Entry </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Date:</label>
                    <input type="date"
                        onChange={
                            (evt) => {
                                const copy = { ...workoutEntry }
                                copy.date = evt.target.value
                                updateWorkout(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Details of Workout (sets x reps) "
                        onChange={
                            (evt) => {
                                const copy = { ...workoutEntry } //creates a copy of state 
                                copy.description = evt.target.value
                                updateWorkout(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Total time working out: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form"
                        placeholder="Mins Spent  "
                        onChange={
                            (evt) => {
                                const copy = { ...workoutEntry } //creates a copy of state 
                                copy.timeSpent = evt.target.value
                                updateWorkout(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            
            <button onClick={saveWorkout} className="btn btn-primary" >
                Submit Workout
            </button>
        </form>
    )
}
