import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';
import { Suspense, type ReactNode } from 'react';
import { View } from 'react-native';
import ScreenLayout from '../ScreenLayout';

export default function HomeScreen(): ReactNode {
  return (
    <ScreenLayout>
      <View style={{ position: 'relative', paddingHorizontal: 16, paddingTop: 20 }}>
        <Search />
        <View style={{ marginTop: 100 }}>
         {/*  <FeaturedMovies style={{ marginBottom: 40 }} />  */}
          <FeaturedTvSeries />
        </View>
      </View>
    </ScreenLayout>
  );
}
