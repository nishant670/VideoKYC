import React from 'react';
import Button from '../../UI/Button/Button';

import './Stepper.css';

const StepOne = props => {

    const stepContinue = event => {
        event.preventDefault();
        props.verifyHandler();
    }

    return (
        <div>
            <div className="agentViewBody">
            <p><strong>Verify Code</strong></p>
            <p>Please ask the user to read out the code appearing on the screen</p>
            <div className="otpWrapper">
                {/* <div>3</div>
                <div>7</div>
                <div>8</div>
                <div>0</div> */}
                <div>{props.confCode}</div>
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

export default StepOne