import { useRef } from 'react';
import { dequal } from 'dequal/lite';

const useMemoizedObject = (obj) => {
  const mem = useRef();

  if (dequal(mem.current, obj)) {
    return mem.current;
  }

  mem.current = obj;
  return obj;
};

export default useMemoizedObject;
