//responsible for rendering individual entrys 

import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"

export const Entry = () => {
    const [entry, setEntry] = useState({})  // State variable for current entry object
    const { diaryId } = useParams()  // Variable storing the route parameter
    const history = useHistory()
    const [photos, setPhotos] =useState({})

    //this useEffect runs only when the entryId route param changed 
    useEffect(
        () => {
            fetch(`http://localhost:8088/diaryEntries/${parseInt(diaryId)}`)
                .then(res => res.json())
                .then((data) => {
                    setEntry(data) //sets state when data come back fro API
                })
        },
        [diaryId]  // Above function runs when the value of diaryId change 
    )

    useEffect(
        () => {
            return  fetch (`http://localhost:8088/diaryEntries/${parseInt(diaryId)}`)
            .then(res => res.json())
            .then((data) =>{
                setPhotos(data)})
        },
        [] // only run when the initial jsx rendering is complete.

    )
    const deleteEntry = () => {
        fetch(`http://localhost:8088/diaryEntries/${parseInt(diaryId)}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((data) => {
                setEntry(data)
            })
            .then(() => {
                history.push("/diary") //push to browser history and take user to tickets
            })


    }




    //Only run when initial JSX rendering is complete

    // )
    //whenever user triggers an edit construct a new object with all keys and values to replace the one stored in the API, specicy all except the id
    // const editPhoto = (changeEvent) => {
    //     const newPhotoURL = {
    //         "customerId": parseInt(localStorage.getItem("honey_customer")),
    //         "employeeId": parseInt(changeEvent.target.value),
    //         "description": entry.description,
    //         "emergency": entry.emergency,
    //         "dateCompleted": entry.dateCompleted
    //     }


    //     return fetch(`http://localhost:8088/diaryEntries/${entryId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newServiceEntryObj)
    //     })
    //         .then(() => {
    //             history.push("/serviceEntrys")
    //         })
    // }

    return (
        <>
            <h2>Entry Details </h2>
            <section className="entry">
                <div className="entry__date">Submitted on {entry.date}</div>
                <h3 className="entry__description">{entry.description}</h3>
                <p className="entry_upload"> {entry.photoURL} </p>
                <button onClick={deleteEntry} className="request__delete"
                    id="request--${diaryEntries.id}">
                    Delete
                </button>
            </section>
        </>
    )
}