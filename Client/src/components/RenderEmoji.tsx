
// assets
import smile from "../assets/emojiAssets/smile.png";
import neutral from "../assets/emojiAssets/neutral.png";
import sadFace from "../assets/emojiAssets/sadFace.png";
import disappointed from "../assets/emojiAssets/disappointed.png";
import deadSkin from "../assets/emojiAssets/deadSkin.png";

// libraries
import React from 'react';


const RenderEmoji = (aqi: number) => {

    const goodRange = 51;
    const moderateRange = 101;
    const unhealthyForSensitiveGroupsRange = 151;
    const unhealthyRange = 201;
    const veryUnhealtyRange = 301;

    // good range: [0,50]
    if (aqi < goodRange) {
        return <img src={smile} />;
    // moderate range: [51, 100]
    } else if (aqi < moderateRange) {
        return <img src={neutral} />;
    // unhealthy for sensitive groups range: [101, 150]
    } else if (aqi < unhealthyForSensitiveGroupsRange) {
        return <img src={sadFace} />;
    // unhealthy range: [151, 200]
    } else if (aqi < unhealthyRange) {
        return <img src={sadFace} />;
    // very unhealthy range: [201, 300]
    } else if (aqi < veryUnhealtyRange) {
        return <img src={disappointed} />;
    // hazardous range: [301-500]
    } else {
        return <img src={deadSkin} />;
    }
    
  };

  export default RenderEmoji;