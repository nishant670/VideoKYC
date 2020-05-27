import React from 'react';
import Button from '../../UI/Button/Button';

import './Stepper.css';

const StepThree = props => {

    const stepContinue = event => {
        event.preventDefault();
        props.verifyHandler();
    }

    return (
        <div>
            <div className="agentViewBody">
            <p><strong>Capture User's Photo</strong></p>
            <p>Capture the user photo and match it with Aadhar card photo</p>
            {/* <div className="allImagesWrapper">
                <div>
                    <img src="" />
                </div>
                <div>
                    <img src="" />
                </div>
                <div>
                    <img src="" />
                </div>
            </div> */}
            <div className="imageCaptureWrapper">
                {props.profileImage ?
                <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Favicon_250x250.png' alt='' />
                 : null}
            </div>
            <button onClick={props.profileImageCapture}>Capture Photo</button>
            <div>
                <p>Aadhar Face Match : Verified</p>
                <p>PAN Face Match : Verified</p>
                <p>Liveness : Verfied</p>
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

export default StepThree