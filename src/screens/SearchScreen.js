import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import { ScrollView } from 'react-native-gesture-handler';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = price => {
        // price === '$' || '$$' || '$$$' | '$$$$'
        return results.filter(result => {
            return result.price === price;
        })
    };

    return (
        // View
        // only take up the max amount of space we have
        // to avoid content being cut off on smaller devices
        // <> fragment = RN by default doesn't allow any 
        // content to be rendered off view so we don't need to worry about flex: 1 in a wrapping view
        <>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ScrollView>
                <ResultsList
                    title="Cost Effective"
                    results={filterResultsByPrice('$')}
                />
                <ResultsList
                    title="Bit Pricier"
                    results={filterResultsByPrice('$$')}
                />
                <ResultsList
                    title="Big Spender!"
                    results={filterResultsByPrice('$$$')}
                />
                <ResultsList
                    title="R.I.P Wallet"
                    results={filterResultsByPrice('$$$$')}
                />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({

});

export default SearchScreen;