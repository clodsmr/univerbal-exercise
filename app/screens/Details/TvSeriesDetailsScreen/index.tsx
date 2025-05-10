import { loadable } from 'jotai/utils';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { show$ } from './state';
import { useAtomValue } from 'jotai';
import ScreenLayout from '@/screens/ScreenLayout';
import { Rating } from '@/ui/rating';

export default function TvSeriesDetailsScreen({ route }: { route: any }) {
  const { id } = route.params;
  const show = useAtomValue(loadable(show$));
  const rating = show.state === 'hasData' ? show.data?.rating ?? 0 : 0;

  if (!show) {
    return (
      <View style={styles.container}>
        <Text>Tv series details not found.</Text>
      </View>
    );
  }

  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {show.state === 'hasData' && show.data !== undefined ? (
          <>
            <Image
              source={{
                uri: 'https://img.posterstore.com/zoom/wb0074-8friends-milkshake50x70.jpg?auto=compress%2Cformat&fit=max&w=3840',
              }}
              style={styles.image}
            />

            

            <View style={styles.textColumn}>
              <Text style={styles.title}>{show.data?.title}</Text>
              <Rating value={rating} />
              <Text style={styles.genres}>Genres: {show.data?.genres.join(', ')}</Text>

              <View style={styles.spacer} />

              {show.data?.seasons.map((season) => (
                <View key={season.seasonId} style={styles.seasonCard}>
                  <Text style={styles.seasonTitle}>Season {season.seasonId} – {season.releaseYear}</Text>
                  {season.episodes.map((episode) => (
                    <View key={episode.episodeId} style={styles.episodeRow}>
                      <Text style={styles.episodeTitle}>{episode.title}</Text>
                      <Text style={styles.runtime}>{episode.runtimeMinutes} min</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </>
        ) : (
          <Text style={styles.title}>TV series not found</Text>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  textColumn: {
    width: '100%',
  },
  spacer: {
    height: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'left',
  },
  genres: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'left',
    marginTop: 8
  },
  seasonCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  seasonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  episodeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  episodeTitle: {
    color: '#ddd',
    fontSize: 16,
  },
  runtime: {
    color: '#999',
    fontSize: 14,
  },
});
