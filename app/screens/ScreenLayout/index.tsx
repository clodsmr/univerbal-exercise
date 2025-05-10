import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function ScreenLayout({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5, 
    backgroundColor: '#25292f',
    color: 'white'
  },
});
