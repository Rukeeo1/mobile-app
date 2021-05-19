import React from 'react';
import { View, StyleSheet } from 'react-native';

import { GradientButton as Button, Text } from '../../components';

import constants from '../../constants/';

const { colors, months, screenHeight, screenWidth, monthsAbr } = constants;

const getMonthStripItemWidth = () => {
  return (screenWidth * 0.9) / 12;
};

export const MonthGraph = ({
  activeMonths,
  title,
  bottomTextOne,
  bottomTextTwo,
}) => {

  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.monthStrip}>
        {monthsAbr.map((item, index) => (
          <View
            style={[
              styles.montStripItem,
              activeMonths?.includes(item) && { backgroundColor: colors.blue },
              index === 0 && {
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              },
              index === months.length - 1 && {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              },
            ]}
            key={index}
          >
            <Text style={{ color: colors.white }}>{item[0]}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.blue,
          }}
        >
          {bottomTextOne}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.blue100,
          }}
          style={{ marginLeft: 20 }}
        >
          {bottomTextTwo}
        </Text>
      </View>
    </View>
  );
};

export default MonthGraph;

const styles = StyleSheet.create({
  monthStrip: {
    height: screenHeight * 0.02,
    borderRadius: 25,
    flexDirection: 'row',
    marginTop: 5,
  },
  montStripItem: {
    width: getMonthStripItemWidth(),
    alignItems: 'center',
    backgroundColor: colors.grey100,
    height: '100%',
  },
});
