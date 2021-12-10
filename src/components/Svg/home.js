import {SvgXml} from "react-native-svg";
import * as React from "react";

export default function SvgHome(props) {
    const home = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink" 
x="0px" y="0px" viewBox="0 0 59.79 56.076">
  <path id="Path_412" data-name="Path 412" 
  d="M556.147,37.83a.4.4,0,0,1-.594,0c-.93-1.052-3.931-3.907-7.4-1.565-4.187,2.829-3.961,11.629,7.7,18.7,0,0-5.215,3.82-11.26,3.253-3.621-.34-3.452-3.452-3.452-3.452V41.8a2.085,2.085,0,0,0-2.085-2.085h-.242a1.82,1.82,0,0,1-1.036-3.316L554.8,24.6a1.839,1.839,0,0,1,2.1,0l17.028,11.8a1.82,1.82,0,0,1-1.037,3.316h-.242a2.085,2.085,0,0,0-2.085,2.085V54.769s.17,3.112-3.452,3.452c-6.045.567-11.26-3.253-11.26-3.253,11.656-7.073,11.883-15.872,7.7-18.7C560.079,33.923,557.077,36.779,556.147,37.83Z" transform="translate(-525.955 -16.218)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/>
</svg>`;
    const SvgHome = () => (
        <SvgXml xml={home} height="100%" width="100%"/>
    );
    return <SvgHome/>;
}
