import {useEffect, useRef} from 'react'
import styled, { DefaultTheme } from "styled-components";
import { space, typography } from "styled-system";
import getThemeValue from "../../util/getThemeValue";
import { VideoPlayerTheme } from "./types";

/* 
const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};
 */


const VideoPlayer: React.FC<VideoPlayerTheme> = ({videoPath, onDone}:VideoPlayerTheme) => {
    const videoEl = useRef()
    useEffect(() => {
        const el = videoEl.current as any
        if(el.requestFullscreen) el.requestFullscreen()
        else if (el.msRequestFullscreen) el.msRequestFullscreen()
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
        else if (el.webkitRequestFullScreen) el.webkitRequestFullScreen()
        el.addEventListener("ended", function () {
            onDone()
        }, false);
    }, [])

    return (
        <VideoPlayerWrapper autoPlay ref={videoEl}>
            <source src={videoPath} />
        </VideoPlayerWrapper>
    )
}

export const VideoPlayerWrapper = styled.video`
    display: flex;
    flex: 1;

`;

VideoPlayer.defaultProps = {
  videoPath: '/hatch_mobile_basic.mp4'
};

export default VideoPlayer;
