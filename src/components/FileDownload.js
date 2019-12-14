import React, { useState, useEffect } from 'react';

export default function YourLocation() {
  const [fileData, setfileData] = useState();

  const setData = () => {
    // eslint-disable-next-line global-require
    const data = require('../../file.json');
    const isChecked = { isChecked: false };
    const fileDataUpdated = data.map((object) =>
      Object.assign(object, isChecked)
    );
    console.log(fileDataUpdated);
    setfileData(fileDataUpdated);
  };

  const handleCheck = (e) => {
    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      if (objectUpdate.name === e.target.name) {
        objectUpdate.isChecked = e.target.checked;
      }
      return objectUpdate;
    });
    console.log(fileDataUpdated);
    setfileData(fileDataUpdated);
  };

  const handleAllCheck = (e) => {
    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      objectUpdate.isChecked = e.target.checked;
      return objectUpdate;
    });
    console.log(fileDataUpdated);
    setfileData(fileDataUpdated);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="fileWrapper">
      <div className="downloadWrapper">
        <input type="checkbox" onChange={handleAllCheck} />
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
        {fileData && (
          <ul>
            {fileData.map((file) => {
              return (
                <li key={file.name}>
                  <input
                    name={file.name}
                    type="checkbox"
                    checked={file.isChecked}
                    onChange={handleCheck}
                  />
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
