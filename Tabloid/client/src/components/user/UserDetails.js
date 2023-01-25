import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getUserDetailsById } from "../../modules/userProfileManager";


const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetailsById(id)
            .then(userData => {
                setUser(userData)
            })
    }, [])

    return (
        <>
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{user.fullName}</td>
                    </tr>
                    <tr>
                        {user.imageLocation ? <td><img alt="profile picture" src={user.imageLocation}></img></td>
                            : <td><img src="https://www.shutterstock.com/image-vector/default-avatar-profile-social-media-260nw-1920331226.jpg"></img></td>}
                    </tr>
                    <tr>
                        <th>Display Name</th>
                        <td>{user.displayName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Creation Date</th>
                        <td>{user.createDateTime}</td>
                    </tr>
                    <tr>
                        <th>User Role</th>
                        <td>{user.userType?.name}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default UserDetails;