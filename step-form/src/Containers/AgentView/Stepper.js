import React, { Component } from 'react';
import StepOne from '../../Components/Agent/Stepper/StepOne';
import StepTwo from '../../Components/Agent/Stepper/StepTwo';
import StepThree from '../../Components/Agent/Stepper/StepThree';
import StepFour from '../../Components/Agent/Stepper/StepFour';


export class Stepper extends Component {

    state = {
        step : 1,
        imageShow : false,
        profileImage : false
    }

    verifyHandler = () => {
        this.setState({
            step : this.state.step + 1
        })
    }

    panImageCapture = () => {
        this.setState({
            imageShow : true
        })
    }

    profileImageCapture = () => {
        this.setState({
            profileImage : true
        })
    }

    render() {

        const {step} = this.state;

        switch(step){
            case 1 :
        return (
            <StepOne 
                // step={step}
                verifyHandler={this.verifyHandler}
                confCode={this.props.confCode}/>
        )   
        case 2 :
        return (
            <StepTwo
            verifyHandler={this.verifyHandler}
            enteredPan={this.props.enteredPan}
                    ocrPan={this.props.ocrPan}
                    verified={this.props.verified}
                    panImageCapture={this.panImageCapture}
                    imageShow={this.state.imageShow} />
            
        )
        case 3 :
        return (
            <StepThree
            verifyHandler={this.verifyHandler}
            profileImageCapture={this.profileImageCapture}
            profileImage={this.state.profileImage} />
        )
        case 4 :
        return (
            <StepFour
            verifyHandler={this.verifyHandler} />
        )
        default :
            return 'Something Wrong'
    }
        
    
    }
}

export default Stepper
