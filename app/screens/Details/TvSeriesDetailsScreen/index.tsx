import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TvSeriesDetailsScreen({ route }: { route: any }) {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text>TV Series ID: {id}</Text>
      <Text>TV Series Title: {title}</Text>
      {/* You can display more detailed info here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
