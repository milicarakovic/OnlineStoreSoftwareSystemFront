import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  TableCell,
  TableRow,
} from '@material-ui/core';

export const useStylesViewProducts = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      height: '100%',
      justifyContent: 'center',
      padding: '1% 2% 3% 2%',
    },
    gridList: {
      // width: 600,
      justifyContent: 'space-around',
      height: 450,
      backgroundColor: 'red',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    search: {
      marginBottom: '2%',
      alignContent: 'center',
      flexWrap: 'wrap',
    },
    searchItem: {
      alignItems: 'center',
      alignContent: 'center',
    },
    table: {
      // minWidth: 700,
      backgroundColor: '#E1E2EB',
      // overflowX: 'hidden',
      // overflowY: 'hidden',
    },
    paper: {
      boxShadow: '5px  5px  5px',
      background: '#e1e2eb',
    },
    label: {
      color: '#222431',
      fontWeight: 'bold',
      marginRight: '2%',
      // margin: '50%',
      margin: 'auto',
    },
    pdf: {
      backgroundColor: '#676d92',
      alignSelf: 'right',
      width: '200px',
      marginBottom: '2%',
      boxShadow: '3px  3px  3px',
    },
    pom: {
      visibility: 'hidden',
    },
  })
);

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#222431',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      height: 45,
    },
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        height: 45,
      },
    },
  })
)(TableRow);
