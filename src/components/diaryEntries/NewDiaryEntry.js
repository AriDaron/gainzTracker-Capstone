import axios from "axios";
import React, { useState } from "react"
import { useHistory } from "react-router";
export const DiaryEntryForm = () => {

    const [imageSelected, setImageSelected] = useState("");

    const uploadImage = () => {
        //this obj holds all data from the form thats going to be uploaded to cloudinary 
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "ylnpx97f") //pass the upload preset to make sure its actually sending 
        
        // axios.post request sends upload to this specific route 
        axios.post(
            "https://api.cloudinary.com/v1_1/aridaron/image/upload",
            formData
        ).then((response) => {
            console.log(response); 
        });
    };

    const [diaryEntry, updateDiary] = useState({
        date: 0,
        description: "",
        photoURL: "",
        userId: 1
        

    });

    const history = useHistory()

    // below is the object that we want to send to our API
    const saveDiary = (event) => {
        event.preventDefault()

        const newDiary = {
            date: diaryEntry.date,
            description: diaryEntry.description,
            photoURL: diaryEntry.photoURL,
            userId: parseInt(localStorage.getItem("gainz_user"))


        }


        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDiary)   //send body of the request can only send strings so must strigify 
        }
        return fetch("http://localhost:8088/diaryEntries", fetchOption)
            .then(() => {
                history.push("/diary") //push to browser history and take user to diary list 
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Diary Entry </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Date:</label>
                    <input type="date"
                        onChange={
                            (evt) => {
                                const copy = { ...diaryEntry }
                                copy.date = evt.target.value
                                updateDiary(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Reflection:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How are you feeling? "
                        onChange={
                            (evt) => {
                                const copy = { ...diaryEntry } //creates a copy of state 
                                copy.description = evt.target.value
                                updateDiary(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Progress Photo Upload: </label>
                    <input
                        required autoFocus
                         type="file" onChange={(event) => {
                            setImageSelected(event.target.files[0]);
                        }} //this onChange  creates a function that grabs the file we're working with  with and stores into an event ekement 
                        className="url"
                        placeholder="Photo URL"
                        onChange={
                            (evt) => {
                                const copy = { ...diaryEntry } //creates a copy of state 
                                copy.photoURL = evt.target.value
                                updateDiary(copy) //make the copy the new state 
                            }
                        } />
                    {/* <button onClick={uploadImage}>Upload Image </button> */}
                </div>
            </fieldset>

            <button onClick={saveDiary} className="btn btn-primary" >
                Submit Diary
            </button>
        </form>
    )
}
