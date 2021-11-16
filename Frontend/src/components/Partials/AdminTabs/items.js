import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

import { Divider, List, ListItem, ListItemIcon, ListItemText, Icon} from '@mui/material';

const ItemsDrawer = ({ pageNameSetter }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const index = items.flat().indexOf(el => el.route === pathname);
    console.log(items.flat());
    console.log(pathname, index);
  }, []);

  const getRoute = (endpoint) => {
    return `/admin/${endpoint}`;
  }

  const items = [
    [
      {
        text: "Oferty",
        route: getRoute("offers"),
        icon: "folder",
      },
      {
        text: "Nowa oferta",
        route: getRoute("offers/new"),
        icon: "create_new_folder",
      },
    ],
    [
      {
        text: "Paliwa",
        route: getRoute("params/fuels"),
        icon: "local_gas_station",
      },
      {
        text: "Marki",
        route: getRoute("params/makes"),
        icon: "directions_car_filled",
      },
      {
        text: "Pochodzenia",
        route: getRoute("params/origins"),
        icon: "flag",
      },
    ],
    [
      {
        text: "Użytkownicy",
        route: getRoute("users"),
        icon: "people",
      },
    ],
  ];

  return (
    <div>
      {
        items.map((domain, index) => 
          <React.Fragment key={index}>
            <List>
              {
                domain.map(item => 
                  <ListItem button key={item.route}>
                    <ListItemIcon>
                      <Icon>{ item.icon }</Icon>
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                )
              }
            </List>
            { index + 1 < items.length ? <Divider /> : null }
          </React.Fragment>
        )
      }
    </div>
  );
};

ItemsDrawer.propTypes = {
  pageNameSetter: PropTypes.func,
};

export default ItemsDrawer;
