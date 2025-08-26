export default function SwitchButton({ isOn, onToggle }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={onToggle} />
      <span className="slider round"></span>
    </label>
  );
}