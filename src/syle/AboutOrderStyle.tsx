import { createStyles, makeStyles } from '@material-ui/core';

export const useStylesAboutOrder = makeStyles((theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      width: '50%',
      height: '50vh',
      background: 'white',
      backgroundImage: `url(
        ${'https://www.transparenttextures.com/patterns/asfalt-dark.png'}
      )`,
    },
    dialogActions: {
      background: 'white',
      backgroundImage: `url(
        ${'https://www.transparenttextures.com/patterns/asfalt-dark.png'}
      )`,
    },
    table: {
      //   display: 'block',
      overflowX: 'hidden',
      overflowY: 'auto',
      height: '200px',
      backgroundColor: '#E1E2EB',
      boxShadow: '5px  5px  5px',
      borderRadius: '2px',
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
  })
);
