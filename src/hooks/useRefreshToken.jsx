import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthProvider";

const useRefreshToken = (role) => {
    const { setAuth } = useContext(AuthContext);
    const refresh = async () => {
        return await axios
            .get(
                role === "client"
                    ? "/auth/refreshToken"
                    : "/auth/admin/refreshToken"
            )
            .then((response) => {
                setAuth({
                    id: response.data?.id,
                    role: response.data?.role,
                    accessToken: response.data?.accessToken,
                });
                return response.data.accessToken;
            });
    };
    return refresh;
};

export default useRefreshToken;
