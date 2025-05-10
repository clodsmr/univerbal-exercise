import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';


export function Rating({ value, max = 100}: { value: number, max?: number }) {
  if (typeof value !== 'number') return null;

  const percentage = Math.round((value / max) * 100);
  return (
    <View style={styles.container}>
       <Ionicons name="thumbs-up" size={12} color={'#fff'} style={styles.icon} />
      <Text style={styles.text}>{percentage}%</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});