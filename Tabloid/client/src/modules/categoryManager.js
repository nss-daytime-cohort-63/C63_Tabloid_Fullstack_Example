import { getToken } from "./authManager"

const _apiUrl = "/api/category"

export const getAllCategories = () => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/get/all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}