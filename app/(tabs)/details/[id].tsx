import { getMovieDetail, getMovieReviews } from '@/services/api';
import { MovieDetail } from '@/types/movie.detail';
import { Review } from '@/types/review';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function Detail() {
  const route = useRoute();
  const { id } = useLocalSearchParams();

  const movieId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [reviews, setReviews] = useState<Array<Review>>([]);

  useEffect(() => {
    getMovieDetail(movieId).then((data) => setMovie(data));
    getMovieReviews(movieId).then((data) => setReviews(data.results));
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    // Hide the tab bar
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  const { width, height } = Dimensions.get('window');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: 'black',
      }}
    >
      <View
        style={{
          position: 'relative',
        }}
      >
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie?.backdrop_path}`,
          }}
          style={{
            width,
            height: 260,
          }}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.95)', 'rgba(0, 0, 0, 0.3)', 'transparent']}
          style={{
            position: 'absolute',
            width,
            height: 260,
            bottom: 0,
          }}
          start={{ x: 0.8, y: 1 }}
          end={{ x: 0.8, y: 0 }}
        />
      </View>

      <View
        style={{
          marginHorizontal: 20,
          flexDirection: 'column',
          gap: 60,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontWeight: 700,
            }}
          >
            {movie?.title}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                opacity: 0.8,
              }}
            >
              {moment(movie?.release_date).format('DD MMMM YYYY')}
            </Text>
            {movie && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {movie?.vote_average.toFixed(1)}
              </Text>
            )}
          </View>

          <Text
            style={{
              color: 'white',
              fontSize: 13,
              opacity: 0.5,
            }}
          >
            {movie?.overview}
          </Text>

          <Text
            style={{
              color: 'white',
              opacity: 0.5,
              fontSize: 10,
              marginTop: 40,
            }}
          >
            {movie?.genres.map((text) => text.name).join(', ')}
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Reviews {`(${reviews.length})`}
          </Text>

          {reviews.map((review, index) => {
            const profileImage = review.author_details.avatar_path
              ? `${process.env.EXPO_PUBLIC_IMAGE_URL}${review.author_details.avatar_path}`
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
            return (
              <View
                key={`${review.id}-${index}-detail`}
                style={{
                  //   flex: 1,
                  flexDirection: 'column',
                  gap: 15,
                  padding: 15,
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 10,
                  borderWidth: 0.5,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: profileImage,
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        {review.author ?? 'Anonymous'}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 400,
                          fontSize: 9,
                          opacity: 0.8,
                        }}
                      >
                        {moment(review.created_at).format('DD MMMM YYYY')}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      backgroundColor: 'white',
                      paddingHorizontal: 12,
                      alignItems: 'center',
                      height: 20,
                      borderRadius: 3,
                    }}
                  >
                    <FontAwesome name="star" size={10} color="black" />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      {review.author_details.rating}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    opacity: 0.8,
                  }}
                >
                  {review.content}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
    // </View>
  );
}
