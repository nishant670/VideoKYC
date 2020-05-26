import React, { useRef } from 'react';
import {ProgressBar} from 'react-bootstrap';

import Button from '../UI/Button/Button';


const Upload = props => {

    const inputRef = useRef(null);

    let progressBar = null;

    if(props.progressPercent > 0 && props.progressPercent <= 99){
        progressBar = <ProgressBar style={style.progressBar} variant="success" now={props.progressPercent} />
    }
    if(props.progressPercent === 100){
        progressBar = <p className="uploadSuccessText">Uploaded Successfully</p>
    }

    return (
        <div>
        <input
            style={{display : "none"}}  
            ref={inputRef}
            type="file"
            onChange={props.panSelectHandler}/>
        <Button
            clicked={()=>inputRef.current.click()}
            btnType="selectPan"
            disabled={props.disabled}>
            Select PAN
        </Button>    
        {/* <button
            className="selectPan"
            onClick={()=>inputRef.current.click()}>
                Select PAN
        </button> */}
        {props.panSelected ?
            <Button
                btnType="uploadBtn"
                clicked={props.fileUploadHandler}>
                    Upload
            </Button>
            // <button
            //     className="uploadBtn"
            //     onClick={props.fileUploadHandler}>
            //     Upload
            // </button> 
            : 
        null}
        {progressBar}
        <div>
        {props.panSelected ? <img style={style.previewImage} src={props.panSelected} alt="Preview PAN" /> : null}
        </div>
        </div>
    )
}

const style = {
    progressBar : {
        width : "30%",
        margin : "10px auto"
    },
    previewImage : {
        width : "100%",
        maxWidth : "200px",
        marginTop : "1rem"
    }
}

export default Upload