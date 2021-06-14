import React from 'react';
import { View, StyleSheet } from 'react-native';

import { GradientButton as Button, Text } from '../../components';

import constants from '../../constants/';
import { act } from "react-dom/test-utils";

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

  let checkIndexActive = [];
  checkIndexActive.push(monthsAbr.indexOf(activeMonths[0])); //3
  checkIndexActive.push(monthsAbr.indexOf(activeMonths[1])); //6
  checkIndexActive.push(monthsAbr.indexOf(activeMonths[2]));
  checkIndexActive.push(monthsAbr.indexOf(activeMonths[3])); //activeMonths?.(function(e) { return e.name; }).indexOf(activeMonths);


  // console.log({activeMonths});
  // console.log({checkIndexActive});
  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.monthStrip}>
        {monthsAbr.map((item, index) => (
          <View
            style={[
              styles.montStripItem,
              index >= checkIndexActive[0] && index <= checkIndexActive[1] && ({ backgroundColor: colors.blue }),
              index >= checkIndexActive[2] && index <= checkIndexActive[3] && ({ backgroundColor: colors.blue100 }),
              // activeMonths?.includes(item) && { backgroundColor: colors.blue },
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
            marginLeft: 20
          }}
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
