import React, { useState } from 'react';//
//import { Details } from './details';

const Search = ({onSearh}) => {
    const [searhValue, setSearhValue] = useState('');
    const search = () =>{
        const id = `/search?q=${searhValue}`;
        onSearh(id, searhValue);
        setSearhValue('');
    }

    return (
        <div className='search'>
            <input type="text" placeholder='enter the text' value={searhValue} onChange={(e) => setSearhValue(e.target.value)} />
            <button onClick={search}>search</button>
        </div>
    );
};
export default Search;