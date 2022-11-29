import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Navigation.module.css';

export const Navigation = () => {
    const navLinks = [
        {
            id: 1,
            to: "/",
            value: "Dashboard"
        },
        {
            id: 2,
            to: "/add",
            value: "Add user"
        }
    ]
    return (
        <nav className={s.container}>
            {navLinks.map((link) => {
                return (
                    <NavLink key={link.to} to={link.to} end
                             className={({isActive}) => (isActive ? s.active : undefined)}
                    >
                        {link.value}
                    </NavLink>
                )
            })}
        </nav>
    );
};


