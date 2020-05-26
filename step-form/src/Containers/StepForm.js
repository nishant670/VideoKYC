import React, { Component } from 'react';
import PanComponent from '../Components/PanComponent/PanComponent';
import AadharComponent from '../Components/AadharComponent/AadharComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'

import './main.css';


export class StepForm extends Component {

    state={
        step : 1,
        // panNumber : '',
        // nameAsPan : '',
        // dob : new Date(),
        // address : '',
        // pinCode : ''

    }

    // confirmHandler = () => {
    //     const {step} = this.state;
    //     this.setState({
    //         step : step + 1
    //     })
    // }

    // onChangeHandler = (event) => {
    //     const target = event.target;
    //     const name = target.name;
    //     this.setState({
    //         [name] : target.value
    //     })
    // }

    // dateHandleChange = date => {
    //     this.setState({
    //       dob: date
    //     });
    //   };

    render() {
        const {step} = this.state;

        // const coffee = <FontAwesomeIcon icon={faCheckDouble} />
        // console.log(coffee);

        let panForm = <PanComponent
        nextStep={this.confirmHandler}
        onChange={(event) => this.props.changeHandler(event)}
        values={this.props.values}
        dateHandleChange={this.dateHandleChange}
        panConfirmHandler={this.props.panConfirmHandler}
        loading={this.props.loading}
        />;
        if(this.props.panVerified){
            panForm = <div className="verifyStatus"><FontAwesomeIcon icon={faCheckCircle} size="lg"/><h2>PAN Verified</h2></div>
        }

        let aadharForm = <AadharComponent 
        generatedOTP={this.props.generatedOTP}
        generateOtpHandler={this.props.generateOtpHandler}
        aadharVerifiedHandler={this.props.aadharVerifiedHandler}
        onChange={(event) => this.props.changeHandler(event)}
        values={this.props.values}/>
        if(this.props.aadharVerified){
            aadharForm = <div className="verifyStatus"><FontAwesomeIcon icon={faCheckCircle} size="lg"/><h2>Aadhar Verified</h2></div>
        }
        
        // const {panNumber, nameAsPan, dob, address, pinCode} = this.state;
        // const values = {panNumber, nameAsPan, dob, address, pinCode};

        switch(step){
            case 1 :
        return (
            <React.Fragment>
            <div style={styles.formWrapper}>
                {panForm}
            </div>
            {this.props.panVerified ? 
                <div style={styles.formWrapper}> 
                    {aadharForm}
                </div> : null }
                {/* {this.props.aadharVerified ? <button
                    type="button"
                    className="btn btn-primary confirm-btn"
                    style={{width:"70%", maxWidth:"500px"}}
                    onClick={this.props.startVideo}
                    >
                    START VIDEO KYC</button> : null} */}
            </React.Fragment>
        )   
        case 2 :
        return (
            <div style={styles.formWrapper}>
                <h2>Step 2</h2>
            </div>
        )
        default :
            return 'Something Wrong'
    }
    }
}

const styles = {
    formWrapper : {
        width : "70%",
        maxWidth : "500px",
        margin : " 2rem auto",
        // position : "absolute",
        // top : "55%",
        // left : "50%",
        // transform : "translate(-50%, -50%)",
        padding : "20px",
        boxSizing : "border-box",
        borderRadius : "5px",
        boxShadow : "0 0 5px 3px rgba(0,0,0,0.1)"
    }
}

export default StepForm
