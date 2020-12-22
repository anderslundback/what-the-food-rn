import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    // call searchApi when component is first rendered
    // searchApi('pasta');
    // run some snippet of code only when our component is rendered the first time
    useEffect(() => {
        searchApi('pasta');
    }, [])

    return [searchApi, results, errorMessage];
};