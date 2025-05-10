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
      setSeriesId(item.id);
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
          placeholderTextColor="#aaa"
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
                    <Text style={searchStyles.suggestionTitle}>{item.title}</Text>
                    <Text style={searchStyles.suggestionSub}>
                      {item.seasons ? 'TV Series' : 'Movie'}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) =>
                item.seasons ? `tvSeries_${item.id}` : `movie_${item.id}`
              }
            />
          ) : suggestions.state === 'loading' ? (
            <Text style={searchStyles.status}>Loading...</Text>
          ) : (
            <Text style={searchStyles.status}>No results found</Text>
          )}
        </View>
      )}
    </View>
  );
}

const searchStyles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 999,
  },
  icon: {
    marginRight: 10,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 10,
  },
  input: {
    height: 44,
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  suggestions: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 4,
    borderColor: '#444',
    borderWidth: 1,
    maxHeight: 300,
  },
  suggestionEntry: {
    padding: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  suggestionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  suggestionSub: {
    color: '#aaa',
    fontSize: 14,
  },
  status: {
    padding: 12,
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
});
