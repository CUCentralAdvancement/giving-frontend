
export const initFromLocalStorage = (storageKey) => (defaultState) => {
    const state = typeof window !== 'undefined' &&
      window.localStorage.getItem(storageKey)
      ? JSON.parse(window.localStorage.getItem(storageKey))
      : defaultState;
    if (typeof window !== 'undefined' && state === defaultState)
      window.localStorage.setItem(storageKey, JSON.stringify(defaultState));
    return state;
};

export const RELOAD_FROM_LOCAL_STORAGE = "RELOAD_FROM_LOCAL_STORAGE";

export const withLocalStorage = (reducerFn, key = 'donor') => (state, action) => {
    const updatedState = (function(){
      switch (action.type) {
        case RELOAD_FROM_LOCAL_STORAGE:
          return typeof window !== undefined ?
            JSON.parse(window.localStorage.getItem(key))
            : state;
        default:
          return reducerFn(state, action);
      }
    })()
    window.localStorage.setItem(key, JSON.stringify(updatedState));
    return updatedState;
}
