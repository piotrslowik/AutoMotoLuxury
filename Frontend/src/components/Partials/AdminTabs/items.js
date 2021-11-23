import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Icon} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'

const ItemsDrawer = () => {

  const getRoute = (endpoint) => {
    return `/admin/${endpoint}`;
  }

  const items = [
    [
      {
        text: "Oferty",
        route: getRoute("offers"),
        icon: <Icon>folder</Icon>,
      },
      {
        text: "Nowa oferta",
        route: getRoute("offers/new"),
        icon: <Icon>create_new_folder</Icon>,
      },
    ],
    [
      {
        text: "Paliwa",
        route: getRoute("fuels"),
        icon: <Icon>local_gas_station</Icon>,
      },
      {
        text: "Marki",
        route: getRoute("makes"),
        icon: <Icon>directions_car_filled</Icon>,
      },
      {
        text: "Modele",
        route: getRoute("models"),
        icon: <FontAwesomeIcon style={{ width: '24px' }} icon={faCarSide} />,
      },
      {
        text: "Pochodzenia",
        route: getRoute("origins"),
        icon: <Icon>flag</Icon>,
      },
    ],
    [
      {
        text: "Użytkownicy",
        route: getRoute("users"),
        icon: <Icon>people</Icon>,
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
                        { item.icon }
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
