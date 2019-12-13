/* eslint-disable global-require */
import React, { useEffect } from 'react';

export default function YourLocation() {
  const Data = require('../../file.json');

  useEffect(() => {
    console.log(Data);
  }, []);

  return (
    <div>
      <h2>component connected</h2>
    </div>
  );
}
