import React, { Component } from 'react';
import StepForm from './StepForm';
import axios from 'axios';
import PanData from '../PanData';
import AgentView from './AgentView/AgentView';
import Upload from '../Components/Upload/Upload';
import Moment from 'react-moment';

import VideoStream from '../Components/VideoStream/VideoStream';
import VideoConf from './VideoConf/VideoConf';

import './main.css';

export class main extends Component {

    state={
    /* Initial Valid State */
        geoAccess : false,
        mediaAccess : false,
    /* Other State */         
        latitude : '',
        longitude : '',
        geoAddress : '',
        panSelected : '',
        progressPercent : null,
        previewImage : false,
        loading : false,
        conferenceCode : '',
        // startVideo : false,
    /* Pan form State */
        panVerified : false,
        panNumber : 'PAN Number',
        nameAsPan : 'Name as per PAN',
        dob : new Date(),
        address : 'Address as per adhaar',
        pinCode : '6 Digit Pincode',

    /* Aadhaar form State */
        aadharNumber : 'Aadhar Number',
        generatedOTP : false,
        otp : 'Enter the 6 digit OTP',
        aadharVerified : false
        
    }


    componentDidMount() {
        const getCoordinates = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
              } else { 
                alert("Geolocation is not supported by this browser.");
              }
        }
        getCoordinates();
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


    showPosition = position => {
        this.setState({
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
            geoAccess : true
        })

        const {latitude, longitude} = this.state;
        const coords = {
            latitude : latitude,
            longitude : longitude,
            "tanentId" : 1,
            "conferenceId" : this.props.match.params.id,
            "ip" : "127.0.0.1"
        }
        if(latitude && longitude){
            axios.post('http://95.217.179.43:8082/videoconference/validateLocation', coords)
        .then(response => console.log(response))
        .catch(error => {
            console.log(error);
        })
    }

    if(this.state.geoAccess){
        navigator.mediaDevices.getUserMedia({ audio: true, video : true })
    .then(stream => {
        this.setState({
            mediaAccess : true
        })
    })
    .catch(error => {
            this.setState({
                mediaAccess : false
            });
            alert(error);
        })
    }
}

    showError = error => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
            default :
                alert("Something Wrong")
          }
    }

    panSelectHandler = event => {
        event.persist();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                panSelected : reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    fileUploadHandler = () => {
        this.setState({
            loading : true
        })
        console.log(this.state.panSelected.replace(/^data:image.+;base64,/, ''));
        const uploadData = {
            "conferenceId" : this.props.match.params.id,
            "docName" : 'PANCARD',
            "frontImage" : this.state.panSelected.replace(/^data:image.+;base64,/, '')
        }
        axios.post('http://95.217.179.43:8082/videoconference/ocr/verification', uploadData)
        .then(response => { 
                console.log(response);
                this.setState({
                    loading : false,
                    panNumber : response.data.docId,
                    nameAsPan : response.data.name,
                    
                    // dob : <Moment parse={response.data.dob} />
                })
            })
        .catch(error => {
            console.log(error);
            alert(error);
            this.setState({
                loading : false
            })
        })
    }

    onChangeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name] : target.value
        })
    }

    dateHandleChange = date => {
        this.setState({
          dob: date
        });
      };

    panConfirmHandler = () => {
        this.setState({
            loading : true
        })
        const nsdlPanData = {
            "conferenceId" : this.props.match.params.id,
	        "panNumber" : this.state.panNumber,
	        "panName" : this.state.nameAsPan,
	        "dob" : this.state.dob
        }
        axios.post('http://95.217.179.43:8082/videoconference/nsdl/verification/pan', nsdlPanData)
        .then(response => {
            console.log(response);
            if(response.data.isPanNameMatch === "YES" && response.data.isPanNumberMatch === "YES"){
                this.setState({
                    loading : false,
                    panVerified : true
                })
            }
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    generateOtpHandler = () => {
        const aadharNumberData = {
            "conferenceId" : this.props.match.params.id,
	        "aadharNumber" : this.state.aadharNumber
        }
        axios.post('http://95.217.179.43:8082/videoconference/aadhar/sendOTP', aadharNumberData)
        .then(response => {
            console.log(response);
            this.setState({
            generatedOTP : true
        })
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    aadharVerifiedHandler = () => {
            const otpData = {
                "conferenceId" : this.props.match.params.id,	
	            "aadharOTP" : this.state.otp
            }
        axios.post('http://95.217.179.43:8082/videoconference/aadhar/verifyByOtp', otpData)
        .then(response => {
            console.log(response);
            if(response.status == 200)
            this.setState({
            aadharVerified : true
        })
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    // startVideoHandler = () => {
    //     this.setState({
    //         startVideo : true
    //     })
    // }

    render() {

        console.log("FILE2", this.state.panSelected.data);
        console.log('props', this.props);
        
        const {geoAccess, mediaAccess, latitude, longitude, geoAddress, panSelected, progressPercent, previewImage, conferenceCode} = this.state;
        //PAN form state
        const {panVerified, panNumber, nameAsPan, dob, address, pinCode} = this.state;
        //Aadhar form state
        const {aadharNumber, generatedOTP, otp, aadharVerified} = this.state;

        const values = {panNumber, nameAsPan, dob, address, pinCode, aadharNumber, otp};

        // const showConferenceCode = [...conferenceCode];
        // const modifyConferenceCode = showConferenceCode.map(code => {
        //     return <div>{code}</div>
        // })

        // const showConferenceCode = conferenceCode;
        // let modifyConferenceCode = null;
        // for(const code of this.state.conferenceCode){
        //     modifyConferenceCode = <div>{code}</div>
        // }


        return (
            
            <div>
                
        {/* <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Alert</strong> This is a danger alert—check it out!
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> */}
                {/* <p>Coordinates and address</p>
        <p>Latitude : {latitude}</p>
        <p>Longitude : {longitude}</p>
        <p><strong>Adress</strong></p>
        <p>{geoAddress}</p> */}
        {!aadharVerified ? 
        <>
        <Upload
            panSelected={panSelected}
            fileUploadHandler={this.fileUploadHandler}
            panSelectHandler={this.panSelectHandler}
            progressPercent={progressPercent}
            disabled={!mediaAccess} />
        <StepForm 
            values={values}
            changeHandler={(event)=>this.onChangeHandler(event)}
            panConfirmHandler={this.panConfirmHandler}
            panVerified={panVerified}
            generatedOTP={generatedOTP}
            generateOtpHandler={this.generateOtpHandler}
            aadharVerified={aadharVerified}
            aadharVerifiedHandler={this.aadharVerifiedHandler}
            startVideo={this.startVideoHandler}
            loading={this.state.loading} />
            </> : null}

            {/* <VideoStream /> */}
            {/* <AgentView /> */}

            {aadharVerified ? 
            <div>
            <VideoConf/>
            <div className="otpWrapper">
            {/* <div>3</div>
            <div>7</div>
            <div>8</div>
            <div>0</div> */}
            <div>{this.state.conferenceCode}</div>
        </div>
            </div> : null}
            </div>
            
            
        )
    }
}

export default main
