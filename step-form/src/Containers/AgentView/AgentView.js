import React, { Component } from 'react';
import Stepper from './Stepper';
import VideoConf from '../VideoConf/VideoConf';
import axios from 'axios';
import html2canvas from 'html2canvas';

import './AgentView.css';

export class AgentView extends Component {

    state = {
        conferenceCode : ''
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
            this.setState({
                conferenceCode : response.data.userData.conferenceCode
            })
        })
        .catch(error => console.log(error))
    }

    // screenCaptureHandler = () => {
    //     html2canvas(document.querySelector("#jitsi-container > div")).then(canvas => {
    //         document.body.appendChild(canvas);
    //     })
    //  }

    render() {
        return (
            <div className="agentViewWrapper">
                <div className="videoKYC" style={{width:"70vw"}}>
                    <VideoConf />
                </div>
                {/* <button onClick={this.screenCaptureHandler}>Capture</button> */}
                <div className="stepper">
                    <Stepper
                    confCode={this.state.conferenceCode} />
                </div>
            </div>
        )
    }
}

export default AgentView