/*
 *
 * Loader component
 *
 */

// Imports
import React from 'react';
import './style.css';

const Loader = props => (
    // Bootstrap spinner
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export default Loader;