import { arrayOf, shape, string, number } from 'prop-types';

export const filterType = arrayOf(string);

export const eventType = shape({
  category: string.isRequired,
  location: shape({
    address: string.isRequired,
    coordinates: arrayOf(number),
  }),
  locationName: string,
  id: string,
});
