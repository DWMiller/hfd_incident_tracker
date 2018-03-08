import { arrayOf, shape, string } from 'prop-types';

export const filterType = arrayOf(string);

export const eventType = shape({
  category: string.isRequired,
  location: shape({
    address: string.isRequired,
  }),
  locationName: string,
  id: string,
});
