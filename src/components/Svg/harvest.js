import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgHarvest(props) {
  const harvest = `<svg xmlns="http://www.w3.org/2000/svg" width="21.538" height="48.405" viewBox="0 0 15.538 68.405">
  <g id="Group_599" data-name="Group 599" transform="translate(-1.5 10.5)">
    <rect id="Rectangle_53" data-name="Rectangle 53" width="6.914" height="19.166" rx="3.457" transform="translate(6.357)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
    <path id="Path_32" data-name="Path 32" d="M0,0V8.9" transform="translate(8.092 19.166)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-width="1"/>
    <path id="Path_33" data-name="Path 33" d="M0,8.9V0" transform="translate(11.536 19.166)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-width="1"/>
    <path id="Path_20" data-name="Path 20" d="M418.452-413.816h9v8.512c0,10.025-10.269,15.083-10.269,15.083h0s-10.269-5.058-10.269-15.083v-8.512h8.092" transform="translate(-406.916 437.627)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
  </g>
</svg>`;
  const HarvestSvg = () => <SvgXml xml={harvest} height="100%" width="100%" />;
  return <HarvestSvg />;
}
