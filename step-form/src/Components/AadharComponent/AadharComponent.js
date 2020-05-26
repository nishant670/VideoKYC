import React from 'react'

const AadharComponent = props => {
    return (
        <div>
            <form>
            <div className="form-group">
                    <input
                        type="text"
                        name="aadharNumber"
                        value={props.values.aadharNumber || ''}
                        onChange={props.onChange}
                        className="form-control"
                        placeholder="Aadhar Number"/>
                    </div>
                    <div className="form-group">
                        {props.generatedOTP ?
                        <input
                        type="text"
                        name="otp"
                        value={props.values.otp || ''}
                        onChange={props.onChange}
                        className="form-control"
                        placeholder="Enter the 6 digit OTP"/> : null}
                        
                </div>
                <button
                    type="button"
                    className="btn btn-primary confirm-btn"
                    onClick={!props.generatedOTP ? props.generateOtpHandler : props.aadharVerifiedHandler}>
                    {props.generatedOTP ? "Verify Aadhar" : "Generate OTP"}</button>
            </form>
        </div>
    )
}

export default AadharComponent