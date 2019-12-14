import React, { useState, useEffect } from 'react';

export default function YourLocation() {
  const [fileData, setfileData] = useState();

  const setData = () => {
    // eslint-disable-next-line global-require
    const data = require('../../file.json');
    const isChecked = { isChecked: true };
    const fileDataUpdated = data.map((object) =>
      Object.assign(object, isChecked)
    );
    console.log(fileDataUpdated);
    setfileData(fileDataUpdated);
  };

  const handleChange = (event) => {
    // const fileDataUpdated = copyFileData.filter(
    //   (object) => object.name === event.target.name
    // );
    // fileDataUpdated[0].isChecked = event.target.checked;

    const fileDataUpdated = fileData.map((object) => {
      const objectUpdate = { ...object };
      if (objectUpdate.name === event.target.name) {
        objectUpdate.isChecked = event.target.checked;
      }
      return objectUpdate;
    });
    // this.setState({ data: { ...this.state.data, client: client } })
    // fileDataUpdated = { ...fileDataUpdated, isChecked: event.target.checked };
    console.log(fileDataUpdated);
    setfileData(fileDataUpdated);
  };

  useEffect(() => {
    setData();
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
        {fileData && (
          <ul>
            {fileData.map((file) => {
              return (
                <li key={file.name}>
                  <input
                    name={file.name}
                    type="checkbox"
                    checked={file.isChecked}
                    onChange={handleChange}
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
