import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgCalendar(props) {
  const calendar = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
viewBox="0 0 62 32" style="fill:#79A700;" xml:space="preserve">
<g id="Group_467" transform="translate(13 0)">
<g class="st0">
 <path class="st1" d="M8.9,27.3c-2.7,0-4-1.3-4-3.9V8.1c0-2.6,1.3-3.9,4-3.9h17.1c2.7,0,4,1.3,4,3.9v15.4c0,2.6-1.3,3.9-4,3.9H8.9z
   M8.8,25.3h17.5c1.2,0,1.8-0.6,1.8-1.8V11.7c0-1.2-0.6-1.8-1.8-1.8H8.8C7.6,9.9,7,10.5,7,11.7v11.8C7,24.7,7.6,25.3,8.8,25.3z
   M10.9,18.6c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5h0.8c0.4,0,0.6,0.2,0.6,0.5V18c0,0.4-0.2,0.6-0.6,0.6H10.9z
   M10.9,22.7c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5h0.8c0.4,0,0.6,0.2,0.6,0.5v0.8c0,0.4-0.2,0.6-0.6,0.6H10.9z
   M15,14.5c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.6,0.6-0.6h0.8c0.4,0,0.6,0.2,0.6,0.6v0.8c0,0.4-0.2,0.6-0.6,0.6H15z M15,18.6
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5h0.8c0.4,0,0.6,0.2,0.6,0.5V18c0,0.4-0.2,0.6-0.6,0.6H15z M15,22.7
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5h0.8c0.4,0,0.6,0.2,0.6,0.5v0.8c0,0.4-0.2,0.6-0.6,0.6H15z M19.2,14.5
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.6,0.6-0.6H20c0.4,0,0.6,0.2,0.6,0.6v0.8c0,0.4-0.2,0.6-0.6,0.6H19.2z M19.2,18.6
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5H20c0.4,0,0.6,0.2,0.6,0.5V18c0,0.4-0.2,0.6-0.6,0.6H19.2z M19.2,22.7
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5H20c0.4,0,0.6,0.2,0.6,0.5v0.8c0,0.4-0.2,0.6-0.6,0.6H19.2z M23.4,14.5
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.6,0.6-0.6h0.7c0.4,0,0.6,0.2,0.6,0.6v0.8c0,0.4-0.2,0.6-0.6,0.6H23.4z M23.4,18.6
  c-0.4,0-0.6-0.2-0.6-0.6v-0.8c0-0.4,0.2-0.5,0.6-0.5h0.7c0.4,0,0.6,0.2,0.6,0.5V18c0,0.4-0.2,0.6-0.6,0.6H23.4z"/>
</g>
</g>
</svg>`;
  const CalendarSvg = () => (
    <SvgXml xml={calendar} height="100%" width="100%" />
  );
  return <CalendarSvg />;
}
