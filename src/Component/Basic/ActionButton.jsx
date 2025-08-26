

export default function ActionButton(props) {
    return (
            <div className="z-3 position-relative d-flex justify-content-center round-group action-button-card" style={{backgroundColor: "rgba(244, 230, 195, 0.9)", boxShadow: "0px 0px 50px 1px #BB261F", height: props.height}} id={props.id}>
                <div class="d-flex justify-content-center" >
                    <a href={props.href} className="text-decoration-none text-center">
                        <img src={props.img} style={props.imgStyle} className="shadow-img" width={props.widthImg}  alt="" />
                        <h1 className="m-0 p-0" style={{color: "#BB261F",fontSize: "3em",...props.h1Style}}>{props.title}</h1>
                    </a>
                </div>
            </div>
    );
}