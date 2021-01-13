import React from 'react';

export const useFetch = (url, query, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url + query, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, [])
    return { response, error, isLoading };
};

export const normalFetch = async (url, options) => {
    let res = "";
    let json = {};
    try {
        res = await fetch(url, options);
        json = await res.json();
    } catch (error) {
        console.log(error);
    }

    return json;
}