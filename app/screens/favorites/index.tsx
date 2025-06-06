import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import { View, Text } from 'react-native';
import MovieScreen from '@/screens/movie';
import TvSeriesScreen from '@/screens/tv-series';
import ScreenLayout from '../ScreenLayout';

const FavoritesStack = createNativeStackNavigator();

const initialRouteName = 'favorites-root';

export default function FavoritesScreen(): ReactNode {
  return (

    <FavoritesStack.Navigator initialRouteName={initialRouteName}  screenOptions={{ headerShown: false }} >
      <FavoritesStack.Screen name={initialRouteName} component={Screen} />
      <FavoritesStack.Screen name="favorites-movies" component={MovieScreen} />
      <FavoritesStack.Screen
        name="favorites-tv-series"
        component={TvSeriesScreen}
      />
    </FavoritesStack.Navigator>

  );
}

function Screen(): ReactNode {
  return (
    <ScreenLayout>
      <View>
        <Text>favorite movie</Text>
      </View>
    </ScreenLayout>
  );
}
