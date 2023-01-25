import { getToken } from "./authManager"

const _apiUrl = "/api/category"

// The pagination implementation is not required to use this function. If not included, it will still return the following DTO:
/* 
    {
        categories: [{category}, {category}],
        total: int?
    }
*/
// usePagination (false) = fetch ALL categories at once
// usePagination (true) = fetch ALL categories, 10 at a time, with the defined offset
export const getAllCategories = (usePagination, offset) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}?usePagination=${usePagination}${(offset ? `&offset=${offset}` : ``)}`, { // If offset is provided, add query 
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const addCategory = (categoryName) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: categoryName })
        })
    })
}