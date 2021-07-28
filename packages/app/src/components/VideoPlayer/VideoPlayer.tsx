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
    width: 100vw;
    // max-width: 425px;
    // min-width: 325px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    height: auto;
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
            <VideoPlayerWrapper autoPlay ref={videoEl} controls={false}>
                <source src={videoPath} />
            </VideoPlayerWrapper>
        </VidContainer>
    )
}

export const VideoPlayerWrapper = styled.video`
    width: 100%;
    height: 100%;
`;

VideoPlayer.defaultProps = {
  videoPath: '/hatch_mobile_basic.mp4'
};

export default VideoPlayer;
