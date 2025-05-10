import { List } from '@/ui/list';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useState, type ReactNode } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { topRatedMovies$ } from './state';
import { TVSeries } from 'domain/tv-series';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Loader } from '@/ui/loader';
import ScreenLayout from '../ScreenLayout';

export default function TopRatedScreen(): ReactNode {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);

  useEffect(() => {
    getTopRatedTvSeriesQuery().then((res) => {
      setTvSeries(res as TVSeries[]);
    });
  }, []);

  if (topRatedMoviesLoadable.state === 'loading') return <Loader />;
  if (topRatedMoviesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedMoviesLoadable.error)}</Text>;
  }

  return (
    <ScreenLayout>
      <FlatList
        data={[]} 
        keyExtractor={(_, index) => index.toString()}
        renderItem={null}
        ListHeaderComponent={
          <View style={styles.container}>
            {/* Movies Section */}
            <View style={styles.section}>
              <Text style={styles.title}>Top rated movies</Text>
              <List
                data={topRatedMoviesLoadable.data}
                style={styles.list}
              />
            </View>

            {/* TV Series Section */}
            <View style={styles.section}>
              <Text style={styles.title}>Top rated TV series</Text>
              <List
                data={tvSeries}
                style={styles.list}
              />
            </View>
          </View>
        }
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    marginBottom: 40,
  },
});
