import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStylesCatalogue = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    label: {
      color: '#222431',
      fontWeight: 'bold',
      marginRight: '2%',
    },
  })
);
