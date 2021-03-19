import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import vehicles from '../../Data/data.json';
import { Button } from 'react-bootstrap';
const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(vehicles);
        console.log(data);

    }, [data])


    return (
        <div className="row align-items-center m-0 p-0">
            {
                data?.map(vehicle =>
                    <div key={vehicle.type} className="d-flex col-md-3 my-5 py-5">
                        <Card style={{ width: '18rem'}}>
                            <Card.Img variant="top" src={vehicle.imgUrl}  alt="" />
                            <Card.Body>
                                <Card.Title>{vehicle.name}</Card.Title>
                                <Card.Text> 
                                    <span>{vehicle.description}</span>
                                    <h4><small> Price: ${vehicle.price}</small></h4>
                                    <span> Capacity : {vehicle.capacity}  </span>
                                </Card.Text>
                                <Button variant="primary">Booking Ticket</Button>
                            </Card.Body>
                        </Card>
                        
                    </div>)
            }
        </div>
    );
};

export default Home;