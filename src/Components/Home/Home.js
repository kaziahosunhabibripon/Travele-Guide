import React, { useEffect, useState } from 'react';
import vehicles from '../../Data/data.json';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';
const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(vehicles);
    }, [data])

    return (
        <div className="row align-items-center m-0 p-0 home-div" >           
            {
                
                data?.map(vehicle => <Vehicle key={vehicle.type} vehicle={vehicle}></Vehicle>)
            }
        </div>
    );
};

export default Home;