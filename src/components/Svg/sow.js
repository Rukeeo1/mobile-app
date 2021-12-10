import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgSow(props) {
  const sow = `<svg xmlns="http://www.w3.org/2000/svg" width="23.102" height="49.43" viewBox="0 0 15.538 68.405">
  <g id="Group_418" data-name="Group 418" transform="translate(-392.232 433.338)">
    <path id="Path_25" data-name="Path 25" d="M402.653-411.558a7.329,7.329,0,0,0-5.224-2.388,7.171,7.171,0,0,0-4.839,2.017c2.119,4.4,4.839,15.081,4.839,15.081S400.38-407.336,402.653-411.558Z" transform="translate(3.352 11.573)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
    <path id="Path_26" data-name="Path 26" d="M397.753-402.373s3.849-5.341,1.358-11.51c0,0-7.7-1.973-6.71-9.868,0,0,5.352-1.158,7.7,6.61" transform="translate(3.029 0)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
    <path id="Path_27" data-name="Path 27" d="M406.006-411.639c-2.273,4.222-5.224,14.709-5.224,14.709s-2.721-10.685-4.839-15.081c-.68-1.408-1.3-2.184-1.745-1.741a16.849,16.849,0,0,0-4.466,11.889c0,8.175,4.946,14.8,11.05,14.8s11.052-6.626,11.052-14.8a17.144,17.144,0,0,0-3.948-11.337C407.414-413.73,406.747-413.013,406.006-411.639Z" transform="translate(0 11.655)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
  </g>
</svg>`;
  const SowSvg = () => <SvgXml xml={sow} height="100%" width="100%" />;
  return <SowSvg />;
}
