export default function Link(props) {
    return (
        <div className="d-flex justify-content-center mt-4">
            <a
              href={props.href || "/login"}
              id='loginLink'
            >
              <u> {props.content || "Se connecter"}</u>
            </a>
          </div>
    );
}