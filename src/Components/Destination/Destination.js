import { Select } from '@material-ui/core';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Destination.css';

const Destination = () => {
    const [pick, setPick] = useState('');
    const [dateState, setDateState] = useState(new Date());
    const handleSearch = () => {

    }
    const searchChange = (e) => {
        setPick(e.target.value, e.target.name);
    }

    return (
        <div className="row">
            <div className="col-md-4 my-1 p-5">
                <form className="search-content" onSubmit={handleSearch}>
                    <label htmlFor="" className="label" > Pick From</label>
                    <input type="text" placeholder="Pickup point" name="pickup" onBlur={searchChange} />
                    <label htmlFor="" className="label" >Pick To</label>
                    <input type="text" placeholder="Destination" name="pickDown" onBlur={searchChange} />
                    <button className="btn-submit" onClick={() => handleSearch()}> Search Vehicle </button>
                    
                </form>
                {/* <Calendar
                        onChange={onChange}
                        value={value}
                    /> */}
                    <p>PickPoint: {}</p>
            </div>
            <div className="col-md-8">
                <h1>kazi</h1>

            </div>
        </div>
    );
};

export default Destination;