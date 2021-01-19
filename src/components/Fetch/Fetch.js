const FETCH_URL = "http://localhost:3002/";

export const normalFetch = async (query, options) => {
    let res = "";
    let json = {};
    try {
        res = await fetch(FETCH_URL + query, options);
        json = await res.json();
    } catch (error) {
        console.log(error);
    }

    return json;
}
