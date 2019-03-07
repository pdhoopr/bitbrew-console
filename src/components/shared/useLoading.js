import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";

export default function useLoading(loadData, props = []) {
  const { errorBoundary } = useContext(GlobalContext);

  const [isLoading, setLoading] = useState(true);

  async function loadWithErrorHandling() {
    setLoading(true);
    const error = await errorBoundary(loadData);
    if (!error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWithErrorHandling();
  }, props);

  return isLoading;
}
