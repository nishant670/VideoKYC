import React, { Component } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';

export class VideoConf extends Component {

    state = {
        loading  : true
    };

    startConference = () => {
        try {
         const domain = 'https://test.ezeiatech.com/';
         const options = {
          roomName: 'DemoHyperVergeKYC',
          height: 400,
          parentNode: document.getElementById('jitsi-container'),
          interfaceConfigOverwrite: {
           filmStripOnly: false,
           SHOW_JITSI_WATERMARK: false,
          },
          configOverwrite: {
           disableSimulcast: false,
          }
        }
    }
    }    


    render() {
        const containerStyle = {
            width: '800px',
            height: '400px'
        }
        const jitsiContainerStyle = {
            display: (loading ? 'none' : 'block'),
            width: '100%',
            height: '100%',
          }
        return (
            <div>
                
            </div>
        )
    }
}

export default VideoConf
