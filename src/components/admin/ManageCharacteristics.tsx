import { Grid, IconButton, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { useState } from 'react';
import { Characteristics } from '../../models/Characteristics';
import { useStylesAdmin } from '../../syle/AdminStyle';

interface Props {
  onAdd: (char: Characteristics) => any;
  characteristics: Characteristics[];
}
export default function ManageCharacteristics(props: Props) {
  const classes = useStylesAdmin();
  const [name, setName] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);


  const addCharacteristics = (e: any) => {
    if (name !== null && name !== '' && value !== null && value !== '') {
      let ch: Characteristics = new Characteristics(0, name, value);
      props.onAdd(ch);
      setName('');
      setValue('');
    }
  };
  return (
    <>
      <Grid container className={classes.gridCOntainerCharacteristics}>
        <Grid item className={classes.labelCharacteristics}>
          <label>Karakteristika proizvoda: </label>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic-charName"
            label="Unesite naziv"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{ paddingRight: '5%' }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic-charValue"
            label="Unesite vrednost"
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ paddingRight: '5%' }}
          />
        </Grid>
        <Grid item className={classes.buttonCharacteristics}>
          <IconButton aria-label="add" onClick={addCharacteristics} id="add">
            <AddCircleIcon style={{ color: '#222431' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
