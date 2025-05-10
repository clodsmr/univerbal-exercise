import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/home';
import FavoritesScreen from '@/screens/favorites';
import TopRatedScreen from '@/screens/top-rated';
import MovieDetailsScreen from '@/screens/Details/MovieDetailsScreen'
import TvSeriesDetailsScreen from '@/screens/Details/TvSeriesDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
import { appRouteNames } from '@/routes';
import { z } from 'zod';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_IP: z.string().ip(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4),
});

const result = envSchema.safeParse(process.env);
if (result.error) {
  console.error(result.error);
}
console.info('[app]: ENV', result.data);

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" animated />

      <Stack.Navigator>
        {/* Main Tab Navigator */}
        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator initialRouteName={appRouteNames.root}>
              <Tab.Screen
                name="tab-home"
                component={HomeScreen}
                options={{
                  tabBarLabel: () => null,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="tab-top-rated"
                component={TopRatedScreen}
                options={{
                  tabBarLabel: () => null,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="star" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="tab-favorites"
                component={FavoritesScreen}
                options={{
                  tabBarLabel: () => null,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="heart" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        {/* Detail Screens */}
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{ title: 'Movie Details' }}
        />
        <Stack.Screen
          name="TvSeriesDetails"
          component={TvSeriesDetailsScreen}
          options={{ title: 'TV Series Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
