import React, { useState, useEffect } from "react"
import { Table } from "reactstrap"
import { getAllCategories } from "../../modules/categoryManager"
import Category from "./Category"

const ListCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
    }, [])

    return (
        <>
            <h2>Categories</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(c => <Category cat={c} />)}
                </tbody>
            </Table>
        </>
    )
}

export default ListCategories