import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import "./DailyTracker.css"


export const DailyTracker = () => {
    const [calorieCount, updateCalorieCount] = useState([])
    const [workoutTime, updateWorkoutTime] = useState([])
    const [active, setActive] = useState("")
    const history= useHistory()

    
    //useEffect() When state changes it invokes a function. like an event listener. 
    //used to watch specific state variables and define logic that should run when that state changes 
    //go get data from API and pull it into application state with fetch 
    useEffect(
        () => {
            fetch("http://localhost:8088/mealEntries?_expand=calories")
                .then(res => res.json())
                .then((data) => {
                    updateCalorieCount(data)
                })
        },
        // leave DEPENDANCY ARRAY EMPTY , or infinite loop  
        []
    )
    useEffect(
        () => {
            fetch("http://localhost:8088/workoutEntries?_expand=timeSpent")
                .then(res => res.json())
                .then((data) => {
                    updateWorkoutTime(data)
                })
        },
        // leave DEPENDANCY ARRAY EMPTY , or infinite loop  
        []
    )

    return (
        // <> fragment putting all return elements into one JSX elemne t
        <>
        Welcome {DailyTracker.userId}
        <section className="dailyTrak">
        <div>
            <h2 className="dailyTrakHeader "> Daily Tracker </h2>
        </div>
        <div>
            Current Calorie intake: 
             
        </div>
        <button onClick={()=> history.push("/meals/create")}> Add a New Meal  </button>
        <div>
            Today's Workout Time: 

        </div>
        <button onClick={()=> history.push("/workouts/create")}> Add a New Workout  </button>
       
        </section>    
            {active}
        
            {/* {
                //iterate meals and convert object to JXS 
                mealEntries.map(
                    (mealObj) => {
                        return <p key= {`meal--${mealObj.id}`}> <div> Date: {mealObj.date} </div> {mealObj.description}. This meals has a total of {mealObj.calories} calories.  
                        </p>
                    }
                )
            } */}
        </>
    )
}