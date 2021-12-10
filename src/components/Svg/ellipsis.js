import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgEllipsis(props) {
    const ellipsis = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 72 54" style="fill:#FFFFFF;" xml:space="preserve">
<g class="st0">
 <path class="st1" d="M28.8,16c0,0.5-0.1,0.9-0.3,1.3c-0.2,0.4-0.6,0.7-1,1c-0.4,0.2-0.9,0.4-1.4,0.4c-0.8,0-1.4-0.3-1.9-0.8
  s-0.8-1.2-0.8-1.9c0-0.7,0.3-1.4,0.8-1.9s1.2-0.8,1.9-0.8s1.4,0.3,1.9,0.8S28.8,15.2,28.8,16z M38.7,16c0,0.5-0.1,0.9-0.4,1.3
  c-0.2,0.4-0.6,0.7-1,1c-0.4,0.2-0.8,0.4-1.3,0.4c-0.8,0-1.4-0.3-1.9-0.8s-0.8-1.2-0.8-1.9c0-0.7,0.3-1.4,0.8-1.9s1.2-0.8,1.9-0.8
  s1.4,0.3,1.9,0.8S38.7,15.2,38.7,16z M48.6,16c0,0.4-0.1,0.7-0.2,1.1c-0.1,0.3-0.3,0.6-0.6,0.8c-0.2,0.2-0.5,0.4-0.8,0.6
  c-0.3,0.1-0.7,0.2-1.1,0.2c-0.8,0-1.4-0.3-1.9-0.8s-0.8-1.2-0.8-1.9c0-0.7,0.3-1.4,0.8-1.9s1.2-0.8,1.9-0.8s1.4,0.3,1.9,0.8
  C48.4,14.6,48.6,15.2,48.6,16z"/>
</g>
</svg>`;
    const EllipsisSvg = () => (
        <SvgXml xml={ellipsis} height="100%" width="100%"/>
    );
    return <EllipsisSvg />;
}
