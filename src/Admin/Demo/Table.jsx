import React from 'react'
import "./Table.css"

const Table = () => {
    return (
        <tbody className='new_table_container'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Address</td>
                </tr>
            </tbody>
        </tbody>
    )
}

export default Table