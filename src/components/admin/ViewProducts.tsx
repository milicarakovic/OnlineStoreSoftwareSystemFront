import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductTypeContext, ManufacturerContext } from '../../App';
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Slide,
  Snackbar,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useStylesViewProducts } from '../../syle/ViewProducts';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { StyledTableCell } from '../../syle/ViewProducts';
import { StyledTableRow } from '../../syle/ViewProducts';
import { TransitionProps } from '@material-ui/core/transitions';
import { Product } from '../../models/Product';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteProduct, GetAllProduct } from '../../service/api';
import EditIcon from '@material-ui/icons/Edit';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  onEditProduct: (product: Product) => any;
}

export default function ViewProducts(props: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const productType = useContext(ProductTypeContext);
  const manufacturer = useContext(ManufacturerContext);
  const classes = useStylesViewProducts();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [man, setMan] = useState<string | null>(null);

  const [product, setProduct] = useState<number>(0);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const filteredProducts = products?.filter((p) => {
    if (type === null && man === null && search !== '')
      return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    if (search === '' && type !== null && man === null)
      return (
        p.productType.name.toLocaleLowerCase() === type?.toLocaleLowerCase()
      );
    if (search === '' && type === null && man !== null)
      return (
        p.manufacturer.name.toLocaleLowerCase() === man?.toLocaleLowerCase()
      );
    if (search !== '' && type !== null && man === null) {
      return (
        p.productType.name.toLocaleLowerCase() === type?.toLocaleLowerCase() &&
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    if (search !== '' && type === null && man !== null) {
      return (
        p.manufacturer.name.toLocaleLowerCase() === man?.toLocaleLowerCase() &&
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    if (search === '' && type !== null && man !== null) {
      return (
        p.manufacturer.name.toLocaleLowerCase() === man?.toLocaleLowerCase() &&
        p.productType.name.toLocaleLowerCase() === type?.toLocaleLowerCase()
      );
    }
    if (search !== '' && type !== null && man !== null) {
      return (
        p.manufacturer.name.toLocaleLowerCase() === man?.toLocaleLowerCase() &&
        p.productType.name.toLocaleLowerCase() === type?.toLocaleLowerCase() &&
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    return products;
  });


  const chosenProduct = products?.find((p) => p.id === product);

  const handleDelete = (productId: number) => {
    OnDeleteProduct(productId);
  };

  const OnDeleteProduct = async (productID: number) => {
    try {
      const res = await DeleteProduct(productID);
      let product: any = products.find((p) => p.id === productID);
      if (!res.ok) {
        handleClickAlertError();
      } else {
        let products2: Product[] = [...products];
        products2.splice(products2.indexOf(product), 1);
        handleClickAlert();
        setProducts(products2);
      }
    } catch {
      console.log('error in deleting product');
      handleClickAlertError();
    }
  };

  useEffect(() => {
    async function call() {
      await getData();
    }
    call();
  }, []);

  const getData = async () => {
    const products = await GetAllProduct();

    setProducts(products);
  };

  const handleEditProduct = (productID: number) => {
    let p: any = products.find((pr) => pr.id === productID);
    props.onEditProduct(p);
  };

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleClickAlertError = () => {
    setOpenAlertError(true);
    console.log('error');
  };
  const handleCloseAlertError = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertError(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Uspesno obrisan proizvod!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="warning">
          Nije moguce obrisati proizvod.
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid
          container
          className={classes.search}
          style={{ marginBottom: '1%' }}
        >
          <Grid
            item
            xs={2}
            className={classes.searchItem}
            style={{ margin: 'auto', flex: 'unset' }}
          >
            <label className={classes.label}>Pretraga:</label>
          </Grid>
          <Grid item xs={3} className={classes.searchItem}>
            <TextField
              label="Naziv proizvoda"
              margin="normal"
              variant="outlined"
              style={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} className={classes.searchItem}>
            <Autocomplete
              id="grouped-demo-manufacturer"
              options={manufacturer?.map((m) => m.name)}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proizvodjac"
                  margin="normal"
                  variant="outlined"
                />
              )}
              onChange={(event: any, value: string | null) => setMan(value)}
            />
          </Grid>
          <Grid item xs={3} className={classes.searchItem}>
            <Autocomplete
              id="grouped-demo-type"
              options={productType?.map((p) => p.name)}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tip proizvoda"
                  margin="normal"
                  variant="outlined"
                />
              )}
              onChange={(event: any, value: string | null) => setType(value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              onClick={handlePrint}
              className={classes.pdf}
            >
              PDF
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} className={classes.paper}>
          <Table
            className={classes.table}
            aria-label="customized table"
            ref={componentRef}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Naziv proizvoda</StyledTableCell>
                <StyledTableCell align="right">Proizvodjac</StyledTableCell>
                <StyledTableCell align="right">Kategorija</StyledTableCell>
                <StyledTableCell align="right">Cena</StyledTableCell>
                <StyledTableCell align="right">Karakteristike</StyledTableCell>
                <StyledTableCell align="right">Obrisi/Izmeni</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts?.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.manufacturer.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.productType.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton>
                      <InfoIcon
                        onClick={() => {
                          setProduct(Number(row.id));
                          handleClickOpen();
                        }}
                      />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => handleDelete(row.id)}
                      startIcon={
                        <DeleteIcon color="inherit" fontSize="large" />
                      }
                    />
                    <Button
                      onClick={() => {
                        handleEditProduct(row.id);
                      }}
                      startIcon={<EditIcon color="inherit" fontSize="large" />}
                      component={Link}
                      to="/proizvod"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ height: '100%' }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          Karakteristike proizvoda
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Naziv</TableCell>
                  <TableCell align="right">Vrednost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chosenProduct?.characteristics.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zatvori
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
