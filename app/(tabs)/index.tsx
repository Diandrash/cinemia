import { getPopularMovies } from '@/services/api';
import { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

export default function HomeScreen() {
  const [popularMovies, setPopularMovies] = useState<Array<Movie>>([]);
  const navLinks = ['Home', 'About', 'Services', 'Contact Us'];

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        console.log(data);
        setPopularMovies(data.results);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const { width, height } = Dimensions.get('window');

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={{
        flex: 1,
        width,
        height,
        padding: 20,
      }}
    >
      <View className="top-info">
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          Cinemia
        </Text>

        <ScrollView
          horizontal
          contentContainerStyle={{ paddingVertical: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          {popularMovies.map((movie) => {
            const imagePath = `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`;
            return (
              <Image
                source={{ uri: imagePath }}
                style={{
                  width: width * 0.53,
                  height: 400,
                  marginHorizontal: 5,
                  borderRadius: 10,
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
