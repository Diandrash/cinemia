import { Movie } from '@/types/movie';
import { Dimensions, FlatList, Text, View, ViewToken } from 'react-native';
import SliderItemMovie from './SliderItemMovie';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { Pagination } from 'react-native-snap-carousel';
import PaginationMovie from './PaginationMovie';
import { useEffect, useRef, useState } from 'react';

type SliderMovieProps = {
  data: Array<string>;
};

const SliderMovie = (props: SliderMovieProps) => {
  const { width, height } = Dimensions.get('window');

  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState<number>(0);
  const [movieData, setMovieData] = useState<Array<string>>(props.data);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // useEffect(() => {
  //   if (isAutoPlay) {
  //     interval.current = setInterval(() => {
  //       offset.value = offset.value + width;
  //     }, 5000);
  //   } else {
  //     clearInterval(interval.current);
  //   }

  //   return () => {
  //     clearInterval(interval.current);
  //   };
  // }, [isAutoPlay, offset, width]);

  // useDerivedValue(() => {
  //   scrollTo(ref, offset.value, 0, true);
  // });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View>
      <Animated.FlatList
        // ref={ref}
        data={movieData}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => (
          <SliderItemMovie item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onEndReached={() => setMovieData([...movieData, ...props.data])}
        // onEndReachedThreshold={0.5}
      />

      <PaginationMovie
        items={props.data}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
      />
    </View>
  );
};

export default SliderMovie;
