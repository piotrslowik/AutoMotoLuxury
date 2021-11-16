import React, { useState, useEffect } from "react";
import { useHistory } from "react-router"
import { useLocation } from 'react-router-dom';

import { Tabs, Tab, Card, CardContent } from "@mui/material";

const AdminTabs = ({ children }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const [value, setValue] = useState(0);

  useEffect(() => {
    let pathArr = pathname.split('/');
    pathArr = pathArr.slice(0, 3);
    const keyword = pathArr.join('/');
    const index = elements.indexOf(el => keyword === el.route);
    console.log(index);
    elements.forEach(el => {
      console.log(keyword, el.route, keyword === el.route);
    })
    setValue(index);
  }, []);

  const getRoute = (endpoint) => {
    return `/admin/${endpoint}`;
  }
  
  const elements = [
    {
      text: "Oferty",
      route: getRoute("offers"),
    },
    {
      text: "Parametry",
      route: getRoute("params"),
    },
    {
      text: "Użytkownicy",
      route: getRoute("users"),
    },
  ];

  const mapTabs = () => {
    return elements.map(el => 
      <Tab label={el.text} onClick={() => goTo(el.route)} key={el.route} />
    );
  }

  const goTo = (route) =>{
    history.push(route);
  }

  const handleTabChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  return (
    <Card>
      <Tabs value={value} onChange={handleTabChange} centered>
        { mapTabs() }
      </Tabs>
      <CardContent>
        { children }
      </CardContent>
    </Card>
  );
};

export default AdminTabs;
