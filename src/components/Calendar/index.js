import React from 'react';
import { SegmentedControlIOSBase } from 'react-native';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const GrowCalendar = () => {
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  const renderDayItem = ({ item, type }) => (
    <TouchableOpacity style={styles.renderItemView}>
      <Text style={styles.renderItemCommon}>{item}</Text>
    </TouchableOpacity>
  );
  const years = [2019, 2020, 2021, 2021];

  return (
    <View style={{ flexDirection: 'row', height: 200 }}>
      <ScrollView>
        {days.map((item) => (
          <React.Fragment>{renderDayItem({ item })}</React.Fragment>
        ))}
      </ScrollView>
      {/* <FlatList
        data={days}
        renderItem={({ item }) => renderDayItem({ item, styleType: 'day' })}
        keyExtractor={(item) => item}
        // style={{ height: 200 }}
      /> */}
      <FlatList
        data={months}
        renderItem={renderDayItem}
        keyExtractor={(item) => item}
        // style={{ height: 200 }}
      />
      <FlatList
        data={months}
        renderItem={renderDayItem}
        keyExtractor={(item) => item}
        // style={{ height: 200, }}
      />
      <View
        style={{
          backgroundColor: 'green',
          height: 50,
          width: '100%',
          position: 'absolute',
          top: 75,
        }}
      />
    </View>
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
});

export default GrowCalendar;
