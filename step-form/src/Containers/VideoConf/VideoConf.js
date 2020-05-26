import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';
// import html2canvas from 'html2canvas';

function JitsiMeetComponent() {
  const [loading, setLoading] = useState(false);
  const [viedoStarted, setViedoStarted] = useState(false);
  const containerStyle = {
    width: '80%',
    margin: 'auto',
    height: '600px',
    paddingTop : '10%'
  };

  const jitsiContainerStyle = {
    // display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
    // position : "fixed",
    // top : 0,
    // left : 0
  }

 function startConference() {
  try {
//    const domain = 'https://test.ezeiatech.com/';
// setViedoStarted(true);
    const domain = 'meet.jit.si';
   const options = {
    roomName: 'roomName',
    height: "100%",
    parentNode: document.getElementById('jitsi-container'),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
     SHOW_WATERMARK_FOR_GUESTS : false
    },
    configOverwrite: {
     disableSimulcast: false,
    },
   };

   let JitsiMeetExternalAPI = window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
   const api = new JitsiMeetExternalAPI(domain, options);
   api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    setLoading(false);
    setViedoStarted(true);
    api.executeCommand('displayName', 'MyName');
    api.executeCommand('password', 'Kyc123@eze');
   });
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  }
 }

 useEffect(() => {
    setLoading(true);
  // verify the JitsiMeetExternalAPI constructor is added to the global..
  if (window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI) startConference();
  else alert('Jitsi Meet API script not loaded');
 }, []);

//  const startVideoHandler = () => {
//     setLoading(true);
//     if (window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI){
//         setViedoStarted(true);
//         startConference();
//         console.log(viedoStarted);
//         console.log(loading);
//     }
//   else alert('Jitsi Meet API script not loaded');
//  }
//  console.log(viedoStarted);

//  screenCaptureHandler = () => {
//     html2canvas(document.getElementById("jitsi-container")).then(canvas => {
//         document.body.appendChild(canvas);
//     })
//  }

 return (
     <React.Fragment>
     {/* <button
        type="button"
        className="btn btn-primary confirm-btn"
        style={{width:"70%", maxWidth:"500px"}}
        onClick={startVideoHandler}
        >START VIDEO KYC</button>  */}
        <div
        style={containerStyle}
       >
        {loading && <ProgressComponent />}
        <div
         id="jitsi-container"
         style={jitsiContainerStyle}
        />
       </div>
        
    </React.Fragment>
  
 );
}

export default JitsiMeetComponent;