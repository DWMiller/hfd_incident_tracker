import { arrayOf, bool, func, shape, string } from 'prop-types';

export const filterType = arrayOf(string);

export const eventType = shape({
  category: string.isRequired,
  location: shape({
    address: string.isRequired,
  }),
  locationName: string,
  id: string,
});

export const eventListType = arrayOf(eventType);

export const genericHandlerType = func;

export const genericBooleanType = bool;
