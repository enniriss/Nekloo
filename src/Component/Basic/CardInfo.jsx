import { Card } from "react-bootstrap";

export default function CardInfo(props) {
    return(
    <Card className="d-inline-block position-relative" style={{ border: "#BB261F solid 1px", borderRadius: "20px", background: "rgba(187, 38, 31, 0.3)"}}>
        <Card.Body>
            <Card.Text>{props.author}</Card.Text>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.address}</Card.Text>
            <p className="tag d-inline-block px-2 position-absolute" style={{right: '15px', top: '10px'}}>{props.activity}</p>
            
            {props.admin == true ? (

                 <>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={props.onEdit}>Transformer</button>
                </div>
                </>
                
            ) : (   
               <>
                <p>{props.pseudo}</p>
                <div className="d-flex justify-content-around align-items-end">
                    <a href={props.href} className="btn btn-danger border-none" style={{backgroundColor: "#BB261F", height: "40px"}}>Transformer</a>
                    <button onClick={props.delete} className="d-flex align-items-center justify-content-center rounded-circle" style={{backgroundColor: "#EED9A6", height: "40px", width: "40px", border: "solid 1px #BB261F"}}><img src="/assets/zebla.png" height={"25px"} alt="" /></button>
                </div>
                </>
            )}
        </Card.Body>
    </Card>);
}