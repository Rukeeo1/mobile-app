import { SvgXml } from "react-native-svg";
import * as React from "react";

export default function SvgProfileInactive(props) {
  const profileInactive = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
viewBox="0 0 62 32" style="fill:#ffffff;" xml:space="preserve">
<g class="st0">
 <path class="st1" d="M22.6,27.4c-2.1,0-3.1-0.7-3.1-2c0-1.8,1-3.6,3.1-5.4s4.7-2.6,7.9-2.6c1.6,0,3.2,0.3,4.6,0.8s2.6,1.2,3.5,2
  s1.6,1.7,2.1,2.6s0.8,1.8,0.8,2.6c0,1.3-1,2-3,2H22.6z M22,25.5h17c0.3,0,0.5-0.1,0.5-0.4c0-1.2-0.8-2.5-2.5-3.9s-3.8-2-6.4-2
  s-4.8,0.7-6.4,2c-1.7,1.3-2.5,2.6-2.5,3.9C21.5,25.4,21.7,25.5,22,25.5z M30.5,15.8c-0.7,0-1.4-0.2-2.1-0.5s-1.2-0.7-1.7-1.3
  c-0.5-0.5-0.9-1.2-1.1-1.9c-0.3-0.7-0.4-1.5-0.4-2.3c0-1.6,0.5-3,1.6-4.1S29.1,4,30.6,4s2.8,0.5,3.9,1.6c1.1,1.1,1.6,2.5,1.6,4.1
  s-0.5,3-1.6,4.1C33.3,15.2,32,15.8,30.5,15.8z M30.5,13.9c0.9,0,1.7-0.4,2.4-1.2s1-1.7,1-2.8s-0.3-2-1-2.8C32.2,6.4,31.4,6,30.5,6
  s-1.7,0.4-2.4,1.1c-0.7,0.7-1,1.7-1,2.8s0.3,2,1,2.8C28.8,13.5,29.6,13.9,30.5,13.9z"/>
</g>
</svg>`;
  const ProfileSvgInactive = () => (
    <SvgXml xml={profileInactive} height="100%" width="100%" />
  );
  return <ProfileSvgInactive />;
}
