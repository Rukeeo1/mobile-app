import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Menu, { MenuItem } from "react-native-material-menu";

import { GradientButton } from "../../components/";

import constants from "../../constants";

const { colors, screenWidth } = constants;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const FilterItemDropDown = ({
  items,
  activeItem,
  onSelect,
  placeholder,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownItems] = useState(false);
  const [menuToGrowButtonStyle, setMenuToGrowButtonStyle] = useState({
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  });
  const [selectedItems, setSelectedItems] = useState(activeItem);

  let _menu = null;

  let setMenuRef = (ref) => {
    _menu = ref;
  };

  let hideMenu = () => {
    // _menu.hide();
    setShowDropDown(false);
    setMenuToGrowButtonStyle({
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    });

    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300,
    });
  };

  let showMenu = () => {
    if (!showDropDown) {
      // _menu.show();
      // setMenuToGrowButtonStyle({
      //   borderBottomLeftRadius: 0,
      //   borderBottomRightRadius: 0,
      // });
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }

    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300,
    });
  };

  const handleSelectedItem = (item) => {
    hideMenu();
    setSelectedItems(item);
    onSelect(item);
  };

  return (
    <View style={{ marginHorizontal: 5 }}>
      {!showDropDown && (
        <GradientButton
          gradient={[colors.red, colors.redDeep]}
          title={activeItem}
          onPress={() => setShowDropDown(!showDropDown)}
          coverStyle={{ width: "100%", marginTop: 10 }}
          textStyle={{
            color: "#ffffff",
            fontWeight: "normal",
            fontFamily: "Hero-New-Medium",
            fontSize: 14,
          }}
          activeOpacity={1}
        />
      )}
      {showDropDown && (
        <View style={{ width: "100%", marginTop: 10 }}>
          <TouchableOpacity
            style={[
              styles.menuToGrow,
              {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}
            onPress={showMenu}
          >
            <Text
              style={{ color: colors.green, fontWeight: "500", fontSize: 14 }}
            >
              {activeItem ?? placeholder}
            </Text>
            <TouchableOpacity onPress={showMenu}>
              {showDropDownItems ? (
                <AntDesign name="up" size={16} color={colors.green} />
              ) : (
                <AntDesign name="down" size={16} color={colors.green} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          {showDropDown && (
            <View
              style={{
                backgroundColor: "#fff",
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}
            >
              {items.map((month) => (
                <TouchableOpacity
                  // style={{ marginLeft: screenWidth * 0.045, color: 'red' }}
                  key={month}
                  onPress={() => handleSelectedItem(month)}
                  style={{ paddingVertical: 5 }}
                >
                  <Text
                    style={{
                      color: selectedItems === month ? colors.pink : "black",
                      fontSize: 14,
                    }}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* <Menu
            ref={setMenuRef}
            style={{
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
              {items.map((month) => (
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
          </Menu> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuToGrow: {
    height: 50,
    paddingHorizontal: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default FilterItemDropDown;
