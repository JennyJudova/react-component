import React, { useState, useEffect } from 'react';

export default function YourLocation() {
  const [fileData, setfileData] = useState();
  const [selectedCount, setSelectedCount] = useState(0);

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

  const countSelected = (num, e) => {
    let selectedUpdated = 0;
    if (num === 1) selectedUpdated = selectedCount;
    if (e.target.checked === true) {
      selectedUpdated += num;
    } else if (num === 1) {
      selectedUpdated -= num;
    }
    if (selectedUpdated > 0 && selectedUpdated < fileData.length)
      document.getElementById('checkAll').indeterminate = true;
    setSelectedCount(selectedUpdated);
  };

  const handleCheck = (e) => {
    countSelected(1, e);
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
    countSelected(fileData.length, e);
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
        <input type="checkbox" onChange={handleAllCheck} id="checkAll" />
        <p>Selected {selectedCount}</p>
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
                    type="checkbox"
                    name={file.name}
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
