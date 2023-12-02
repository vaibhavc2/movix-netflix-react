import React, { memo } from "react";
import ReactPlayer from "react-player/youtube";

import "@/styles/scss/other/components/video-popup.scss";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  videoId: string | null;
  setVideoId: React.Dispatch<React.SetStateAction<string | null>>;
};

const VideoPopup = ({ show, setShow, videoId, setVideoId }: Props) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          playing={true}
        />
      </div>
    </div>
  );
};

export default memo(VideoPopup);
