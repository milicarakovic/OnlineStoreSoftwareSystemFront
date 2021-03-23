import { createStyles, makeStyles } from '@material-ui/core';

export const useStylesContactAdmin = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      height: '95%',
      justifyContent: 'center',
      padding: '2%',
      alignContent: 'center',
      flexDirection: 'column',
      maxHeight: '100vh',
    },
    form: {
      maxWidth: '55%',
      maxHeight: '50%',
      borderRadius: '10px',
      position: 'relative',
      padding: '3%',
      paddingLeft: '25%',
      boxShadow: '10px  10px  5px',
      background: '#e1e2eb',
      flexDirection: 'column',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
    },
    labelContactUs: {
      marginBottom: '2%',
      alignSelf: 'center',
      fontSize: '3vh',
      alignContent: 'center',
      display: 'flex',
      fontWeight: 'bold',
      color: '#222431',
      paddingLeft: '25%',
    },
    label: {
      marginBottom: '3%',
    },
    input: {
      width: '70%',
      marginLeft: 'auto',
      marginBottom: '2%',
      marginTop: '1%',
    },
  })
);
