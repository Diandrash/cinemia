import SliderMovie from '@/components/SliderMovie';
import { getPopularMovies } from '@/services/api';
import { Movie } from '@/types/movie';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ICarouselInstance } from 'react-native-reanimated-carousel';

export default function HomeScreen() {
  const [popularMovies, setPopularMovies] = useState<Array<Movie>>([]);

  const imageURLs = popularMovies.slice(0, 8).map((movie) => {
    const path = `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`;
    return path;
  });

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
        // padding: 20,
      }}
    >
      <View
        className="top-info"
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          Cinemia
        </Text>
      </View>
      <SliderMovie data={imageURLs} />
    </ImageBackground>
  );
}
