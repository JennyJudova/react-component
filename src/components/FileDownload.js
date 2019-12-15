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

  // const statusCheck = (e) => {
  //   fileData.map((object) => {
  //     if (object.name === e.target.name) {
  //       if (object.status === 'scheduled') {
  //         alert('Hello! I am an alert box!');
  //         console.log(object.status);
  //         return true;
  //       }
  //     }
  //     return true;
  //   });
  // };

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
        {selectedCount !== 0 ? (
          <p>Selected {selectedCount}</p>
        ) : (
          <p>None Selected</p>
        )}
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
                <li key={file.name} className={file.isChecked.toString()}>
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

// {!selectedCount && <p>None Selected</p>}
// {selectedCount && <p>Selected {selectedCount}</p>}
