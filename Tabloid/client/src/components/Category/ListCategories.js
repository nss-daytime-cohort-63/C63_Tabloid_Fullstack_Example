import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Table } from "reactstrap"
import { getAllCategories } from "../../modules/categoryManager"
import Pagination from "../Partials/Pagination"
import Category from "./Category"

const ListCategories = () => {
    const [categories, setCategories] = useState([]),
        [offset, setOffset] = useState(0),
        [total, setTotal] = useState(0),
        [increment] = useState(10),
        navigate = useNavigate()

    useEffect(() => {
        getAllCategories(true, offset)
            .then(data => {
                setCategories(data.categories)
                setTotal(data.total)
            })
    }, [offset])

    return (
        <>
            <h2>Categories</h2>
            <Button color="primary" onClick={() => navigate("new")}>Create</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(c => <Category key={`category--${c.id}`} cat={c} />)}
                </tbody>
            </Table>
            <Pagination total={total} increment={increment} offset={offset} setOffset={setOffset} />
        </>
    )
}

export default ListCategories