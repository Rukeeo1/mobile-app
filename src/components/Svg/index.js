import * as React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';

export default function SvgComponent(props) {
  return (
    <Svg height='50%' width='50%' viewBox='0 0 100 100' {...props}>
      {props.children}
    </Svg>
  );
}
