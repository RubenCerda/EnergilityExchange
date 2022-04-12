import axios from 'axios';
import { IUser, IUserNewPassword } from '../model/IUser';


const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/Login`

export async function getAllUsers() {
    try {
        const responce = await axios.get(baseUrl + '/GetAllUsers')
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function getUserById(id: number) {
    try {
        const responce = await axios.get(baseUrl + 'User/' + id)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function postUser(newUser: IUser) {
    try {
        const responce = await axios.post(baseUrl + '/CreateNewUser', { ...newUser })
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function postRecoverPassword(email: string) {
    try {
        const responce = await axios.get(baseUrl + '/RecoveryPassword?Email=' + email)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function postNewPassword(newPassword: IUserNewPassword) {
    try {
        const responce = await axios.post(baseUrl + '/UpdatePassword', { ...newPassword })
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function putUser(id: number, User: IUser) {
    try {
        const responce = await axios.put(baseUrl + 'user/' + id, { ...User })
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function deleteUser(id: number) {
    try {
        const responce = await axios.delete(baseUrl + 'user/' + id)
        return responce.data
    } catch (error) {
        throw error
    }
}