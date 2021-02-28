import React from "react";
import { TouchableOpacity, Text } from "react-native";

// todo: cater for props.children in cases where button needs to be wrapped around other components
/**
 * todo:
 * 1. cater for props.children in cases where button needs to be wrapped around other components
 * 2. Takecare of loading indicator
 * 3. Make Provision for Icons (1. might suffice though)
 * 4. Extend button props for other cases...
 * 5. This should be a default export if it's all that's being exported.
 *
 */
export const Button = ({ title, color = "#000", coverStyle, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        height: 50,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 20,

        ...coverStyle,
      }}
    >
      <Text style={{ color, fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );
};
