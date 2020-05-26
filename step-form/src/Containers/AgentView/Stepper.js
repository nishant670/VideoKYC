import React, { Component } from 'react';
import StepOne from '../../Components/Agent/Stepper/StepOne';
import StepTwo from '../../Components/Agent/Stepper/StepTwo';
import StepThree from '../../Components/Agent/Stepper/StepThree';
import StepFour from '../../Components/Agent/Stepper/StepFour';


export class Stepper extends Component {

    state = {
        step : 1
    }

    verifyHandler = () => {
        this.setState({
            step : this.state.step + 1
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
            verifyHandler={this.verifyHandler} />
            
        )
        case 3 :
        return (
            <StepThree
            verifyHandler={this.verifyHandler} />
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
