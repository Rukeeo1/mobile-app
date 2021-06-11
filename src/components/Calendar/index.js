import React, { useEffect } from 'react';
import SmoothPicker from 'react-native-smooth-picker';
import ScrollPicker from 'react-native-picker-scrollview'

import { View, StyleSheet } from 'react-native';
import { Text } from '../../components';

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
    textColor = colors.black,
    activeTextColor = colors.pink,
  }) => {
    return (
      <View
        style={[
          styles.OptionWrapper,
          activeItemContainerStyle,
          {
            opacity,
            // borderColor: selected ? 'grey' : 'transparent',
            // borderWidth: 2,
            backgroundColor: 'transparent',
            width: 'auto',
          },
        ]}
      >
        <Text
          style={{ fontSize, color: selected ? activeTextColor : colors.black }}
          fontType={selected ? 'bold' : 'thin'}
        >
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
  activeItemContainerStyle,
  activeTextColor,
  textColor="#000"
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
      opacity={1}
      // opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={16}
      // fontSize={fontSize}
      name={item}
      index={indexSelected}
      activeItemContainerStyle={activeItemContainerStyle}
      textColor={textColor}
    />
  );
};

export const GrowCalendar = ({
  data,
  activeItemContainerStyle,
  onSelectItem,
  activeTextColor,
  textColor,
  defaultSelectedItem,
}) => {
  const [selected, setSelected] = React.useState(2);

  


  useEffect(() => {
    if (defaultSelectedItem) {
      setSelected(defaultSelectedItem);
    }
  }, [defaultSelectedItem]);

  function handleChange(index, item) {
    setSelected(index);
    onSelectItem(item);
  }
  return (
    <React.Fragment>
      <View style={styles.wrapperVertical} keyboardShouldPersistTaps='always'>
        {/* <SmoothPicker
          initialScrollToIndex={selected}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={data}
          scrollAnimation
          onSelected={({ item, index }) => handleChange(index, item)}
          offsetSelection={0}
          renderItem={(option) => {
            console.warn(option)
            return ItemToRender(
              option,
              selected,
              true,
              activeItemContainerStyle,
              activeTextColor,
              textColor
            )
          }}
          magnet
          selectOnPress
          key={1}
        /> */}
        <ScrollPicker
          // ref={(sp) => { this.sp = sp }}
          dataSource={data}
          selectedIndex={selected}
          wrapperColor="transparent"
          itemHeight={50}
          wrapperHeight={150}
          animateToSelectedIndex
          highlightColor={colors.white}
          renderItem={(option, index) => {
            // console.warn(option)
            return ItemToRender(
              { item: option, index },
              selected,
              true,
              activeItemContainerStyle,
              activeTextColor,
              textColor
            )
          }}
          onValueChange={(item, index) => {
            handleChange(index, item)
          }}
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
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrapperVertical: {
    width: '30%',
    height: 150,
    color: 'black',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // marginBottom: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    // height: 50,
    width: '100%',
  },
});

export default GrowCalendar;
