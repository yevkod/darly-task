import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";
import {ApiStatus, IUser} from "./User.type";
import {deleteUserAction, getUserListAction} from "./UserSlice";
import {useNavigate} from 'react-router-dom';
import {Modal} from "../Components/Modal";

export const UserList = () => {
    const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
    const {list, listStatus} = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const navigator = useNavigate();

    useEffect(() => {
        dispatch(getUserListAction());
    }, [])


    return (
        <>
            <table>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Sex</th>
                    <th>Interaction</th>
                </tr>
                {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}
                {listStatus === ApiStatus.error && (
                    <tbody>Error while loading list</tbody>
                )}


                {listStatus === ApiStatus.ideal &&
                    list.map((user: IUser, index: number) => {
                        return <tr>
                            <th>{index + 1}</th>
                            <th>{user.name}</th>
                            <th>{user.surname}</th>
                            <th>{user.phone}</th>
                            <th>{user.email}</th>
                            <th>{user.sex}</th>
                            <th>
                                <div>
                                    <input type="button" value="View" onClick={() => {
                                        setUserDataToView(user)
                                    }}/>
                                    <input type="button" value="Edit" onClick={() => {
                                        navigator(`/edit/${user.id}`)
                                    }
                                    }/>
                                    <input type="button" value="Delete" onClick={() => {
                                        dispatch(deleteUserAction(user.id))
                                    }
                                    }/>
                                </div>
                            </th>
                        </tr>
                    })}
            </table>
            {userDataToView && (
                <Modal title="Details" onClose={() => {
                    setUserDataToView(null)
                }}>
                    <div>
                        <div>
                            <label>Name : {userDataToView.name}</label>
                        </div>
                        <div>
                            <label>Surname : {userDataToView.surname}</label>
                        </div>
                        <div>
                            <label>Phone : {userDataToView.phone}</label>
                        </div>
                        <div>
                            <label>Email : {userDataToView.email}</label>
                        </div>
                        <div>
                            <label>Sex : {userDataToView.sex}</label>
                        </div>
                    </div>
                </Modal>)}
        </>
    )
};

