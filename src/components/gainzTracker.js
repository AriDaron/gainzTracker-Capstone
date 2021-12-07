import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationView } from "./ApplicationView.js";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";



export const GainzTracker = () => {
    return <> 
         <Route
             render={() => {
                 if (localStorage.getItem("gainz_user")) {
                     return (
                         <>
                             <NavBar />
                             <ApplicationView />
                         </>
                     );
                 } else {
                     return <Redirect to="/login" />;
                 }
             }}
         />
 
         <Route path="/login">
             <Login />
         </Route>
         <Route path="/register">
             <Register />
         </Route>
     </>
 };
 