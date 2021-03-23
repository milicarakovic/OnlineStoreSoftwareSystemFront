import { createStyles, makeStyles } from '@material-ui/core';

export const useStylesAdmin = makeStyles(() =>
  createStyles({
    root: {
      // background: 'green',
      paddingTop: '1%',
      paddingBottom: '3%',
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      maxHeight: '100vh',
    },
    mainGridContainer: {
      borderRadius: '10px',
      position: 'relative',
      padding: '3%',
      boxShadow: '10px  10px  5px',
      background: '#e1e2eb',
      flexDirection: 'column',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
    },
    gridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      paddingBottom: '1%',
      // background: 'red',
      marginBottom: '1%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    gridItem: {
      alignSelf: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      // background: 'purple',
    },
    label: {
      alignSelf: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      width: '20vh',
    },
    gridCOntainerCharacteristics: {
      display: 'flex',
      justifyContent: 'center',
    },
    labelCharacteristics: {
      alignSelf: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      paddingRight: '2%',
    },
    buttonCharacteristics: {
      alignSelf: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      paddingRight: '2%',
    },
    tableContainer: {
      display: 'block',
      width: '60%',
      alignSelf: 'center',
      alignContent: 'center',
      marginTop: '1%',
      maxHeight: '30vh',
    },
    tableHead: {
      // display: 'table',
      tableLayout: 'fixed',
      overflow: 'auto',
      width: 'inherit',
    },
    tableBody: {
      // display: 'block',
      overflow: 'auto',
      tableLayout: 'fixed',
      maxHeight: '40vh',
      width: 'inherit',

      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    row: {
      width: '100%',
    },
    finalButtons: {
      width: '25vw',
      justifyContent: 'spaceBetween',
    },
  })
);
