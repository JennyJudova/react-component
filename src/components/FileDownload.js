import React, { useState, useEffect } from 'react';

export default function YourLocation() {
  const [fileData, setfileData] = useState();
  const [selectedCount, setSelectedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduled, setScheduled] = useState(0);
  const [allCheck, setAllCheck] = useState(false);

  // imports data from file.json and adds isChecked to each object. isCheck is controlled by the checkbox input
  const setData = () => {
    // eslint-disable-next-line global-require
    const data = require('../../file.json');
    const isChecked = { isChecked: false };
    const fileDataUpdated = data.map((object) =>
      Object.assign(object, isChecked)
    );
    setfileData(fileDataUpdated);
  };

  // Modal opens when the Download Selected button is pressed
  const modalOpen = () => {
    if (isModalOpen === false) {
      setIsModalOpen(true);
    } else setIsModalOpen(false);
  };

  // This function checks is the Select All checkbox is showing the correct state (checked, not checked and indeterminate)
  const correctTickCheck = (selectedUpdated) => {
    if (selectedUpdated === 0) {
      document.getElementById('checkAll').indeterminate = false;
      const allCheckUpdate = false;
      setAllCheck(allCheckUpdate);
    } else if (selectedUpdated > 0 && selectedUpdated < fileData.length) {
      document.getElementById('checkAll').indeterminate = true;
    }
  };

  // controls the count of how many files where selected
  const countSelected = (num, e) => {
    let selectedUpdated = 0;
    if (num === 1) selectedUpdated = selectedCount;
    if (e.target.checked === true) {
      selectedUpdated += num;
    } else if (num === 1) {
      selectedUpdated -= num;
    }
    correctTickCheck(selectedUpdated);
    setSelectedCount(selectedUpdated);
  };

  // this is triggered by Dowload Selected
  const handleDownload = () => {
    modalOpen();
    const scheduledUpdated = [];
    let selectedUpdated = selectedCount;
    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      if (object.status === 'scheduled' && object.isChecked === true) {
        scheduledUpdated.push(object.device);
        objectUpdate.isChecked = false;
        selectedUpdated -= 1;
      }
      setSelectedCount(selectedUpdated);
      setScheduled(scheduledUpdated);
      return objectUpdate;
    });
    setfileData(fileDataUpdated);
  };

  // this is triggered when an individual check box is checked
  const handleCheck = (e) => {
    countSelected(1, e);
    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      if (objectUpdate.name === e.target.name) {
        objectUpdate.isChecked = e.target.checked;
      }
      return objectUpdate;
    });
    setfileData(fileDataUpdated);
  };

  // this is triggered when a select all check box is selected
  const handleAllCheck = (e) => {
    countSelected(fileData.length, e);
    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      objectUpdate.isChecked = e.target.checked;
      return objectUpdate;
    });
    const allCheckUpdate = e.target.checked;
    setAllCheck(allCheckUpdate);
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
                        Device: {object.device} <br />
                        Path: {object.path} <br />
                        Is ready to download.
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
      <form>
        <div className="downloadWrapper">
          <input
            type="checkbox"
            onChange={handleAllCheck}
            id="checkAll"
            checked={allCheck}
          />
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
            <h3 className="path">Path</h3>
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
      </form>
    </div>
  );
}
