import { arrayOf, shape, string, number } from 'prop-types';

export const iconType = shape({
  file: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
});

export const incidentType = shape({
  category: string.isRequired,
  location: shape({
    address: string.isRequired,
    coordinates: arrayOf(number),
  }),
  locationName: string,
  id: string,
  icon: iconType,
});
