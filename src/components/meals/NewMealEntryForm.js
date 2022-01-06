import React, { useState } from "react"
import { useHistory } from "react-router";

export const NewMealForm = () => {
    const [mealTime, updateMealTime] = useState([])
    const [mealEntry, updateMeal] = useState({
        date: 0,
        mealTime: "",
        description: "",
        calories: 0
    });

    const MealTimeChoices = [
        { label: "Breakfast" },
        { label: "Lunch" },
        { label: "Snack" },
        { label: "Dinner" }
    ]
    const SaveMealTime = (e) => {
        updateMealTime(e.target.value)
    }

    const history = useHistory()

    // below is the object that we want to send to our API
    const saveMeal = (event) => {
        event.preventDefault()

        const newMeal = {
            date: mealEntry.date,
            mealTime: mealEntry.mealTime,
            description: mealEntry.description,
            calories: mealEntry.calories,
            userId: parseInt(localStorage.getItem("gainz_user"))


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
        <form className="mealForm">
            <h2 className="mealForm__title">New Meal Entry </h2>
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
            <div>
               
                <br />
                <select id="mealTime" onChange={
                            (evt) => {
                                const copy = { ...mealEntry } //creates a copy of state 
                                copy.mealTime = evt.target.value
                                updateMeal(copy)
                            }
                        }>
                <option value="⬇️ Select a meal time ⬇️"> --Select a meal time-- </option>
            {MealTimeChoices.map((mealTime) => <option key={mealTime.label}>{mealTime.label}</option>)}
                </select>
            
            
            </div>
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
