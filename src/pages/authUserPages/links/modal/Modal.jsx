import "./Modal.css";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";
import Input from "../../../../components/input/Input"
import Toggle from "../../../../components/toggleButton/Toggle";
const Modal = (props) => {
    const [state, setState] = useState({
        input_url: "",
        title: "",
        link_expire_date: "",
        analytics: true,
        unique_extension: "",
        domain: "lru.co"
    });
    const [error, setError] = useState({
        input_url: false,
        title: false,
        link_expire_date: "",
        analytics: ""
    });

    const onChange = (e) => {
        console.log(e.target.checked)
        setState(prevState => ({
            analytics: e.target.checked
        }));
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="linksModalInputContainer" >
                    <label>Destination</label>
                    <Input
                        width={300}
                        placeholder="http://www.my_long_url.com"
                        type="text"
                        name={"input_url"}
                        value={state.input_url}
                    />
                </div>
                <div className="linksModalInputContainer" >
                    <label>Title (optional)</label>
                    <Input
                        width={300}
                        placeholder="Title"
                        type="text"
                        name={"title"}
                        value={state.title}
                    />
                </div>
                <div className="linksModalInputContainer">
                    <label>Link expiry date (optional)</label>
                    <Input
                        width={300}
                        placeholder="Link expire Date"
                        type="date"
                        name={"link_expire_date"}
                        value={state.link_expire_date}
                    />
                </div>
                <div className="linksModalInputContainerForToggle" >
                    <label>Analytics (optional)</label>
                    <Toggle
                        name="analytics"
                        checked={state.analytics}
                        onChange={onChange}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }} >
                    <label>Short link (optional)</label>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                        <div className="linksModalInputContainer">
                            <label>Domain  <i class="bi bi-lock-fill"></i></label>
                            <Input
                                width={300}
                                type="text"
                                disabled={true}
                                value={state.domain}
                            />
                        </div>
                        <div style={{ paddingTop: 10, margin: 10 }} >
                            <h1>/</h1>
                        </div>
                        <div className="linksModalInputContainer">
                            <label>Custom back-half (optional)</label>
                            <Input
                                width={300}
                                placeholder="Link expire Date"
                                type="text"
                                name={"unique_extension"}
                                value={state.unique_extension}
                            />
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
export default Modal;
