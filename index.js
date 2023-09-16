import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = async ({ name, hex, compName, compHex }) => {
  // Fetch the JSON document using the url found in COLORS.
  return fetch(COLORS)
    .then(response => response.json()) //Get the response and return the json
    .then((json) => { 

        // If the passed in variable is name
        if (name !== undefined) {
          // Filter the array of colors
          // -- First, ensure both sides of the equation are lowercase
          // -- Second, match on names that include the passed in name.
          // Return the full object including child comp array object for only matched objects.
          return json.filter(color => color.name.toLowerCase().includes(name.toLowerCase()));
        }

        // If the passed in variable is hex
        if (hex !== undefined) {
          // Filter the array of colors
          // -- First, ensure both sides of the equation are lowercase
          // -- Second, match on hex where both are equal.
          // Return the full object including child comp array object for only matched objects.
          return json.filter(color => color.hex.toLowerCase() == hex.toLowerCase());
        }

        // If the passed in variable is compName
        if (compName !== undefined) {
          // Filter the array of colors
          // -- First, find objects in the color array that have one or more matching child objects from the comp array.
          // -- Second, ensure both sides of the equation are lowercase
          // -- Third, match on comp object names that include the passed in name.
          // Return the full object including child comp array object for only matched objects.
          return json.filter(color => color.comp.some(c => c.name.toLowerCase().includes(compName.toLowerCase())));
        }

        // If the passed in variable is compHex
        if (compHex !== undefined) {
          // Filter the array of colors
          // -- First, find objects in the color array that have one or more matching child objects from the comp array.
          // -- Second, ensure both sides of the equation are lowercase
          // -- Third, match on comp object hex that equals the passed in hex.
          // Return the full object including child comp array object for only matched objects.
          return json.filter(color => color.comp.some(c => c.hex.toLowerCase() == compHex.toLowerCase()));
        }

      })
      .catch((err)=> {
        // Log error to console.
        console.log(err)
      });
};

// Leave this here
export default fetchColors;
