import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';
import { Suspense, type ReactNode } from 'react';
import { View } from 'react-native';
import ScreenLayout from '../ScreenLayout';

export default function HomeScreen(): ReactNode {
  return (
    <ScreenLayout>
    <View>
      <View style={{ marginBottom: 40 }}>
        <Search />
      </View>

    {/*   <FeaturedMovies style={{ marginBottom: 40 }} />  */}
        <FeaturedTvSeries />    
    </View>
    </ScreenLayout>
  );
}
