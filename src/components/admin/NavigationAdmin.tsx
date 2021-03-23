import React, { useState } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  makeStyles,
  withStyles,
  Theme,
  createStyles,
  Badge,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 9,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  })
)(Badge);

interface Props {
  isThereToEdit: boolean;
}
export default function NavigationAdmin(props: Props) {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <StyledBadge
          badgeContent={props.isThereToEdit ? '!' : null}
          color="primary"
        >
          <Tab component={Link} to="/proizvod" label="Dodaj proizvod" />
        </StyledBadge>
        <Tab component={Link} to="/pregled" label="Pregled proizvoda" />
        <Tab component={Link} to="/porudzbine" label="Porudzbine" />
        <Tab component={Link} to="/pomocno" label="Pomocna strana" />
      </Tabs>
    </Paper>
  );
}
