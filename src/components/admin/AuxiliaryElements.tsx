import { Grid } from '@material-ui/core';
import React from 'react';
import { Manufacturer } from '../../models/Manufacturer';
import { ProductType } from '../../models/ProductType';
import { useStylesAuxiliary } from '../../syle/AuxiliaryElementsStyle';
import GeneratePDFs from './GeneratePDFs';
import ManageManufacturers from './ManageManufacturers';
import ManageProductType from './ManageProductType';

interface Props {
  manufacturers: Manufacturer[];
  productTypes: ProductType[];
  onAddManufacturer: (manufacturer: Manufacturer) => any;
}

export default function AuxiliaryElements(props: Props) {
  const classes = useStylesAuxiliary();
  return (
    <Grid className={classes.root}>
      <Grid item xs={5}>
        <ManageManufacturers
          manufacturers={props.manufacturers}
          onAddManufacturer={props.onAddManufacturer}
        />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        <ManageProductType />
        <GeneratePDFs
          manufacturers={props.manufacturers}
          productTypes={props.productTypes}
        />
      </Grid>
    </Grid>
  );
}
