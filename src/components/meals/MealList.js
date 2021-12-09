import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import "./Meals.css"

export const MealEntryList = () => {
    const [mealEntries, updatedMeals] = useState([])
    const [active, setActive] = useState("")
    const history= useHistory()
    //useEffect() When state changes it invokes a function. like an event listener. 
    //used to watch specific state variables and define logic that should run when that state changes 
    //go get data from API and pull it into application state with fetch 
    useEffect(
        () => {
            fetch("http://localhost:8088/mealEntries?_expand=description")
                .then(res => res.json())
                .then((data) => {
                    updatedMeals(data)
                })
        },
        // leave DEPENDANCY ARRAY EMPTY , or infinite loop  
        []
    )

    return (
        // <> fragment putting all return elements into one JSX elemne t
        <>
       
            <button onClick={()=> history.push("/meals/create")}> Add a New Meal  </button>
            {active}
        
            {
                //iterate meals and convert object to JXS 
                mealEntries.map(
                    (mealObj) => {
                        return <p key= {`meal--${mealObj.id}`}> <div> Date: {mealObj.date} </div> {mealObj.description}. This meals has a total of {mealObj.calories} calories.  
                        </p>
                    }
                )
            }
        </>
    )
}
