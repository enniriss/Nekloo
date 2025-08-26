import { Card } from "react-bootstrap";

export default function CardInfo(props) {
    return(
    <Card className="d-inline-block position-relative" style={{ border: "#BB261F solid 1px", borderRadius: "20px", background: "rgba(187, 38, 31, 0.3)"}}>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.text}</Card.Text>
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
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={props.onEdit}>Modifier</button>
                    <a href={props.href} className="btn btn-primary">Voir plus</a>

                </div>
                </>
            )}
        </Card.Body>
    </Card>);
}