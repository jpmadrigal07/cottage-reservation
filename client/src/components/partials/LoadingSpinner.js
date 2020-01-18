import React from 'react';

const LoadingSpinner = ({message}) => {
    return (
        <div style={{ margin: '0 auto' }}>
            <div className="d-flex justify-content-center">
                <div className="spinner-border mt-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <p className="text-muted text-center mt-3">{message}</p>
        </div>
    );
};

export default LoadingSpinner;