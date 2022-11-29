import React from 'react';
import s from './Main.module.css';
import {Navigation} from "../Navigation/Navigation";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Main = () => {
    return (
        <>
            <div className={s.header}>
                <h1 className={s.h1}>Victory</h1>
            </div>

            <div className={s.content_section}>
                <Navigation/>
                <main className={s.main_content}>
                    <Outlet/>
                </main>
            </div>
            <ToastContainer />
        </>
    );
};


