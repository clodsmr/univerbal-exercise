import { ReactNode } from 'react';
import {
  FlatList,
  StyleProp,
  View,
  ViewStyle,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from '../rating';

type ListProps = {
  style?: StyleProp<ViewStyle>;
  data: { id: string; title: string; rating: number }[];
};

export function List({ style, data }: ListProps): ReactNode {
  return (
    <FlatList
      style={style}
      data={data}
      keyExtractor={(it) => it.id}
      renderItem={(it) => {
        return (
          <ListEntry
            style={undefined}
            rating={it.item.rating}
            title={it.item.title}
          />
        );
      }}
    />
  );
}

type ListEntryProps = {
  style: any | undefined;
  title: string;
  rating: number;
};

function ListEntry({ style, title, rating }: ListEntryProps): ReactNode {
  const isHighlighted = rating > 75;
  const styles = getListEntryStyle();

  return (
    <View style={[styles.card, style]}>
      {isHighlighted && (
        <Ionicons
          name="star"
          size={20}
          color="#fff"
          style={styles.starIcon}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Rating value={rating} />
    </View>
  );
}

const getListEntryStyle = () => {
  return StyleSheet.create({
    card: {
      padding: 16,
      marginBottom: 12,
      borderRadius: 10,
      backgroundColor: '#1e1e1e',
      borderWidth: 1,
      borderColor: '#1e1e1e',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      position: 'relative',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#fff',
    },
    starIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
  });
};
