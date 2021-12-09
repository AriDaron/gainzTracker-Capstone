import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"


export const DiaryList = () => {
    const [diaryEntries, updatedDiary] = useState([])
    const [active, setActive] = useState("")
    const history= useHistory()
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
    )

     const deleteRequest = (id) => {
        return fetch(`http://localhost:8088/${id}`, { method: "DELETE" })
            
    }
    ;
    

    return (
        // <> fragment putting all return elements into one JSX elemne t
        <>
       
            <button onClick={()=> history.push("/diary/create")}> Add a New Diary Entry  </button>
            {active}
        
            {
                //iterate diarys and convert object to JXS 
                diaryEntries.map(
                    (diaryObj) => {
                        return <p key= {`diary--${diaryObj.id}`}> <div> 
                            <Link to={`/diary/${diaryObj.id}`}> {diaryObj.date} </Link> </div> Reflection: {diaryObj.description}. 
                        <div>Photo Upload:  </div>
                        <button onClick={deleteRequest} class="request__delete"
                id="request--${diaryEntries.id}">
            Delete
        </button>
                        </p>
                    }
                )
            }
        </>
    )
}
