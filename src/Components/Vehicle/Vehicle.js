import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';



export default function Vehicle ({vehicle}){ 

    const imageStyle = {
        width:"250px", 
        padding:"5px",
        margin:"10px auto"
    }
    const history = useHistory();
    const handleBooking = (type)=>{
        history.push(`/destination/${type}`);
       
    }
    const {imgUrl, name} = vehicle;
    return (
        <div className="col-md-3 my-1 py-5 text-center" expand="lg">
            <Card style={{width: "18 rm"}}>
                <Card.Img variant="top" src={imgUrl} alt="" style={imageStyle}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>             
                    <Button onClick={()=> handleBooking(vehicle.type)} variant="primary"> Booking Ticket  </Button> 
                </Card.Body>
            </Card>
        </div>
    );
}

