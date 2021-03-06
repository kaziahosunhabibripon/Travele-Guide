import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router';
import './Destination.css';
import Details from "../../Data/details.json";
import peopleicon from '../../Images/peopleicon.png';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 27.2046,
    lng: -77.4977
};
const Destination = () => {

    const { name } = useParams();
    const selectedVehicle = Details.find(vc => vc.name === name);
    const [pick, setPick] = useState({
        pickup: "",
        pickDown: '',
        traveler: ''

    });

    const [dateState, setDateState] = useState(new Date());
    function onChange(dateState) {
        setDateState(dateState);
    }
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
 const [show, setShow] = useState(true);
       

    return (
        <div className="row">
            <div className="col-md-4 mb-1 p-5">
            
                {
                   show? <form className="search-content" onSubmit={handleSearch}>
                        <h1 className="text-center">Select Route</h1>
                        <label htmlFor="" className="label" >Traveler Name</label>
                        <input type="text" placeholder="Traveler Name" name="traveler" onBlur={searchChange} required />
                        <label htmlFor="" className="label" > Pick From</label>
                        <input type="text" placeholder="Enter Pickup point address" name="pickup" onBlur={searchChange} required />
                        <label htmlFor="" className="label" >Pick To</label>
                        <input type="text" placeholder="Enter Destination address" name="pickDown" onBlur={searchChange} required />
                        <button className="btn-submit" onClick={()=>setShow(false)}> Search Vehicle </button>
                        <Calendar onChange={onChange} value={dateState} />
                    </form> 
                    :
                     <div className="color">
                        <div className="passengerDetails ">
                            <p>Passenger Name: {pick.traveler}</p>
                            <p>PickPoint: {pick.pickup}</p>
                            <p>PickDown: {pick.pickDown}</p>
                        </div>

                        <div className="vechilesDetails " >
                            <div className="vechile-photo">
                                <img src={selectedVehicle?.imgUrl} alt="" width="90%" />
                            </div>
                            <div className="ticket">
                                <h3> {selectedVehicle?.name}</h3>
                                <h3><img src={peopleicon} alt="" width="50%" /> {selectedVehicle?.capacity}</h3>
                                <h6>${selectedVehicle?.price}</h6>
                            </div>
                        </div>
                        <div className="vechilesDetails" >
                            <div className="vechile-photo">
                                <img src={selectedVehicle?.imgUrl} alt="" width="90%" />
                            </div>
                            <div className="ticket">
                                <h3> {selectedVehicle?.name}</h3>
                                <h3><img src={peopleicon} alt="" width="50%" /> {selectedVehicle?.capacity}</h3>
                                <h6>${selectedVehicle?.price}</h6>
                            </div>
                        </div>
                        <div className="vechilesDetails " >
                            <div className="vechile-photo">
                                <img src={selectedVehicle?.imgUrl} alt="" width="90%" />
                            </div>
                            <div className="ticket">
                                <h3> {selectedVehicle?.name}</h3>
                                <h3><img src={peopleicon} alt="" width="50%" /> {selectedVehicle?.capacity}</h3>
                                <h6>${selectedVehicle?.price}</h6>
                            </div>
                        </div>
                    </div>
                    }
                    
            </div>
            <div className="col-md-6 text-center">

                <LoadScript googleMapsApiKey="API_key">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={0}>
                    </GoogleMap>
                </LoadScript>
                
            </div>
        </div>
    );
};

export default Destination;