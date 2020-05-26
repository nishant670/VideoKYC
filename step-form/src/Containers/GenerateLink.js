import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Components/UI/Button/Button'
import { Link } from 'react-router-dom';

export class GenerateLink extends Component {
    state = {
        userLink : '',
        agentLink : '',
        conferenceId : '',
        displayLinks : false
    }

    displayLinkHandler = () => {
        this.setState({
            displayLinks : true
        })
    }

    componentDidMount(){
        const conferenceLink = {
                "tanentId" : 1,
                "agentId" : 1
        }
        axios.post('http://95.217.179.43:8082/videoconference/generate/conferenceLink', conferenceLink)
        .then(response => {
            console.log(response);
            this.setState({
                conferenceId : response.data.conferenceId
            })
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    render() {
        const {conferenceId, displayLinks} = this.state;
        return (
            <div>
                <Button
                    btnType="filled"
                    clicked={this.displayLinkHandler}
                >
                    Generate Link
                </Button>
                { displayLinks ?
                <div style={styles.linkWrapper}>
                    <Link to={"/user/" + conferenceId}>
                    <p style={styles.linkHead}>User Link</p>
                    <p>{`http://localhost:3000/user/${conferenceId}`}</p>
                </Link>
                <Link to={"/agent/" + conferenceId}>
                    <p style={styles.linkHead}>Agent Link</p>
                    <p>{`http://localhost:3000/agent/${conferenceId}`}</p>
                </Link>
                </div> : null }
            </div>
        )
    }
}

const styles = {
    linkWrapper : {
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        padding : "20px"
    },
    linkHead : {
        fontWeight : "bold",
        color : "#313131"
    }
}

export default GenerateLink
