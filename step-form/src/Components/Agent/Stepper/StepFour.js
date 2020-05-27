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
            <p><strong>Summary of your actions</strong></p>
            
            <div>
                <div><p>Aadhar Face Match : Verified</p></div>
                <div><p>PAN Face Match : Verified</p></div>
                <div><p>Liveness : Verfied</p></div>
            </div>
            </div>
            <div className="agentViewButtons">
                <Button 
                    btnType="outline">Decline
                </Button>
                <Button
                    btnType="filled">
                        Approve KYC
                </Button>
            </div>
        </div>
    )
}

export default StepThree