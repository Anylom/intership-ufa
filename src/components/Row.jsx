import React from 'react';
import Cell from './Cell.jsx';

const Row = ({ rowData, filter, onClick }) => {
    return (
        <tr onClick={onClick}>
            {filter.map((column, index) => (
                <Cell key={index}
                    data={column === 'address' ? `${rowData.address.city}, ${rowData.address.address}` : 
                        column === 'firstName' ? `${rowData.firstName} ${rowData.lastName}` : 
                        rowData[column]} />
            ))}
        </tr>
    );
};
export default Row;