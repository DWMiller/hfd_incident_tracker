export const SET_TEXT_FILTER = '[filter] SET_TEXT';

export const setTextFilter = text => ({
  type: SET_TEXT_FILTER,
  text,
});

export const textFilterReducer = (state = '', { type, text } = {}) => {
  switch (type) {
    case SET_TEXT_FILTER: {
      return text;
    }
    default:
      return state;
  }
};

export default textFilterReducer;
