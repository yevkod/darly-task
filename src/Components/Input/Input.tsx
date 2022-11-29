import React, {ChangeEvent} from 'react';
import s from './Input.module.css';

export interface IProps {
    label: string,
    value: string | number,
    type? : string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: IProps) => {
    const {label, value, type, onChange} = props;
    return (
        <div className={s.container}>
            <label>{label}</label>
            <div>
                <input className={s.input} type={type} value={value} onChange={onChange}/>
            </div>
        </div>
    );
};


