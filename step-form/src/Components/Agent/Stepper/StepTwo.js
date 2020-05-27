import React from 'react';
import Button from '../../UI/Button/Button';

import './Stepper.css';

const StepTwo = props => {

    const stepContinue = event => {
        event.preventDefault();
        props.verifyHandler();
    }

    // const panImageCapture = () => {
    //     let panImageWrapper = document.getElementsByClassName("imageCaptureWrapper");
    //     const img = ""
    //     panImageWrapper.append(img)
    // }

    return (
        <div>
            <div className="agentViewBody">
            <p><strong>Capture User's PAN</strong></p>
            <div className="imageCaptureWrapper">
                {props.imageShow ?
                <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Favicon_250x250.png' alt='' />
                 : null}
            </div>
            <button onClick={props.panImageCapture}>Capture PAN</button>
            <div>
    <p>Entered PAN : {props.enteredPan}</p>
    <p>PAN from OCR : {props.ocrPan}</p>
    <p>Match Result : {props.verified}</p>
            </div>
            </div>
            <div className="agentViewButtons">
                <Button 
                    btnType="outline">Decline
                </Button>
                <Button
                    btnType="filled"
                    clicked={stepContinue}>
                        Verify
                </Button>
            </div>
        </div>
    )
}

export default StepTwo