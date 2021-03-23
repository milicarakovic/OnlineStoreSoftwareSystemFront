import { createStyles, makeStyles } from '@material-ui/core';

export const useStylesProfile = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '80%',
      padding: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '3%',
    },
    switch: {
      padding: '1%',
    },
    container: {
      height: '50vh',
      border: '1px solid',
      position: 'relative',
      padding: '3%',
      boxShadow: '10px  10px  5px',
      background: '#e1e2eb',
      paddingTop: '7%',
    },
    gridItem: {
      marginBottom: '2%',
      maxWidth: '90%',
    },
    gridItem2: {
      // paddingLeft: '10%',
      marginBottom: '2%',
      maxWidth: '80%',
    },
    label: {
      float: 'left',
      width: '50%',
      fontWeight: 'bold',
      color: '##222431',
    },
    label2: {
      float: 'left',
      fontWeight: 'bold',
      color: '##222431',
    },
    btnUpload: {
      width: '13vw',
      marginTop: '3%',
      backgroundColor: '#676d92',
      color: 'white',
      borderRadius: '3px',
    },
    btnFinal: {
      marginTop: '3%',
      backgroundColor: '#676d92',
      color: 'white',
      width: '13vw',
    },
    btnsFinal: {
      padding: '5%',
    },
    rightElements: {
      flexDirection: 'column',
      // display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      // alignContent: 'center',

      // maxWidth: '80%',
    },
    con: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: '5%',
    },
  })
);
