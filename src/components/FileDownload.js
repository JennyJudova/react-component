import React, { useState, useEffect } from 'react';

export default function YourLocation() {
  const [fileData, setfileData] = useState();
  const [selectedCount, setSelectedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduled, setScheduled] = useState(0);

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

  const handleDownload = () => {
    console.log('download pressed');
    if (isModalOpen === false) {
      setIsModalOpen(true);
    } else setIsModalOpen(false);

    const scheduledUpdated = [];

    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      if (object.status === 'scheduled' && object.isChecked === true) {
        scheduledUpdated.push(object.device);
        objectUpdate.isChecked = false;
      }
      console.log(scheduledUpdated);
      setScheduled(scheduledUpdated);
      return objectUpdate;
    });
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
    console.log('count selected', selectedUpdated);

    if (selectedUpdated === 0) {
      document.getElementById('checkAll').checked = false;
    } else if (selectedUpdated > 0 && selectedUpdated < fileData.length) {
      document.getElementById('checkAll').indeterminate = true;
    }
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
      {isModalOpen && (
        <div className="modalWrapper">
          <div className="modal">
            {selectedCount === 0 ? (
              <p>You have to select files to download.</p>
            ) : (
              <div>
                {fileData
                  .filter(
                    (object) =>
                      object.isChecked === true && object.status === 'available'
                  )
                  .map((object) => {
                    return (
                      <p key={object.name}>
                        Device {object.device} with path {object.path} will be
                        downloaded
                      </p>
                    );
                  })}
                {scheduled && (
                  <div>
                    {scheduled.map((device) => {
                      return (
                        <p className="scheduled" key={device}>
                          Device {device} will not be downloaded because it is
                          already Scheduled.
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <button type="button" onClick={() => setIsModalOpen(false)}>
              close alert
            </button>
          </div>
        </div>
      )}

      <div className="downloadWrapper">
        <input type="checkbox" onChange={handleAllCheck} id="checkAll" />
        {selectedCount !== 0 ? (
          <h2>Selected {selectedCount}</h2>
        ) : (
          <h2>None Selected</h2>
        )}
        <button type="button" onClick={handleDownload}>
          <img
            src="./assets/download.svg"
            alt="download arrow"
            className="svg"
          />{' '}
          Download Selected{' '}
        </button>
      </div>
      <div className="download">
        <div className="downloadHeadings">
          <h3>Name</h3>
          <h3>Device</h3>
          <h3>Path</h3>
          <h3>Status</h3>
        </div>
        {fileData && (
          <ul>
            {fileData.map((object) => {
              return (
                <li key={object.name} className={object.isChecked.toString()}>
                  <input
                    type="checkbox"
                    name={object.name}
                    checked={object.isChecked}
                    onChange={handleCheck}
                  />
                  <p>{object.name}</p>
                  <p>{object.device}</p>
                  <p className="path">{object.path}</p>
                  <div>
                    <p className={object.status} />
                    <p> {object.status}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
