import React from 'react';

import './VideoStream.css';

const VideoStream = () => {
    return (
        <div>
            <video id="localVideo" playsinline autoplay muted></video>
            <video id="remoteVideo" playsinline autoplay></video>
        </div>
    )
}

export default VideoStream;