import React, { useState } from 'react';

import Body from '../components/Partials/Body';

const MainPage = () => {
  const [filterSetup, setFilterSetup] = useState({});

  return (
    <div className="App flex-column-center">
        <Body filterSetup={filterSetup} />
    </div>
  );
}

export default MainPage;
