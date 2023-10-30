import "./Toggle.css";
const Toggle = (props) => {
    return (
        <label class="switch">
            <input type="checkbox"
                onChange={props.onChange}
                name={props.name}
                checked={props.checked}
            ></input>
            <span class="slider round"></span>
        </label>
    )
}

export default Toggle;