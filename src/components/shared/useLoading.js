import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";

export default function useLoading(request, props = []) {
  const { catchAppErrors } = useContext(AppContext);

  const [isComplete, setComplete] = useState(false);
  const [error, setError] = useState(null);

  async function makeRequest() {
    const appError = await catchAppErrors(request);
    setError(appError);
    setComplete(!appError);
  }

  useEffect(() => {
    makeRequest();
  }, props);

  return { isComplete, error };
}
