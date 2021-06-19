import React from 'react';
const Spinner_component = ({ size }) => {
  let spinnerSize = size ? size : 40;
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: "225px",
        width: "360px" 
        
      }}
    >
      <i className='fas fa-spinner fa-spin' style={{ fontSize: spinnerSize}} />
    </div>
  );
};
export { Spinner_component };