import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router';
import './Destination.css';
import Details from "../../Data/details.json";

const Destination = () => {
    const { name} = useParams();
    const [selectedVehicle, setSelectedVehicle] = useState([]);
    useEffect(() => {
        setSelectedVehicle(Details);
        console.log(Details);
    }, [selectedVehicle])

    const [pick, setPick] = useState({
        pickup: "",
        pickDown: '',
        traveler: ''

    });
    
    const [dateState, setDateState] = useState(new Date());

    const handleSearch = (e) => {

        if (pick.traveler && pick.pickup && pick.pickDown) {
            console.log(pick);
        }

        e.preventDefault();
    }
    const searchChange = (e) => {
        const newPickupPoint = { ...pick };
        newPickupPoint[e.target.name] = e.target.value;
        setPick(newPickupPoint);
    }
    const [show, setShow] = useState({
        activeDiv: "",
        object: [{ id: 1 }, { id: 2 }]
    });

    return (
        <div className="row">
            <div className="col-md-4 my-1 p-5">
                <form className="search-content" onSubmit={handleSearch}>
                    <h1 className="text-center">Select Route</h1>
                    <label htmlFor="" className="label" >Traveler Name</label>
                    <input type="text" placeholder="Traveler Name" name="traveler" onBlur={searchChange} required />
                    <label htmlFor="" className="label" > Pick From</label>
                    <input type="text" placeholder="Enter Pickup point address" name="pickup" onBlur={searchChange} required />
                    <label htmlFor="" className="label" >Pick To</label>
                    <input type="text" placeholder="Enter Destination address" name="pickDown" onBlur={searchChange} required />
                    <button className="btn-submit" > Search Vehicle </button>

                </form>
                {/* <Calendar
                        onChange={onChange}
                        value={value}
                    /> */}
                <p>Passenger Name: {pick.traveler}</p>
                <p>PickPoint: {pick.pickup}</p>
                <p>PickDown: {pick.pickDown}</p>
                {/* <img src={imgUrl} alt=""/>
                    <p>Type: {name}</p>
                    <p>Type: {type}</p>
                    <p>Type: {price}</p>
                     */}
                {
                    selectedVehicle?.map(vehicle => {
                        <div>
                            <img src={vehicle.imgUrl} alt="" />
                            <p>Type: {vehicle.name}</p>
                            <p>Type: {vehicle.type}</p>
                            <p>Type: {vehicle.price}</p>
                        </div>
                    })
                }
            </div>
            <div className="col-md-8 text-center">

                <h1>Map</h1>

            </div>
        </div>
    );
};

export default Destination;