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
  showRed = false,
}) => {
  const [showDropDownItems, setShowDropDownItems] = useState(false);
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
    // setShowDropDown(false);
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
    // hideMenu();
    setShowDropDownItems(false);
    setSelectedItems(item);
    onSelect(item);
  };

  return (
    <View style={{ marginHorizontal: 5 }}>
      {showRed && !showDropDownItems && (
        <GradientButton
          gradient={[colors.red, colors.redDeep]}
          // title={activeItem}
          onPress={() => setShowDropDownItems(true)}
          coverStyle={{ width: "100%", marginTop: 10 }}
          // textStyle={{
          //   color: "#ffffff",
          //   fontWeight: "normal",
          //   fontFamily: "Hero-New-Medium",
          //   fontSize: 14,
          // }}
          // activeOpacity={1}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                color: showRed ? "#fff" : colors.green,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              {activeItem ?? placeholder}
            </Text>
            <TouchableOpacity
              onPress={() => setShowDropDownItems(() => !showDropDownItems)}
            >
              {showDropDownItems ? (
                <AntDesign
                  name="up"
                  size={16}
                  color={showRed ? "#fff" : colors.green}
                />
              ) : (
                <AntDesign
                  name="down"
                  size={16}
                  color={showRed ? "#fff" : colors.green}
                />
              )}
            </TouchableOpacity>
          </View>
        </GradientButton>
      )}
      {(!showRed || showDropDownItems) && (
        <View style={{ width: "100%", marginTop: 10 }}>
          <TouchableOpacity
            style={[
              styles.menuToGrow,
              showDropDownItems && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}
            activeOpacity={1}
            // onPress={showMenu}
            onPress={() => setShowDropDownItems(() => !showDropDownItems)}
          >
            <Text
              style={{ color: colors.green, fontWeight: "600", fontSize: 15 }}
            >
              {activeItem ?? placeholder}
            </Text>
            <TouchableOpacity
              onPress={() => setShowDropDownItems(() => !showDropDownItems)}
            >
              {showDropDownItems ? (
                <AntDesign name="up" size={16} color={colors.green} />
              ) : (
                <AntDesign name="down" size={16} color={colors.green} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
      {showDropDownItems && (
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
    </View>
  );
};

const styles = StyleSheet.create({
  menuToGrow: {
    height: 50,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default FilterItemDropDown;
