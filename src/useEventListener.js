import { useRef, useEffect } from 'react';

const useEventListener = (eventName, handler) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  });

  useEffect(
    () => {
      const eventListener = event => savedHandler.current(event);

      global.addEventListener(eventName, eventListener);
      return () => {
        global.removeEventListener(eventName, eventListener);
      };
    },
    [eventName]
  );
};

export default useEventListener;
