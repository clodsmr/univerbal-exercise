import React, { ReactNode, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { inputValue$, suggestions$ } from './state';
import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../domain/type'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { movieId$ } from '@/screens/Details/MovieDetailsScreen/state';
import { seriesId$ } from '@/screens/Details/TvSeriesDetailsScreen/state';

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const [movieId, setMovieId] = useAtom(movieId$);
  const [seriesId, setSeriesId] = useAtom(seriesId$);
  const suggestions = useAtomValue(loadable(suggestions$));


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 


  const handleSuggestionPress = (item: any) => {
    if (item.seasons) {
      setSeriesId(item.id)
      navigation.navigate('TvSeriesDetails', { id: item.id, series: item });
    } else {
      setMovieId(item.id); 
      navigation.navigate('MovieDetails', { id: item.id, movie: item });
    }
  };

  return (
    <View style={[searchStyles.root, style]}>
      <View style={searchStyles.inputContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={searchStyles.icon} />
        <TextInput
          ref={inputRef}
          style={searchStyles.input}
          placeholder="Type to search..."
          onChangeText={setInputValue}
          value={inputValue || ''}
        />
      </View>

      {inputValue && (
        <View style={searchStyles.suggestions}>
          {suggestions.state === 'hasData' ? (
            <FlatList
              data={suggestions.data}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                  <View style={searchStyles.suggestionEntry}>
                    <Text>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => {
                // Ensure unique key for TV Series and Movies
                return item.seasons ? `tvSeries_${item.id}` : `movie_${item.id}`;
              }}
            />
          ) : suggestions.state === 'loading' ? (
            <Text>Loading...</Text>
          ) : (
            <Text>No results found</Text>
          )}
        </View>
      )}
    </View>
  );
}

const searchStyles = StyleSheet.create({
  root: {
    position: 'relative',
    padding: 8,
    zIndex: 999
  },

  icon: {
    marginRight: 10,
    marginLeft: 8
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#444950',
    color: 'white'
  },

  input: {
    height: 40,
    borderWidth: 0,
    width: '100%',
    paddingLeft: 0,
    borderRadius: 5,
     color: 'white'
  },

  suggestions: {
    position: 'absolute',
    top: 50,
    right: 8,
    width: 360,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    zIndex: 999,
  },

  suggestionEntry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
