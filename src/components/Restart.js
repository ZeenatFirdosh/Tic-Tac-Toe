import React from 'react';

import "./ResetButton.css";

export const RestartButton = ({ restartBoard }) => {
    return (
        <button className="reset-btn" onClick={restartBoard}>Restart</button>
    )
}
