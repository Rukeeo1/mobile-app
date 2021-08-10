import * as React from "react";
import { SvgXml } from "react-native-svg";
// import bell from '../../assets/svgs/bell.svg';

export default function SvgComponent(props) {
  const bell = `<svg xmlns="http://www.w3.org/2000/svg" width="61" height="41.5" viewBox="0 0 61 41.5">
  <g id="Group_673" data-name="Group 673" transform="translate(-352 -292)">
    <text id="house_fill" transform="translate(352 292)" fill="#dbfa87" font-size="30" font-family="Framework7-Icons, Framework7 Icons"><tspan x="15.5" y="27">bell</tspan></text>
    <circle id="Ellipse_39" data-name="Ellipse 39" cx="2.5" cy="2.5" r="2.5" transform="translate(380 328.5)" fill="#fff"/>
  </g>
</svg>`;
  const SmileSvg = () => <SvgXml xml={bell} height="50%" width="50%" />;
  return <SmileSvg />;
}
