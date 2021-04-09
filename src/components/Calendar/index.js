import React from 'react';
import SmoothPicker from 'react-native-smooth-picker';

import { View, Text, StyleSheet } from 'react-native';
import constants from '../../constants';

const { colors } = constants;



const opacities = {
  0: 1,
  1: 1,
  2: 0,
  3: 0,
  4: 0,

};
const sizeText = {
  0: 16,
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
            backgroundColor: 'transparent',

            width: vertical ? 'auto' : 'auto', // bad...left it like this for now...would fix
          },
        ]}
      >
        <Text style={{ fontSize, color: selected ? colors.pink : 'black' }}>
          {name}
        </Text>
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

export const GrowCalendar = ({
  data,
  activeItemContainerStyle,
  onSelectItem,
}) => {
  const [selected, setSelected] = React.useState(4);

  function handleChange(index, item) {
    setSelected(index);
    onSelectItem(item);
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
          onSelected={({ item, index }) => handleChange(index, item)}
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
    color: 'black',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    width: '100%',
  },
});

export default GrowCalendar;
