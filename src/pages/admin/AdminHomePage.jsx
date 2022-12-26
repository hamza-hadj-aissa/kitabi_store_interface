import AdminNavBar from "./components/AdminNavBar";

const AdminHomePage = ({ child }) => {
    return (
        <div>
            <AdminNavBar />
            <div>{child}</div>
        </div>
    );
};

export default AdminHomePage;
