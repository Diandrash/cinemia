import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

type PaginationMovieProps = {
  items: Array<string>;
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const PaginationMovie = (props: PaginationMovieProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.items.map((_, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: props.paginationIndex === index ? 'red' : '#aaa',
              height: 8,
              width: 8,
              marginHorizontal: 2,
              borderRadius: 8,
            }}
          ></View>
        );
      })}
    </View>
  );
};

export default PaginationMovie;
