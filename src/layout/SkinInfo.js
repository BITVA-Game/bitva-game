import React from 'react';
import PropTypes from 'prop-types';

const SkinInfo = ({ children }) => (
    <section className="main-content">
        <div className="login-profiles-container">{children}</div>
    </section>
);

SkinInfo.propTypes = {
    children: PropTypes.element.isRequired,
};

export default SkinInfo;
