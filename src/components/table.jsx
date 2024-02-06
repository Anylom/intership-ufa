import React, { useEffect, useState } from 'react';
import {Datta} from './api.js'
import Row from './Row.jsx';
import Modal from './modal.jsx';
import Search from './search.jsx';

export default function MyNTable() {
    const [result, setData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [ModalVisible, setModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState(null);  
    const [sort, setSort] = useState({key: null, direction: null});  

    
    useEffect(()=>{
        async function getData() {
            const res = await Datta({id : searchResults});
            let result = res.users;        
            if (result){
                setData(result);
            }
        } 
        getData();
    }, [searchResults])

    const columnName = {
        'firstName': 'FIO',
        'age': 'Age', 
        'gender': 'Gender', 
        'phone': 'Phone', 
        'address': 'Address'
    }
    const filter = ['firstName', 'age', 'gender', 'phone', 'address'];
    
    const openModal = (id) => {
        setSelectedId(id);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    }
    const handleSearch = (id) => {
        setSearchResults(id)
    }
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sort && sort.key === key) {
            if (sort.direction === 'ascending') {
                direction = 'descending';
            } else {
                direction = null;
            }
        }
        
        setSort({ key, direction });
    };

    return (
        <div>
        <h3>Для сортировки нажмите на название столбца</h3>
        <Search onSearh={handleSearch}/>
        <table>
            <thead>
                <tr>{filter.map((column, index) => (
                    <th key={index} onClick={() => handleSort(column)}>
                        {columnName[column]}
                        {sort && sort.key === column && (
                            sort.direction === 'ascending' ? String.fromCharCode(9650) : String.fromCharCode(9660) 
                        )}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {result && result.sort((a,b) => {
                    if (!sort) return 0;
                    const key = sort.key;
                    const direction = sort.direction === 'ascending' ? 1 : -1;
                    if (key === 'address') {
                        const adressA = `${a.address.city}, ${a.address.address}`;
                        const adressB = `${b.address.city}, ${b.address.address}`;
                        return direction * (adressA.localeCompare(adressB));
                    }
                    if (a[key]<b[key]) return -direction;
                    if (a[key]>b[key]) return direction;
                    return 0;
                }).map((rowData) => (
                    <Row key={rowData.id} rowData={rowData} filter={filter} onClick={() => openModal(rowData.id)} />
                ))}
            </tbody>
        </table>
        {ModalVisible && <Modal id={selectedId} onClose={closeModal}/>}         
        </div>
    );
}
    