import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import constants from '../../constants';

const { colors } = constants;

// or any pure javascript modules available in npm
import SmoothPicker from 'react-native-smooth-picker';

const dataCity = [
  'Paris',
  'Berlin',
  'Lisbonne',
  'Budapest',
  'Londres',
  'Prague',
  'Rome',
  'Barcelone',
  'Amsterdam',
  'Dublin',
  'Vienne',
  'Madrid',
  'Cracovie',
  'Reykjavik',
  'Istambul',
  'Florence',
  'Copenhague',
  'Zagreb',
  'Stockholm',
  'Thessalonique',
  'Marseille',
  'Porto',
  'Lugano',
  'Bruxelles',
  'Lyon',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  // 0: 20,
  0: 16,
  // 1: 15,
  1: 14,
  2: 10,
};

const Item = React.memo(
  ({
    opacity,
    selected,
    vertical,
    fontSize,
    name,
    activeItemContainerStyle = {},
  }) => {
    return (
      <View
        style={[
          styles.OptionWrapper,
          activeItemContainerStyle,
          {
            opacity,
            borderColor: selected ? 'grey' : 'transparent',
            backgroundColor: colors.white,

            width: vertical ? 'auto' : 'auto', // bad...left it like this for now...would fix
          },
          selected
            ? {
                // shadow iOS
                shadowColor: 'grey',
                shadowOffset: {
                  width: 0.5,
                  height: 0.4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 15,
              }
            : null,
        ]}
      >
        <Text style={{ fontSize, color: selected ? colors.pink : 'black' }}>{name}</Text>
      </View>
    );
  }
);

const ItemToRender = (
  { item, index },
  indexSelected,
  vertical,
  activeItemContainerStyle
) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
      index={indexSelected}
      activeItemContainerStyle={activeItemContainerStyle}
    />
  );
};

export const GrowCalendar = ({ data, activeItemContainerStyle }) => {
  const [selected, setSelected] = React.useState(4);

  function handleChange(index) {
    setSelected(index);
  }
  return (
    <React.Fragment>
      <View style={styles.wrapperVertical} keyboardShouldPersistTaps='always'>
        <SmoothPicker
          initialScrollToIndex={selected}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={data}
          scrollAnimation
          onSelected={({ item, index }) => handleChange(index)}
          renderItem={(option) =>
            ItemToRender(option, selected, true, activeItemContainerStyle)
          }
          magnet
          selectOnPress
          key={1}
        />
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  renderItemView: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    zIndex: 2323,
  },
  renderItemText: {},
  //
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapperVertical: {
    width: '30%',
    height: 350,
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 'auto',
    color: 'black',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // paddingLeft: 30,
    // paddingRight: 30,
    height: 50,
    width: '100%',
    // borderWidth: 3,
    // borderRadius: 10,
  },
});

export default GrowCalendar;
