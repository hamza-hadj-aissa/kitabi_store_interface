import { EmailOutlined, PhoneOutlined } from "@material-ui/icons";
import { useLoaderData } from "react-router";
import "../css/scss/profile.css";

const Profile = () => {
    const userCredentials = useLoaderData();
    return (
        <div className="profile-container middle">
            <h1>
                {userCredentials.firstName} {userCredentials.lastName}
            </h1>
            <h2>
                <EmailOutlined /> {userCredentials.email}
            </h2>
            <form>
                <label>Address</label>
                <input type="text" value={userCredentials.address} />
                <label>Phone number</label>
                <input type="tel" value={userCredentials.phone_number} />
                <label>Old password</label>
                <input type="password" placeholder="Old password" />
                <label>New password</label>
                <input type="password" placeholder="New password" />
                <label>Confirm new password</label>
                <input type="password" placeholder="Confirm new password" />
                <button type="submit">Update informations</button>
            </form>
        </div>
    );
};

export default Profile;
