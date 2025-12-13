import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axiosSecure
      .get(`/users/role/${user.email}`)
      .then((res) => {
        setRole(res.data.role || "citizen");
      })
      .catch(() => setRole("citizen"))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  return { role, loading };
};

export default useRole;
