import { useCallback, useEffect, useRef, useState } from "react";

export function useStateCallback<T>(
  initialState: T
): [T, (state: T, cb: any) => void] {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef(null);

  const setStateCallback = useCallback((state, cb?) => {
    cbRef.current = cb;
    setState(state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}
