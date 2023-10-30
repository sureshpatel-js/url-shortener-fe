import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Signup.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios";
import { base_url } from "../../../appConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import Logo from "./../../../components/logo/Logo";
const Signup = (props) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        email: "",
        first_name: ""
    });

    const [error, setError] = useState({
        email: false,
        first_name: false,
        inValidEmail: false
    });


    useEffect(() => {
        const signupemail = localStorage.getItem("signupemail");
        const signupname = localStorage.getItem("signupname");
        if (signupemail && signupname) {
            setState({
                first_name: signupname,
                email: signupemail
            })
        }
    }, []);

    const onChange = (e) => {
        console.log(e.target.value);
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        if (e.target.name === "email") {
            setError(prevState => ({
                ...prevState,
                email: false,
                inValidEmail: false
            }));
        } else {
            setError(prevState => ({
                ...prevState,
                [e.target.name]: false
            }));
        }

    }

    const onClick = async () => {
        const { email, first_name } = state;
        if (email === "") {
            setError(prevState => ({ ...prevState, email: true }));
            return;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setError(prevState => ({ ...prevState, inValidEmail: true }));
            return;
        } else if (first_name === "") {
            setError(prevState => ({ ...prevState, first_name: true }));
            return;
        }
        setLoader(true);
        try {
            const res = await axios.post(
                `${base_url}user/clientAdminSignUp`,
                {
                    email,
                    first_name
                }
            );
            setLoader(false);
            const { status, data } = res.data;
            localStorage.setItem("signupemail", state.email);
            localStorage.setItem("signupname", state.first_name);
            navigate(`/otpVerify`);
        } catch (error) {
            setLoader(false);
            NotificationManager.error(error?.response?.data?.data?.message, "Error", 4000);
        }
    }

    return (
        <div className="signupPage"   >
            {
                !loader && <>
                    <div className="signupPageLogo" >
                        <Logo />
                    </div>
                    <div className="signupPageLLC"  >
                        Sign up to Let's Learn Code
                    </div>
                    <div className="signupPageInputContainer" >
                        <label className="signupPageInputLabel" >{error.first_name ? "😎 Please provide your first_name." : ""}</label>
                        <Input
                            width={300}
                            placeholder="Name"
                            type="text"
                            onChange={onChange}
                            name={"first_name"}
                            value={state.first_name}
                        />
                    </div>
                    <div style={{ marginBottom: 12 }} className="signupPageInputContainer"  >
                        <label className="signupPageInputLabel" >{error.email ? "📧 Please provide your email." : error.inValidEmail ? "📧 Please enter a valid email." : ""}</label>
                        <Input
                            width={300}
                            placeholder="Email"
                            type="email"
                            onChange={onChange}
                            name={"email"}
                            value={state.email}
                        />
                    </div>
                    <Button
                        width={300}
                        height={34}
                        onClick={onClick}
                    >Sign up</Button>
                    <div className="signupPageContainerLogin" >
                        Already have an account? <span onClick={() => navigate("/login")} className="signupPageLogin" >Login in</span>
                    </div>
                </>
            }
            {
                loader && <div className="signupLoader" >
                    <Loader />
                </div>
            }
            <NotificationContainer />
        </div>
    )
}

export default Signup;