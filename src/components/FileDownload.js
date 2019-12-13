/* eslint-disable global-require */
import React, { useEffect } from 'react';

export default function YourLocation() {
  const data = require('../../file.json');

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className="fileWrapper">
      <div className="downloadWrapper">
        <input type="checkbox" />
        <p>Selected</p>
        <p>Download Selected</p>
      </div>
      <div className="download">
        <div className="downloadHeadings">
          <p>Name</p>
          <p>Device</p>
          <p>Path</p>
          <p>Status</p>
        </div>
        {data && (
          <ul>
            {data.map((file) => {
              return (
                <li key={file.name}>
                  <input type="checkbox" />
                  <p>{file.name}</p>
                  <p>{file.device}</p>
                  <p>{file.path}</p>
                  <p>{file.status}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
