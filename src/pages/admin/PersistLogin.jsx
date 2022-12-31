import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = ({ children, role }) => {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken(role);
    useEffect(() => {
        let isMounted = true;
        const verifyAccessToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        !auth ? verifyAccessToken() : setIsLoading(false);
        return () => (isMounted = false);
    }, []);

    return isLoading ? null : { ...children };
};

export default PersistLogin;
