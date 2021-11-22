import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Icon} from '@mui/material';

const ItemsDrawer = () => {

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
        route: getRoute("fuels"),
        icon: "local_gas_station",
      },
      {
        text: "Marki",
        route: getRoute("makes"),
        icon: "directions_car_filled",
      },
      {
        text: "Pochodzenia",
        route: getRoute("origins"),
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
                  <Link key={item.route} to={item.route}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon>{ item.icon }</Icon>
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
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

export default ItemsDrawer;
