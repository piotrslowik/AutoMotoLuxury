import React, { useState } from 'react';

import Header from '../components/Partials/Header';
import Body from '../components/Partials/Body';
import Footer from '../components/Partials/Footer';

const MainPage = () => {
  const [filterSetup, setFilterSetup] = useState({});

  const handleFilter = obj => {
    setFilterSetup(obj);
  }

  return (
    <div className="App flex-column-center">
        <Header onFilter={handleFilter} onShowModal={() => this.showModal('AddCar')}/>
        <Body filterSetup={filterSetup} />
        <Footer />
    </div>
  );
}

export default MainPage;
