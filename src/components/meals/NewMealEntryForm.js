import React, { useState } from "react"
import { useHistory } from "react-router";

export const NewMealForm = () => {

    const [mealEntry, updateMeal] = useState({
        date:0,
        description: "",
        calories: 0
    });

    const history = useHistory()

    // below is the object that we want to send to our API
    const saveMeal = (event) => {
        event.preventDefault()

        const newMeal = {
            date:mealEntry.date,
            description: mealEntry.description,
            calories: mealEntry.calories,
           
           
        }


        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMeal)   //send body of the request can only send strings so must strigify 
        }
        return fetch("http://localhost:8088/mealEntries", fetchOption)
            .then(() => {
                history.push("/meals") //push to browser history and take user to tickets
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Meal Entry </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Date:</label>
                    <input type="date"
                        onChange={
                            (evt) => {
                                const copy = { ...mealEntry }
                                copy.date = evt.target.value
                                updateMeal(copy)
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
                        placeholder="Description of Meal "
                        onChange={
                            (evt) => {
                                const copy = { ...mealEntry } //creates a copy of state 
                                copy.description = evt.target.value
                                updateMeal(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Total Calories:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form"
                        placeholder="Number of calories "
                        onChange={
                            (evt) => {
                                const copy = { ...mealEntry } //creates a copy of state 
                                copy.calories = evt.target.value
                                updateMeal(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            
            <button onClick={saveMeal} className="btn btn-primary" >
                Submit Meal
            </button>
        </form>
    )
}
