/*
  placeholder for persist logic (e.g. redux-persist)
  implement saving/loading store slices to localStorage if needed
*/
export const loadState = () => {
  try {
    const s = localStorage.getItem("state");
    return s ? JSON.parse(s) : undefined;
  } catch { return undefined; }
};

export const saveState = (state: unknown) => {
  try { localStorage.setItem("state", JSON.stringify(state)); } catch {
    // ignore write errors
  }
};
