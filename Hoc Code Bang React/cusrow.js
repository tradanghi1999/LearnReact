
const CustomerRow = ({ data }) =>
    <tr>
        <td>{data.id}</td>
        <td>{data.title}</td>
        <td>{data.name}</td>
        <td>{data.phone}</td>
    </tr>

export default CustomerRow