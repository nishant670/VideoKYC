import React, { Component } from 'react';
import Stepper from './Stepper';
import VideoConf from '../VideoConf/VideoConf';
import axios from 'axios';
// import html2canvas from 'html2canvas';
import ScreenCapture from '../ScreenCapture/ScreenCapture';

import './AgentView.css';

export class AgentView extends Component {

    state = {
        conferenceCode : '',
        screenCapture : '',
        enteredPan : '',
        ocrPan : '',
        verified : 'Failed',
        panImage : ''
    }

    componentDidMount() {
        // console.log(this.props);
        // const confIdData = {
        //     "conferenceId" : this.props.match.params.id
        // }
        // axios.post('http://95.217.179.43:8082/videoconference/generate/conferenceCode', confIdData)
        // .then(response => {
        //     console.log(response);
        //     this.setState({
        //         conferenceCode : response.data.conferenceCode
        //     })
        // })
        // .catch(error => console.log(error))

        axios.get(`http://95.217.179.43:8082/videoconference/conferenceDetails?conferenceId=${this.props.match.params.id}`)
        .then(response => {
            console.log(response)
            let panVerify = "Failed";
            if(response.data.panData.isPanNameMatch === "YES" && response.data.panData.isPanNumberMatch === "YES"){
                panVerify = "Verified"
            }
            this.setState({
                conferenceCode : response.data.userData.conferenceCode,
                enteredPan : response.data.panData.nsdlPanNumber,
                ocrPan : response.data.panData.ocrPanNumber,
                verified : panVerify
            })
        })
        .catch(error => console.log(error))
    }

    // handleScreenCapture = (screenCapture) => {
    //     this.setState({
    //       screenCapture
    //     })
    //   }

    //   btnCapture.addEventListener( "click", captureSnapshot );

      captureSnapshot = () => {

        let stream = document.querySelector("#jitsi-container");
        let capture = document.getElementById( "capture" );
        let snapshot = document.getElementById( "snapshot" );

          let ctx = capture.getContext( '2d' );
          let img = new Image();

          ctx.drawImage( stream, 0, 0, capture.width, capture.height );
	
		img.src		= capture.toDataURL( "image/png" );
        img.width	= 240;
        
        snapshot.innerHTML = '';

		snapshot.appendChild( img );
      }

    // screenCaptureHandler = () => {
    //     // let captureBody = document.getElementById("jitsiConferenceFrame0").contents().find("body");
    //     // let cloneBody = captureBody.html();
    //     // html2canvas(cloneBody).then(canvas => {
    //     //     document.body.appendChild(canvas);
    //     // })

    //     html2canvas(document.getElementById("demoImg")).then(canvas => {
    //         document.body.appendChild(canvas);
    //     })
    //  }

    render() {
        console.log(this.state.ocrPan);
        return (
            <div className="agentViewWrapper">
                {/* <ScreenCapture onEndCapture={this.handleScreenCapture}>
                {({ onStartCapture }) => (
                    <React.Fragment>
                <div className="videoKYC" style={{width:"70vw"}}>
                    <VideoConf />
                </div>
                <button onClick={onStartCapture}>Capture</button>
                <img src={this.state.screenCapture} />
                </React.Fragment>
                )}
                </ScreenCapture>     */}
    
                <div className="videoKYC" style={{width:"70vw"}}>
                    <VideoConf />
                </div>
                {/* screenCapture */}
                <button id="btn-capture" onClick={this.captureSnapshot}>Capture</button>
                <canvas id="capture" width="320" height="240"></canvas>
                <div id="snapshot"></div>
                <div className="stepper">
                    <Stepper
                    confCode={this.state.conferenceCode}
                    enteredPan={this.state.enteredPan}
                    ocrPan={this.state.ocrPan}
                    verified={this.state.verified}
                     />
                </div>
            </div>
        )
    }
}

export default AgentView