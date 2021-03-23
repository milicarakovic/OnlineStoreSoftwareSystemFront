import { createStyles, makeStyles } from '@material-ui/core';

export const useStylesMyCart = makeStyles((theme) =>
  createStyles({
    myCart: {
      overflow: 'hidden',
      paddingTop: '50px',
      paddingLeft: '20px',
      paddingRight: '20px',
      // padding: '10px',
      boxShadow: '5px  5px  5px',
    },
    table: {
      maxHeight: '300px',
      display: 'block',
      overflowX: 'hidden',
      overflowY: 'auto',
      height: '250px',
      minWidth: 700,
      backgroundColor: '#E1E2EB',
      boxShadow: '5px  5px  5px',

      marginBottom: '2%',
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
    gridContainer: {
      marginBottom: '2%',
    },
    label: {
      color: '#222431',
      fontWeight: 'bold',
      marginRight: '2%',
    },
    btnConfirm: {
      color: '#e1e2eb',
      background: '#222431',
      backgroundImage: `url(
        ${'https://www.transparenttextures.com/patterns/asfalt-dark.png'}
      )`,
      width: '200px',
    },
    btnReject: {
      background: '#e1e2eb',
      color: '#222431',
      border: '1px',
      borderStyle: 'solid',
      width: '200px',
    },
    selected: {
      borderBottom: '1px solid black',
    },
    noselected: {
      borderBottom: '0',
    },
  })
);
