import { createStyles, makeStyles } from '@material-ui/core';

export const useStylesCreateAccount = makeStyles(() =>
  createStyles({
    container: {
      height: '80vh',
      width: '50vw',
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
    createLabel: {
      marginBottom: '3%',
      alignSelf: 'center',
      fontSize: '3vh',
      alignContent: 'center',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontWeight: 'bold',
      color: '#222431',
    },
    elements: {
      marginBottom: '2%',
      borderRadius: '10px',
      paddingRight: '3px',
    },
    gridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
    },
    gridItem: {
      alignSelf: 'center',
      marginBottom: '2%',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    buttons: {
      width: '15vw',
      marginRight: '5px',
    },
  })
);
