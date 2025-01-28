import ScrollableMovie from '@/components/ScrollableMovie';
import SliderMovie from '@/components/SliderMovie';
import {
  getPlayingMovies,
  getPopularMovies,
  getTopMovies,
  getUpcomingMovies,
} from '@/services/api';
import { Movie } from '@/types/movie';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [popularMovies, setPopularMovies] = useState<Array<Movie>>([]);
  const [playingMovies, setPlayingMovies] = useState<Array<Movie>>([]);
  const [topMovies, setTopMovies] = useState<Array<Movie>>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Array<Movie>>([]);

  const imageURLs = popularMovies.slice(0, 8).map((movie) => {
    const path = `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`;
    return path;
  });

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((err) => {
        console.log({ err });
      });
    getPlayingMovies()
      .then((data) => {
        setPlayingMovies(data.results);
      })
      .catch((err) => {
        console.log({ err });
      });
    getTopMovies()
      .then((data) => {
        setTopMovies(data.results);
      })
      .catch((err) => {
        console.log({ err });
      });
    getUpcomingMovies()
      .then((data) => {
        setUpcomingMovies(data.results);
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
      {/* <View
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
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 40,
            paddingBottom: 20,
          }}
        >
          <SliderMovie data={popularMovies.slice(0, 8)} />
        </View>

        <ScrollableMovie label="Currently Showing" movies={playingMovies} />

        <ScrollableMovie label="Highly Rated" movies={topMovies} />

        <ScrollableMovie label="Upcoming Movies" movies={upcomingMovies} />
      </ScrollView>
    </ImageBackground>
  );
}
