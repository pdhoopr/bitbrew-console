import { useContext, useEffect, useState } from "react";
import Context from "../Context";

export default function useLoading(loadData, props = []) {
  const { errorBoundary } = useContext(Context);

  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    const error = await errorBoundary(loadData);
    if (!error) {
      setLoading(false);
    }
  }, props);

  return isLoading;
}
