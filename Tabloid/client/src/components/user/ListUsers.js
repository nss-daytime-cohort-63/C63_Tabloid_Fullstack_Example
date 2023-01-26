import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import User from "./User";


const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUserProfiles()
            .then(usersData => {
                setUsers(usersData)
            })
    }, []);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>Name</th>
                        <th>User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => <User key={user.id} user={user} />)
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListUsers;