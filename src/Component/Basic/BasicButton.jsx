export default function BasicButton(props) {
  return (
    <button
      className={"bg-peps " + props.class}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.description}
    </button>
  );
}