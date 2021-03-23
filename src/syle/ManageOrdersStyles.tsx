import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStylesOrders = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: '10px',
      position: 'relative',
      padding: '3% 3% 3% 3%',
      boxShadow: '5px  5px  2px',
      background: '#e1e2eb',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      marginLeft: '3%',
      marginRight: '3%',
      marginTop: '2%',
      //   marginBottom: '2%',
      width: '100vw',
      height: '15vh',
    },
    mainLabel: {
      alignSelf: 'center',
      fontSize: '3vh',
      fontWeight: 'bold',
      color: '#222431',
      //   marginLeft: '25%',
      //   marginRight: '25%',
      paddingLeft: '40%',
    },
    radioButtonContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: '20%',
    },
    label: {
      fontWeight: 'bold',
    },
    gridItem: {
      //   maxWidth: '30vw',
    },
    btnMore: {
      color: '#e1e2eb',
      background: '#222431',
      width: '60%',
      '&:hover': {
        background: '#676d92',
      },
    },
    switch: {
      paddingTop: '2%',
      marginLeft: '80%',
    },
    table: {
      //   display: 'block',
      overflowX: 'hidden',
      overflowY: 'auto',
      height: '200px',
      backgroundColor: '#E1E2EB',
      boxShadow: '5px  5px  5px',
      borderRadius: '2px',
      // marginBottom: '2%',
      maxWidth: '95%',
      marginLeft: '3%',
    },
    thead: {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
      borderBottom: 'inset',
      backgroundColor: '#222431',
      color: 'white !important',
    },
    tbody: {
      display: 'table',
      overflow: 'auto',
      tableLayout: 'fixed',
      maxHeight: ' 250px',
      width: ' 100%',
    },
    trow: {
      width: '100%',
    },
    btnExit: {
      color: '#222431',
      fontWeight: 'bold',
      fontSize: 'large',
      // position: 'absolute',
      // paddingBottom: '1%',
      height: '3vh',
    },
    dialog: {
      padding: '1%',
    },
  })
);
