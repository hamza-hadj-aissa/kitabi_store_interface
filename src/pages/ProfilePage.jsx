import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/scss/profile.css";
import { MdOutlineMailOutline } from "react-icons/md";
const Profile = () => {
    const Navigate = useNavigate();
    const userCredentials = useLoaderData();
    const axiosPrivateClient = useAxiosPrivate("client");
    const addressRef = useRef();
    const phoneNumberRef = useRef();
    const errRef = useRef();

    const [addressState, setAddressState] = useState(userCredentials?.address);
    const [phoneNumberState, setPhoneNumberState] = useState(
        userCredentials?.phone_number
    );
    const [errMsg, setErrMsg] = useState("");

    const navigateToChangePassword = () => Navigate("/auth/change-password");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosPrivateClient
            .put("/users/update-info", {
                address: addressState,
                phone_number: phoneNumberState,
            })
            .then((response) => {
                console.log("Updated successfully");
                if (response.data.success) {
                    console.log("Updated successfully");
                } else {
                    setErrMsg(response.data.message);
                }
            })
            .catch((err) => {
                setErrMsg(err.response.data.message);
            });
    };

    return (
        <div className="profile-container middle">
            <h1>
                {userCredentials.firstName} {userCredentials.lastName}
            </h1>
            <h2>
                <MdOutlineMailOutline size={45} /> {userCredentials.email}
            </h2>
            <form onSubmit={handleSubmit}>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Enter your delivery address"
                        defaultValue={userCredentials.address}
                        ref={addressRef}
                        onChange={(e) => setAddressState(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone number</label>
                    <input
                        type="tel"
                        maxLength={10}
                        placeholder="Enter your phone number"
                        defaultValue={userCredentials.phone_number}
                        ref={phoneNumberRef}
                        onChange={(e) => setPhoneNumberState(e.target.value)}
                    />
                </div>

                <button type="submit">Update informations</button>
            </form>
            <button type="button" onClick={navigateToChangePassword}>
                Change password
            </button>
        </div>
    );
};

export default Profile;
