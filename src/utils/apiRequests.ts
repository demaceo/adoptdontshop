import axios from 'axios';
import * as base64 from 'base-64';
import { GetAllAnimalsApiResponse, Animal } from './Types';

const clientId = import.meta.env.VITE_PETFINDER_CLIENT_ID;
const clientSecret = import.meta.env.VITE_PETFINDER_CLIENT_SECRET;

const getBearerToken = async (clientId: string, clientSecret: string): Promise<string | null> => {
    const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
    const encodedCredentials = base64.encode(`${clientId}:${clientSecret}`);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`,
    };
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
    }).toString();
    try {
        const response = await axios.post(tokenUrl, data, { headers });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error getting bearer token:', error.response ? error.response.data : error.message);
        } else {
            console.error('Error getting bearer token:', error);
        }
        return null;
    }
}

export const fetchCompletedFormResults = async (params: URLSearchParams): Promise<GetAllAnimalsApiResponse | undefined> => {
    try {
        const accessToken = await getBearerToken(clientId, clientSecret);
        if (!accessToken) {
            console.log("Failed to get access token");
            return;
        }

        const url = "https://api.petfinder.com/v2/animals";
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params,
        });

        if (response && response.data && response.data.animals) {
            return response.data;
        } else {
            console.error("No animals data found");
            return undefined;
        }
    } catch (error) {
        console.error("Error fetching animals:", error);
        return undefined;
    }
};

// Function to fetch animals based on breed
export const fetchAnimalsByBreed = async (breed: string): Promise<Animal[]> => {
    const accessToken = await getBearerToken(clientId, clientSecret);
    if (!accessToken) {
        return [];
    }

    const url = `https://api.petfinder.com/v2/animals`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                breed,
            },
        });

        return response.data.animals || [];  // Return the animals data
    } catch (error) {
        console.error(`Error fetching animals for breed ${breed}:`, error);
        return [];
    }
};

// Function to get animal types
export const fetchAnimalTypes = async (): Promise<string[]> => {
    const accessToken = await getBearerToken(clientId, clientSecret); // Get token
    if (!accessToken) {
        return [];
    }
    const url = "https://api.petfinder.com/v2/types";
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.types.map((type: { name: string }) => type.name);
    } catch (error) {
        console.error("Error fetching animal types:", error);
        return [];
    }
};

// Function to get breeds for a given animal type
export const fetchBreeds = async (type: string): Promise<string[]> => {
    const accessToken = await getBearerToken(clientId, clientSecret); // Get token
    if (!accessToken) {
        return [];
    }
    const url = `https://api.petfinder.com/v2/types/${type}/breeds`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.breeds.map((breed: { name: string }) => breed.name);
    } catch (error) {
        console.error(`Error fetching breeds for ${type}:`, error);
        return [];
    }
};

// export const fetchAnimalsWithPagination = async (
//     page: number,
//     limit: number
// ): Promise<GetAllAnimalsApiResponse | undefined> => {
//     try {
//         const accessToken = await getBearerToken(clientId, clientSecret);
//         if (!accessToken) {
//             console.log("Failed to get access token");
//             return;
//         }
//         // Set query parameters for pagination
//         const params = new URLSearchParams({
//             page: String(page), // Current page
//             limit: String(limit), // Number of items per page (20)
//         });

//         const allAnimals = await fetchCompletedFormResults(params);
//         if (allAnimals && allAnimals.animals.length > 0) {
//             return allAnimals;
//         }
//         console.log("No animals found");
//         return undefined;
//     } catch (error) {
//         console.error("Error FETCHING animals with pagination:", error);
//     }
// };



