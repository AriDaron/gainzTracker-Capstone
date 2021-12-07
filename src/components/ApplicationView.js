// responsibility to determine which view of app should be renedered depending on what URL in browser is 
//works in tandem with NavBar
//listen for URL to change , when it does change evaluate each route , whichever matches will render


import React from "react";
import { Route } from "react-router";
import { MealEntryList } from "./meals/MealList";
import { NewMealForm } from "./meals/NewMealEntryForm";


export const ApplicationView = () => {

    return (
        <>
            <h1> Gainz Tracker </h1>
            <Route exact path="/meals">
                <MealEntryList />
            </Route>
            <Route exact path="/meals/create">
                <NewMealForm />
            </Route>



        </>
    )


}



//need react router  dom 3rd party
//need Link component to define anchor tags, this broadcasts message that URL has changed 
//Route component listens for that event then displays the appropriate component