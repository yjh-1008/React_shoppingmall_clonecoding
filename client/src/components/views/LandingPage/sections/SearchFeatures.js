import React,{useState} from 'react';
import {Input} from 'antd';

const {Search} = Input;

const SearchFeatures=(props)=>{

    const [searchTerm, setSearchTerm] = useState("")

    const searchHandler=(event)=>{
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return(
        <div>
            <Search
            placeholder="input search text"
            onChange={searchHandler}
            style={{width:200}}
            value={searchTerm}>


            </Search>
        </div>
    );
}

export default SearchFeatures;