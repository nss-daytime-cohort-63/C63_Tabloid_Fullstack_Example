import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { getAllUserProfiles } from "../../modules/userProfileManager";


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
                        users.map(user => {
                            return <tr key={user.id}>
                                <td><Link to={`${user.id}`}>{user.displayName}</Link></td>
                                <td>{user.fullName}</td>
                                <td>{user.userType.name}</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListUsers;