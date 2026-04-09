import { useEffect, useState } from "react";

const useFetch = (apiFunc, param = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!apiFunc) return;

    try {
      setLoading(true);
      const res = param ? await apiFunc(param) : await apiFunc();
      setData(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiFunc, param]);

  return { data, loading, error, fetchData }; // ✅ IMPORTANT
};

export default useFetch;