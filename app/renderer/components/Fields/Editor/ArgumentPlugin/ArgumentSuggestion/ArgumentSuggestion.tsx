/** REACT */
import React, { FC } from 'react';

const ArgumentSuggestion: FC = ({ children }) => {
    return (
        <span style={{background: 'gray'}}>
            {children}
        </span>
    );
};

export default ArgumentSuggestion;
