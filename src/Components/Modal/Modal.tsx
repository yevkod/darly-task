import React from 'react';
import s from './Modal.module.css';

interface IProps {
    title: string,
    children: JSX.Element;
    onClose: () => void;
}

export const Modal = (props: IProps) => {

    const {title, children, onClose} = props;

    return (
        <div id="myModal" className={s.modal}>
            <div className={s.modal_content}>
                <span className={s.close} onClick={onClose}>&times;</span>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};
