import { Movie } from '@/types/movie';
import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';

type ScrollableMovieProps = {
  label: string;
  movies: Array<Movie>;
};

const ScrollableMovie = (props: ScrollableMovieProps) => {
  return (
    <View
      className="now-playing-movies"
      style={{
        flexDirection: 'column',
        gap: 20,
        padding: 20,
        flex: 1,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {props.label}
      </Text>

      <ScrollView
        horizontal
        // contentContainerStyle={{ paddingVertical: 5 }}
        showsHorizontalScrollIndicator={false}
        style={{
          gap: 20,
        }}
      >
        {props.movies.map((movie, index) => (
          <Link
            key={index}
            href={{
              pathname: '/(tabs)/details/[id]',
              params: { id: movie.id },
            }}
            style={{
              marginRight: 10,
            }}
          >
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`,
              }}
              style={{
                width: 140,
                height: 220,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScrollableMovie;
