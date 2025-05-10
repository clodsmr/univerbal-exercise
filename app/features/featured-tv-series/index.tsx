import { Poster } from '@/ui/poster';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../domain/type';
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { featuredTvSeries$ } from './state';
import { useAtom } from 'jotai';
import { Rating } from '@/ui/rating';
import { seriesId$ } from '@/screens/Details/TvSeriesDetailsScreen/state';
import { TVSeries } from 'domain/tv-series';



export function FeaturedTvSeries() {
  const [featuredTvSeries] = useAtom(featuredTvSeries$);
  const [seriesId, setSeriesId] = useAtom(seriesId$);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

  const handlePress = (item: TVSeries) => {
    setSeriesId(item.id)
    navigation.navigate('TvSeriesDetails', { id: item.id, series: item });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Featured TV Series</Text>
      <FlatList
        data={featuredTvSeries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Entry
            title={item.title}
            rating={item.rating}
            seasons={item.seasons}
            onPress={() => handlePress(item)} 
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function Entry({ title, rating, seasons, onPress }: any) {
  return (
    <Pressable onPress={onPress} style={entryStyles.card}>
      <Poster
        title={title}
        style={entryStyles.poster}
        src={
          'https://img.posterstore.com/zoom/wb0074-8friends-milkshake50x70.jpg?auto=compress%2Cformat&fit=max&w=3840'
        }
      />
      <View style={entryStyles.overlay}>
        <Text style={entryStyles.title} numberOfLines={1}>
          {title}
        </Text>
        <Rating value={rating} />
        <Text style={entryStyles.seasons}>{seasons.length} Seasons</Text>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  root: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  listContent: {
    gap: 16,
  },
});

const entryStyles = StyleSheet.create({
  card: {
    width: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
  },
  poster: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    padding: 8,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  seasons: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
  },
});
