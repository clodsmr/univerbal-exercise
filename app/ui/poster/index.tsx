import {
  View,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type PosterProps = {
  title: string;
  src: string;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Poster(props: PosterProps) {
  return (
    <View style={[styles.wrapper, props.style]}>
     
      {props.isFavorite && (
        <Ionicons
          name="star"
          size={20}
          color="yellow"
          style={styles.starIcon}
        />
      )}

 
      {props.onFavoritePress && (
        <Pressable
          style={styles.button}
          onPress={props.onFavoritePress}
        >
          <Ionicons
            name={props.isFavorite ? 'remove' : 'add'}
            size={12}
            color="black"
          />
        </Pressable>
      )}

    
      <Image
        accessibilityLabel={props.title}
        style={styles.image}
        source={{ uri: props.src }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 140,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  starIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  button: {
    position: 'absolute',
    top: 36,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
