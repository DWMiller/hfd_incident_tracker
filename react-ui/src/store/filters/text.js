export const SET_TEXT_FILTER = '[filter] SET_TEXT';

export const textFilterReducer = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_TEXT_FILTER: {
      return payload.text;
    }
    default:
      return state;
  }
};

export default textFilterReducer;
