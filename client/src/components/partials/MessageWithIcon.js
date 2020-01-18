import React from 'react';
import FeatherIcon from 'feather-icons-react';

const MessageWithIcon = ({icon, logoColor, message}) => {
    return (
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <FeatherIcon icon={icon} size="100" className={logoColor} />
            </div>   
            <p className="text-muted text-center mt-3">{message}</p>
        </div>
    );
};

export default MessageWithIcon;