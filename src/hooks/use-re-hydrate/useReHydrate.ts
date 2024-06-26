import { useEffect, useState } from "react";

const useReHydrate = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return {
    loading,
  };
};

export default useReHydrate;
