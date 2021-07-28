import {useEffect, useRef} from 'react'
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
    top: 48%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 100000;
    height: 101vh;
    width: auto;
`
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
                <source src={videoPath} />
            </VideoPlayerWrapper>
        </VidContainer>
    )
}

export const VideoPlayerWrapper = styled.video`
    height: 105vh;
    width: auto;
`;

VideoPlayer.defaultProps = {
  videoPath: '/hatch_mobile_basic.mp4'
};

export default VideoPlayer;