/* NOTES ON API REQUESTS
https://www.petfinder.com/developers/v2/docs/

* GET https://api.petfinder.com/v2/animals
Returns one "page" of details (defaulting to the first 20 results) on a group of animals based on criteria given in the parameters.  If a location query is not given, the animal distance property will be null. Otherwise the distance is distance from the location parameter in miles.
QUERY PARAMETERS:
typ:string
    Return results matching animal type		
    Possible values may be looked up via Get Animal Types.

breed:string
    Return results matching animal breed		
    Accepts multiple values, e.g. breed=pug,samoyed. Possible values may be looked up via Get Animal Breeds below.

size: string
    Return results matching animal size		
    values=small, medium, large, xlarge. Accepts multiple values, e.g. size=large,xlarge.

gender:string
    Return results matching animal gender		
    values=male, female, unknown. Accepts multiple values, e.g. gender=male,female.

age:string
    Return results matching animal age		
    values=baby, young, adult, senior. Accepts multiple values, e.g. age=baby,senior.

color:string
    Return results matching animal color		
    Possible values may be looked up via Get Animal Types.

coat:string
    Return results matching animal coat		
    values=short, medium, long, wire, hairless, curly. Accepts multiple values, e.g. coat=wire,curly.

status:string
    Return results matching adoption status
    values=adoptable, adopted, found. Accepts multiple values (default: adoptable)

name:string
    Return results matching animal name 
    (includes partial matches; e.g. "Fred" will return "Alfredo" and "Frederick")		

organization:string
    Return results associated with specific organization(s)
    Accepts multiple values, e.g. organization=[ID1],[ID2].

good_with_children:boolean
    Return results that are good with children	
    Can be true, false, 1, or 0

good_with_dogs:boolean
    Return results that are good with dogs		
    Can be true, false, 1, or 0

good_with_cats:boolean
    Return results that are good with cats	
    Can be true, false, 1, or 0

house_trained:boolean
    Return results that are house trained		
    Can be true or 1 only

declawed:boolean	
    Return results that are declawed		
    Can be true or 1 only

special_needs:boolean	
    Return results that have special needs		
    Can be true or 1 only

location:string
    Return results by location.	
    values=city, state; latitude,longitude; or postal code.

distance:integer	
    Return results within distance of location (in miles).		
    Requires location to be set (default: 100, max: 500)

before:string	
    Return results published before this date/time.		
    Must be a valid ISO8601 date-time string (e.g. 2019-10-07T19:13:01+00:00)

after:string
    Return results published after this date/time.	
    Must be a valid ISO8601 date-time string (e.g. 2019-10-07T19:13:01+00:00)

sort:string
    Attribute to sort by; leading dash requests a reverse-order sort		
    values=recent, -recent, distance, -distance, random (default: recent)

page:integer
    Specifies which page of results to return		
    (default: 1)

limit:integer
    Maximum number of results to return per 'page' response		
    (default: 20, max: 100)

* GET https://api.petfinder.com/v2/types
Returns an array of animal types. This provides the possible values for the "type" parameter, covering species, color, coat, and gender.

* GET https://api.petfinder.com/v2/types/{type:string}/breeds
Returns possible breed values for a given animal type


* GET https://api.petfinder.com/v2/types/{type:string}
Returns information on a single animal type.

* GET https://api.petfinder.com/v2/organizations
Returns details on a group of organizations based on criteria given in parameters. If a location "query" is not given, the organization "distance" property will be null. Otherwise the distance is distance from the location parameter in miles.
QUERY PARARMETERS:
name: string
    Return results matching organization name	

location: string	
    Return results by location.	
    [values=city, state; latitude,longitude; or postal code.]

distance: integer	
    Return results within distance of location (in miles).	[value=requires location to be set (default: 100, max: 500)]

state: string	
    Filter results by state	
    [value=Accepts two-letter abbreviations, e.g. AL, WY]

country	: string
    Filter results by country.	
    [value=Accepts two-letter abbreviations, e.g. US, CA]

query: string
    Search on name, city, state (Search that includes synonyms, varying punctuation, etc.)	

sort: string
    Field to sort by; leading dash requests a reverse-order sort	
    [value=distance, -distance, name, -name, country, -country, state, -state]
limit: integer
    Maximum number of results to return	
    [value=(default: 20, max: 100)]
page: integer
    Page of results to return		
    [value=(default: 1)]


* GET https://api.petfinder.com/v2/organizations/{id:string}
Returns information about a single organization.  
?[values=Organization ID (ex. NJ333)]
*/