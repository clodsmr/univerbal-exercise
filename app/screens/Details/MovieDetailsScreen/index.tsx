import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { movie$ } from './state';
import ScreenLayout from '@/screens/ScreenLayout';

export default function MovieDetailsScreen({ route }: { route: any }) {
  const { id } = route.params;
  const movie = useAtomValue(loadable(movie$));

console.log('movie details', movie)
  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>Movie details not found.</Text>
      </View>
    );
  }

  return (
    <ScreenLayout>
        <ScrollView contentContainerStyle={styles.container}>
    {movie.state === 'hasData' && movie.data !== undefined ?
    <>
        <Image
            source={{ uri: 'https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8' }}
            style={styles.image}
        />

        <View style={styles.textColumn}>
            <Text style={styles.title}>{movie.data?.title}</Text>
            <Text style={styles.director}>Director: {movie.data?.director}</Text>
            <Text style={styles.genres}>Genres: {movie.data?.genres.join(', ')}</Text>
        </View>
        </> : <Text style={styles.title}>movie not found</Text>
        }

        </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,

  },
    textColumn: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#fff',
  },
  director: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    color: '#fff',
  },
  genres: {
    fontSize: 16,
    textAlign: 'left',
    color: '#aaa',
  },
});
