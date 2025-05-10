import { loadable } from 'jotai/utils';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { show$ } from './state';
import { useAtomValue } from 'jotai';

export default function TvSeriesDetailsScreen({ route }: { route: any }) {
  const { id } = route.params;
  const show = useAtomValue(loadable(show$))
  
    if (!show) {
      return (
        <View style={styles.container}>
          <Text>Tv series details not found.</Text>
        </View>
      );
    }

    
  return (
     <ScrollView contentContainerStyle={styles.container}>
   {show.state === 'hasData' && show.data !== undefined ?
   <>
        <Image
        source={{ uri: "https://m.media-amazon.com/images/S/pv-target-images/e56c18e08e0a07c8d4ee65f45be64cefe6b070992a84182dd5ba35eb7cfc6510.jpg"}}
        style={styles.image}
        />
       <Text style={styles.title}>{show.data?.title}</Text>
       <Text style={styles.director}>Seasons: {show.data?.seasons?.length}</Text>
       <Text style={styles.genres}>Genres: {show.data?.genres.join(', ')}</Text>
     </> : <Text style={styles.title}>TV series not found</Text>
     }
 
     </ScrollView>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'flex-start',
     alignItems: 'center',
     padding: 20,
     backgroundColor: '#fff',
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
   },
   director: {
     fontSize: 18,
     color: '#555',
     marginBottom: 10,
   },
   genres: {
     fontSize: 16,
     color: '#777',
   },
 });
 