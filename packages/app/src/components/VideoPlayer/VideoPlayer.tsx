import React, {useEffect, useRef} from 'react';
import styled, { DefaultTheme } from "styled-components";
import { space, typography } from "styled-system";
import getThemeValue from "../../util/getThemeValue";
import { VideoPlayerTheme } from "./types";
import Moralis from 'moralis'

/* 
const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};
 */

const VidContainer = styled.div`
    position: fixed;
    height: 110vh;
    width: 100%;
    // max-width: 425px;
    // min-width: 325px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: -50%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 102;
`;


function fade(element) {
    var op = 1;
    var timer = setInterval(function() {
        if (op <= 0) clearInterval(timer);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1 || 0.1;
    }, 70);
}

const VideoPlayer: React.FC<VideoPlayerTheme> = ({videoPath}:VideoPlayerTheme) => {
    const videoEl = useRef()

    useEffect(() => {
        const el = videoEl.current as any
        setTimeout(function() {
            fade(el);
        }, 5500);
    }, [])

    return (
        <VidContainer >
            <VideoPlayerWrapper autoPlay ref={videoEl} controls={false} playsInline>
                <source src={videoPath}/>
            </VideoPlayerWrapper>
        </VidContainer>
    )
}

export const VideoPlayerWrapper = styled.video`
    height: 100%;
    width: auto;
`;

VideoPlayer.defaultProps = {
  videoPath: '/hatch_mobile_basic.mp4'
};

export default VideoPlayer;
