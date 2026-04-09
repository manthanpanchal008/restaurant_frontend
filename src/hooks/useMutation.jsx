import { useState } from "react";
import axios from "axios";

const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (apicall) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apicall();
      console.log(response)
      setData(response);
      return response.data;
    } catch (err) {
      const message =err.response?.data?.message;
        // console.log(err.response.data.message)
      setError(message);
      throw message; // ✅ now clean message
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
};

export default useMutation;