import {SvgXml} from "react-native-svg";
import * as React from "react";

export default function SvgAddPost(props) {
    const addpost = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
viewBox="0 0 62 32" style="fill:#83B403;" xml:space="preserve">
<g class="st0">
 <path class="st1" d="M31.3,26c-0.2,0.2-0.5,0.3-0.8,0.3s-0.6-0.1-0.8-0.3c-0.2-0.2-0.3-0.5-0.3-0.7v-8.4h-8.1c-0.2,0-0.4,0-0.6-0.1
  s-0.3-0.2-0.4-0.4c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.1,0-0.2,0.1-0.4c0-0.1,0.1-0.2,0.2-0.3s0.2-0.2,0.3-0.2c0.1-0.1,0.2-0.1,0.3-0.1
  c0.1,0,0.2-0.1,0.3-0.1h8.1V6.3c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.5-0.3,0.8-0.3s0.6,0.1,0.8,0.3c0.2,0.2,0.3,0.5,0.3,0.7v8.4h8.1
  c0.3,0,0.5,0.1,0.8,0.3c0.2,0.2,0.4,0.5,0.4,0.8c0,0.2,0,0.3-0.1,0.4s-0.1,0.3-0.2,0.4c-0.1,0.1-0.2,0.2-0.4,0.2s-0.3,0.1-0.4,0.1
  h-8.1v8.4C31.6,25.5,31.5,25.8,31.3,26z"/>
</g>
</svg>`;
    const AddPostSvg = () => <SvgXml xml={addpost} height="100%" width="100%" />;
    return <AddPostSvg />;
}
