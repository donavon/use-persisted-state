const globalState = {};

const createGlobalState = (key, thisCallback, initialValue) => {
  if (!globalState[key]) {
    globalState[key] = { callbacks: [], value: initialValue };
  }
  globalState[key].callbacks.push(thisCallback);
  return {
    deregister() {
      const arr = globalState[key].callbacks;
      const index = arr.indexOf(thisCallback);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    emit(value) {
      if (globalState[key].value !== value) {
        globalState[key].value = value;
        globalState[key].callbacks.forEach((callback) => {
          if (thisCallback !== callback) {
            callback(value);
          }
        });
      }
    },
  };
};

export default createGlobalState;
