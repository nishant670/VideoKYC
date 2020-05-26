import React from 'react';
import Button from '../../UI/Button/Button';

import './Stepper.css';

const StepTwo = props => {

    const stepContinue = event => {
        event.preventDefault();
        props.verifyHandler();
    }

    return (
        <div>
            <div className="agentViewBody">
            <p><strong>Capture User's PAN</strong></p>
            <div className="imageCaptureWrapper">
                <img src="" />
            </div>
            <button>Capture PAN</button>
            <div>
                <p>Entered PAN : CQVPM5253N</p>
                <p>PAN from OCR : CQVPM5253N</p>
                <p>Match Result : Verfied</p>
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