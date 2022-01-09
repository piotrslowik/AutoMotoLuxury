import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';
import usersActions from '../../../store/actions/users';

import { getUsers, changeRole } from "../../../logic/graphql/user";

import DataTable from "../../../components/Shared/DataTable";
import Loader from "../../../components/Shared/Loader";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button";

const Users = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const { users } = useSelector(state => state.users);

  const headers = [
    {
      text: 'Email',
      value: 'email',
      align: 'center',
    },
    {
      text: 'Administrator',
      value: 'isAdmin',
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
    try {
      const result = await getUsers();
      dispatch(usersActions.setUsers(result));
    } catch (error) {
      dispatch(helpersActions.setSnackbar({ message: error.message, type: 'error' }));
    } finally {
      setLoading(false);
    }
  }

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Użytkownicy"));
  }

  const handleStatusChange = user => {
    setDialog(true);
    setUserToEdit(user);
  }
  const changeAdminStatus = async () => {
    try {
      await changeRole( userToEdit._id, !userToEdit.isAdmin );
      fetchUsers();
    } catch (error) {
      dispatch(helpersActions.setSnackbar({ message: error.message, type: 'error' }));
    } finally {
      setDialog(false);
    }
  }

  const getAdminChip = user => {
    return (
      <Chip
        clickable
        onClick={() => handleStatusChange(user)}
        label={user.isAdmin ? "Admin" : "User"}
        variant={user.isAdmin ? "" : "outlined"}
        color="secondary"
      />
    )
  }

  const slots = {
    isAdmin: item => getAdminChip(item),
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
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
        >
          <DialogTitle>Zmiana roli</DialogTitle>
          <DialogContent>
            Czy na pewno chcesz {userToEdit.isAdmin ? "usunąć" : "dodać"} użytkownikowi rolę administratora?
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ float: 'right' }}
              variant="outlined"
              onClick={changeAdminStatus}
            >
              Zmień rolę
            </Button>
        </DialogActions>
        </Dialog>
      </CardContent>
  );
}

export default Users;
