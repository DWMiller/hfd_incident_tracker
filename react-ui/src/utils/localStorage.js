export const saveState = (state, key = 'state') => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

export const loadState = (key = 'state') => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }

    const savedState = JSON.parse(serializedState);

    return savedState;
  } catch (err) {
    return undefined;
  }
};
