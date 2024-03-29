/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const CardTab = ({ id, heading, description, selected, setSelectedCard }) => {
  const handleClick = () => {
    setSelectedCard(id);
  };
  return (
    <li className={selected ? 'is-border pd-15 is-active' : 'is-border pd-15'} onClick={handleClick}>
      <div className="tab-header">
        {selected ? (
          <h4 style={{ fontWeight: 600 }}>{heading}</h4>
        ) : (
          <p className="fs-xlg" style={{ fontWeight: 600 }}>
            {heading}
          </p>
        )}
      </div>
      <div className="tab-body mt-10">
        <p className="fs-xlg">{description}</p>
      </div>
    </li>
  );
};

CardTab.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelectedCard: PropTypes.func.isRequired,
};

export default CardTab;
