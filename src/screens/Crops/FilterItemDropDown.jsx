import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';

import { GradientButton, Input } from '../../components/';

import constants from '../../constants';

const { colors, months, screenWidth } = constants;

export const FilterItemDropDown = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownItems] = useState(false);
  const [menuToGrowButtonStyle, setMenuToGrowButtonStyle] = useState({
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  });
  const [selectedItems, setSelectedItems] = useState('');

  let _menu = null;

  let setMenuRef = (ref) => {
    _menu = ref;
  };

  let hideMenu = () => {
    _menu.hide();
    setShowDropDown(false);
    setMenuToGrowButtonStyle({
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    });

  };

  let showMenu = () => {
    if (!showDropDownItems) {
      _menu.show();
      setMenuToGrowButtonStyle({
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      });
    } else {
      setShowDropDown(false);
    }
  };

  const handleSelectedItem = (item) => {
    hideMenu();
    setSelectedItems(item);
  };

  return (
    <View>
      {!showDropDown && (
        <GradientButton
          gradient={[colors.red, colors.redDeep]}
          title='Grow in February'
          onPress={() => setShowDropDown(!showDropDown)}
        />
      )}
      {showDropDown && (
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={[styles.menuToGrow, menuToGrowButtonStyle, { width: 172.5 }]}
            onPress={showMenu}
          >
            <Text style={{ color: colors.green, fontWeight: '500' }}>
              Month to Grow
            </Text>
            <TouchableOpacity onPress={showMenu}>
              {showDropDownItems ? (
                <AntDesign name='up' size={16} color={colors.green} />
              ) : (
                <AntDesign name='down' size={16} color={colors.green} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <Menu
            ref={setMenuRef}
            style={{
              width: 172.5,
              marginTop: -10,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            }}
            button={
              <Text
                onPress={showMenu}
                style={{ color: colors.white, width: '100%' }}
              ></Text>
            }
            onHidden={() =>
              setMenuToGrowButtonStyle({
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              })
            }
          >
            <ScrollView
              style={{
                height: 100,
                width: '100%',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: 'transparent',
              }}
            >
              {months.map((month) => (
                <MenuItem
                  style={{ marginLeft: screenWidth * 0.045, color: 'red' }}
                  key={month}
                  onPress={() => handleSelectedItem(month)}
                >
                  <Text
                    style={{
                      color: selectedItems === month ? colors.pink : 'black',
                    }}
                  >
                    {month}
                  </Text>
                </MenuItem>
              ))}
            </ScrollView>
          </Menu>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuToGrow: {
    height: 50,
    marginTop: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default FilterItemDropDown;
