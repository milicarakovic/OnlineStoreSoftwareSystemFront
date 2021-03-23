import { makeStyles } from '@material-ui/core';

export const useStylesMyOrdersStyle = makeStyles({
  root: {
    minWidth: 275,
    margin: '2%',
    boxShadow: '10px  10px  5px',
    background: '#e1e2eb',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  gridContainer: {
    marginTop: '3%',
    height: '85vh',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
  },
  gridItem: {},
  btnMore: {
    color: '#e1e2eb',
    background: '#222431',
    width: '40%',
  },
  labelNoOrder: {
    margin: 'auto',
  },
});
