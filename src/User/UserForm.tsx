import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import s from './UserForm.module.css';
import {Input} from "../Components/Input";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {createUserAction, resetCreateListStatus, updateUserAction} from "./UserSlice";
import {ApiStatus, IUpdateUserActionProps, IUserForm} from "./User.type";
import {RootState} from "../redux/store";
import {useParams} from "react-router-dom";
import {toastError} from "../Components/ToastifyConfig";

interface IProps {
    isEditForm?: boolean
}

export const UserForm = (props: IProps) => {
    const {isEditForm} = props;
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [sex, setSex] = useState("");

    const params = useParams();
    const userIdToEdit = useRef(parseInt(params.id || ""));

    const {list} = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        if (isEditForm && userIdToEdit.current) {
            const userData = list.filter(x => x.id === userIdToEdit.current);

            if (userData.length) {
                setName(userData[0].name);
                setSurname(userData[0].surname);
                setPhone(userData[0].phone);
                setEmail(userData[0].email);
                setSex(userData[0].sex);
            }
        }

    }, [isEditForm])

    const {createUserFormStatus, updateUserFormStatus} = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data: IUserForm = {name, surname, phone, email, sex};

        if (name && surname && phone && email && sex) {
            if (isEditForm) {
                const dirtyFormData: IUpdateUserActionProps = {id: userIdToEdit.current, data}
                dispatch(updateUserAction(dirtyFormData));

            } else {
                const data: IUserForm = {name, surname, phone, email, sex};
                dispatch(createUserAction(data));
            }
        } else {
            toastError("Please fill the form")
        }

    }

    useEffect(() => {
        if (createUserFormStatus === ApiStatus.success) {
            setName("");
            setSurname("");
            setPhone("");
            setEmail("");
            setSex("");
            dispatch(resetCreateListStatus())
        }

    }, [createUserFormStatus])


    return (
        <div className={s.container}>
            <form className={s.form} onSubmit={onSubmitForm}>
                <Input label="Name" value={name} type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value)
                }
                }/>
                <Input label="Surname" value={surname} type="text"
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setSurname(e.target.value)
                       }
                       }/>
                <Input label="Phone" value={phone} type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPhone(e.target.value)
                }
                }/>
                <Input label="Email" value={email} type="email"
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setEmail(e.target.value)
                       }
                       }/>
                <Input label="Sex" value={sex} type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSex(e.target.value)
                }
                }/>
                <div className={s.btn_wrapper}>
                    <input type="submit" value={isEditForm ? "Update" : "Create"}
                           disabled={createUserFormStatus === ApiStatus.loading || updateUserFormStatus === ApiStatus.loading}
                    />
                </div>
            </form>
        </div>
    );
};


