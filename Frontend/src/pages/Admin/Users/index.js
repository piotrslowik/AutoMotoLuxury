import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';
import usersActions from '../../../store/actions/users';

import DataTable from "../../../components/Shared/DataTable";
import Loader from "../../../components/Shared/Loader";
import CardContent from "@mui/material/CardContent";

const Users = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const { users } = useSelector(state => state.users);

  const headers = [
    {
      text: 'TEST',
      value: 'username',
      align: 'center',
    },
    {
      text: '',
      value: 'actions',
      sx: { width: '130px' },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    setPageHeader();
  }, [dispatch]);

  const fetchUsers = async () => {
    setLoading(true);
    console.log([...Array(5).keys()].map(no => ({username: `USER #${no + 1}`})))
    dispatch(usersActions.setUsers([...Array(5).keys()].map(no => ({username: `USER #${no + 1}`}))));
    setLoading(false);
  }

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Użytkownicy"));
  }

  const slots = {
    actions: item => <div>[AKCJE]</div>,
  };

  return (
    (isLoading)
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie użytkowników" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          headers={headers}
          items={users}
          slot={slots}
          // headerSlot={headerSlots}
        />
      </CardContent>
  );
}

export default Users;
