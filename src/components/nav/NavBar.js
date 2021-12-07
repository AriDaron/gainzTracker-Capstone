// this module is responsible for building nav bar to utilize reat router library we installed 


import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/meals">Meal Trak </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/gymTrak">Gym Trak </Link>
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
    )
}
