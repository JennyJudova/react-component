import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';

import FileDownload from './components/FileDownload';

const App = () => {
  return (
    <div>
      <h1>Download your files here</h1>
      <FileDownload />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
