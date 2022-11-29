export interface IUser {
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
    sex: string
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
}

export interface IUserState {
    list: IUser[],
    listStatus: ApiStatus,
    createUserFormStatus: ApiStatus,
    updateUserFormStatus: ApiStatus
}

export interface IUserForm {
    name: string,
    surname: string,
    phone: string,
    email: string,
    sex: string
}

export interface IUpdateUserActionProps {
    id: number,
    data: IUserForm;
}
