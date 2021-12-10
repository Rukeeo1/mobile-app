import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgPencil(props) {
    const pencil = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink" 
x="0px" y="0px" viewBox="0 0 59.79 56.076">
  <path id="Path_412" data-name="Path 412" 
  d="M50.938,13.109l-2.969-2.969L49.688,8.5q1.328-1.328,2.5-.156l.547.547a1.649,1.649,0,0,1-.156,2.578ZM31.172,32.8l-3.828,1.484a.586.586,0,0,1-.7-.7l1.563-3.75L46.484,11.547l2.969,2.969Z" transform="translate(-525.955 -16.218)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/>
</svg>`;
    const PencilSvg = () => (
        <SvgXml xml={pencil} height="100%" width="100%"/>
    );
    return <PencilSvg />;
}
