import userEvent from "@testing-library/user-event"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"


export const DiaryList = () => {
    const [diaryEntries, updatedDiary] = useState([])
    const history = useHistory()
    // const {  getCurrentUser } = useSimpleAuth()


    //useEffect() When state changes it invokes a function. like an event listener. 
    //used to watch specific state variables and define logic that should run when that state changes 
    //go get data from API and pull it into application state with fetch 
    useEffect(
        () => {
            fetch("http://localhost:8088/diaryEntries?_expand=description")
                .then(res => res.json())
                .then((data) => {
                    updatedDiary(data)
                })
        },
        // leave DEPENDANCY ARRAY EMPTY , or infinite loop  
        []
    );


    
const loggedInUser = diaryEntries.filter((diaryEntry)=> diaryEntry.userId === parseInt(localStorage.getItem("gainz_user")))
    return (
        // <> fragment putting all return elements into one JSX elemne t
        <>

            <button onClick={() => history.push("/diary/create")}> Add a New Diary Entry  </button>
           

            {
                //iterate diarys and convert object to JXS 
                loggedInUser.map(
                    (entry) => {
                        return <div key={`diary--${entry.id}`}> <br/> <Link to={`/diary/${entry.id}`}> {entry.date} {entry.photoURL ? "📸": ""} </Link> 
                        Reflection: {entry.description}. 
                       
                        
                        </div>
                    }
                )
            }
        </>
    )
}
