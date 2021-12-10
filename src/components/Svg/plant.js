import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgPlant(props) {
  const plant = `<svg xmlns="http://www.w3.org/2000/svg" width="33.275" height="45.28" viewBox="0 0 15.538 68.405">
  <g id="Group_598" data-name="Group 598" transform="translate(-479.965 360.731)">
    <path id="Path_30" data-name="Path 30" d="M483.458-303.053c3.114-13.211-6.7-14-2.083-26.42,0,0,7.652.722,11.693-3.753s1.733-14,1.733-14-18.48,3.609-13.426,17.758" transform="translate(6.282 0)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
    <path id="Path_31" data-name="Path 31" d="M469.465-334.852s1.156,8.086,6.5,10.828,11.9,0,11.9,0a13.549,13.549,0,0,0-7.421-9.962C473.8-337.162,469.465-334.852,469.465-334.852Z" transform="translate(0 6.822)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
  </g>
</svg>`;
  const PlantSvg = () => <SvgXml xml={plant} height="100%" width="100%" />;
  return <PlantSvg />;
}
