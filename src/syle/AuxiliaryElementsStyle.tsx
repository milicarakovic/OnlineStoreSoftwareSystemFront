import { makeStyles, createStyles } from '@material-ui/core';

export const useStylesAuxiliary = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      height: '100%',
      justifyContent: 'center',
      padding: '2%',

      paddingTop: '4%',
    },
  })
);

export const useStylesManageManufacturers = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      padding: '2%',
      borderRadius: '10px',
      position: 'relative',
      boxShadow: '10px  10px  5px',
      background: '#e1e2eb',
    },
    gridItem: {
      alignSelf: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      paddingBottom: '2%',
    },
    labelMain: {
      alignSelf: 'center',
      fontSize: '3vh',
      fontWeight: 'bold',
      color: '#222431',
      margin: 'auto',
    },
    label: {
      width: '15%',
      marginRight: '2%',
      marginLeft: '2%',
      color: '#222431',
      paddingTop: '3%',
    },
    textFieldItem: {
      width: '80%',
    },
    btns: {
      marginLeft: '25%',
      marginRight: '25%',
    },
  })
);

export const useStylesPDFs = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      padding: '2%',
      borderRadius: '10px',
      position: 'relative',
      boxShadow: '10px  10px  5px',
      background: '#e1e2eb',
      marginTop: '10%',
    },
    gridItem: {
      alignSelf: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      paddingBottom: '2%',
    },
    labelMain: {
      alignSelf: 'center',
      fontSize: '3vh',
      fontWeight: 'bold',
      color: '#222431',
      margin: 'auto',
    },
    btns: {
      marginLeft: '15%',
      marginRight: '15%',
      // backgroundColor: '#222431',
      color: 'white',
      width: '70%',
      height: '100%',
    },
  })
);

// export const useStylesPDFs = makeStyles(() =>
//   createStyles({
//     root: {
//       width: '100%',
//       padding: '2%',
//       borderRadius: '10px',
//       position: 'relative',
//       boxShadow: '10px  10px  5px',
//       background: '#e1e2eb',
//     },
//   })
// );
