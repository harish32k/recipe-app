import * as authClient from "../Clients/authClient.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../userReducers.js";

function CurrentUser({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchCurrentUser = async () => {
    try {
      const user = await authClient.fetchUserDetails();
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return <>{!loading && children}</>;
}

export default CurrentUser;
