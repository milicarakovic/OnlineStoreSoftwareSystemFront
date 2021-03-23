import {
  Button, DialogActions, Slide,






  Table,
  TableBody, TableCell, TableContainer,


  TableHead, TableRow
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useState } from 'react';
import { Order } from '../../models/Order';
import { useStylesOrders } from '../../syle/ManageOrdersStyles';

interface Props {
  open: boolean;
  onClose: (value: boolean) => any;
  order: Order | null;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function AboutOrder(props: Props) {
  const [openAddToChart, setOpenAddToChart] = useState(false);
  const classes = useStylesOrders();
  const handleClose = () => {
    props.onClose(true);
  };
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpenAddToChart}
      className={classes.dialog}
    >

      <DialogActions>
        <label
          style={{ marginRight: '20%', fontWeight: 'bold', color: '#222431' }}
        >
          Detalji porudzbine
        </label>
        <Button
          variant="outlined"
          onClick={() => {
            handleClose();
          }}
          id="buttonIcon"
          color="primary"
          autoFocus
        >
          Zatvori
        </Button>
      </DialogActions>
      <TableContainer className={classes.table} style={{ marginBottom: '2%' }}>
        <Table size="medium">
          <TableHead className={classes.thead} key="theadkey">
            <TableRow>
              <TableCell style={{ color: 'white' }}>Naziv proizvoda</TableCell>
              <TableCell style={{ color: 'white' }}>Jedinicna cena</TableCell>
              <TableCell style={{ color: 'white' }}>Kolicina</TableCell>
              <TableCell style={{ color: 'white' }}>Iznos stavke</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {props.order?.orderItems.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  className={classes.trow}
                  style={{ color: 'white' }}
                >
                  <TableCell>{row.product.name}</TableCell>
                  <TableCell>{row.product.price}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.orderItemPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
