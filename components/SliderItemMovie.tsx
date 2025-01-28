import { Movie } from '@/types/movie';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Dimensions, Image, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type SliderItemMovieProps = {
  item: Movie;
  index: number;
  scrollX: SharedValue<number>;
};

const SliderItemMovie = (props: SliderItemMovieProps) => {
  const { width, height } = Dimensions.get('screen');

  const reAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            props.scrollX.value,
            [
              (props.index - 1) * width,
              props.index * width,
              (props.index + 1) * width,
            ],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            props.scrollX.value,
            [
              (props.index - 1) * width,
              props.index * width,
              (props.index + 1) * width,
            ],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
          width,
        },
        reAnimatedStyle,
      ]}
    >
      <Link
        href={{
          pathname: '/(tabs)/details/[id]',
          params: { id: props.item.id },
        }}
      >
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${props.item.poster_path}`,
          }}
          style={{
            width: 260,
            height: 400,
            borderRadius: 10,
          }}
        />
      </Link>
    </Animated.View>
  );
};

export default SliderItemMovie;
