import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import ProgressComponent from '@material-ui/core/CircularProgress';

const Loader = () => {
    return (
        <div className="Loader">
            <Backdrop />
            <ProgressComponent />
        </div>
    )
}

export default Loader;