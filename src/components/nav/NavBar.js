// this module is responsible for building nav bar to utilize reat router library we installed 

// import muscle from './images/muscle.png'
import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    
    
    
    
    return (
        <div className="navBar">
            <ul className="navbar">
                <li className="navbar__item active">
                    <div className="navigation__item navigation__icon">
                    </div> <Link className="navbar__link" to="/"> Home </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/meals">Meal Trak </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/workouts">Gym Trak </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/diary">Progress Diary </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="#"
                        onClick={
                            () => {
                                localStorage.removeItem("gainz_user")
                            }
                        }>
                        Logout
                    </Link>
                </li>

            </ul>
        </div>
    )
}
