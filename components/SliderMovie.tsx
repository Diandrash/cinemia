import { Movie } from '@/types/movie';
import { Dimensions, FlatList, Text, View, ViewToken } from 'react-native';
import SliderItemMovie from './SliderItemMovie';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Pagination } from 'react-native-snap-carousel';
import PaginationMovie from './PaginationMovie';
import { useRef, useState } from 'react';

type SliderMovieProps = {
  data: Array<string>;
};

const SliderMovie = (props: SliderMovieProps) => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState<number>(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

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
        data={props.data}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => (
          <SliderItemMovie item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
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
