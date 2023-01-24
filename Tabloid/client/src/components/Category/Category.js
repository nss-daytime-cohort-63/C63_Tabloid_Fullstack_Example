const Category = ({ cat }) => {
    return (
        <tr>
            <td>{cat.id}</td>
            <td>{cat.name}</td>
        </tr>
    )
}

export default Category