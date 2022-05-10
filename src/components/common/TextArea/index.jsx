import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ value, onChange, label, placeholder, name, type, className, readOnly, id }) => (
  <div className="pm-group">
    <label>{label}</label>
    <textarea
      type={type}
      className={className}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ color: 'black' }}
      readOnly={readOnly}
      id={id}
    />
  </div>
);

TextArea.defaultProps = {
  onChange: () => {},
  value: '',
  label: '',
  name: '',
  className: 'pm-control',
  placeholder: '',
  type: 'textarea',
  readOnly: false,
  id: '',
};

TextArea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
};

export default TextArea;
