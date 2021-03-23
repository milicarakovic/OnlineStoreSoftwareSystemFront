import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { TransitionProps } from '@material-ui/core/transitions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useContext, useState } from 'react';
import {
  ManufacturerContext,
  ProductContext,
  ProductTypeContext
} from '../../App';
import { OrderItem } from '../../models/OrderItem';
import {
  StyledTableCell,
  StyledTableRow,
  useStylesViewProducts
} from '../../syle/ViewProducts';
import AddToCart from './AddToCart';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  onAddToCart: (item: OrderItem | null) => any;
}

export default function Catalogue(porps: Props) {
  const products = useContext(ProductContext);
  const productType = useContext(ProductTypeContext);
  const manufacturer = useContext(ManufacturerContext);

  const classes = useStylesViewProducts();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [man, setMan] = useState<string | null>(null);

  const [product, setProduct] = useState<number>(0);
  const [openAddToCart, setOpenAddToCart] = useState(false);

  const [productForChart, setProductForChart] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddToCart(false);
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

  const chosenProductForChart = products?.find(
    (p) => p.name === productForChart
  );

  const handleAddToCart = () => {
    setOpenAddToCart(true);
  };

  const handleAddItem = (item: OrderItem | null) => {
    if (item !== null) {
      porps.onAddToCart(item);
    }
  };

  const [page, setPage] = React.useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows = 5 - Math.min(5, filteredProducts?.length - page * 5);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container className={classes.search}>
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
              style={{ maxWidth: 300 }}
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
              style={{ maxWidth: 300, marginRight: '15%' }}
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
              style={{ maxWidth: 300 }}
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
          <Grid item xs={1}></Grid>
        </Grid>
        <TableContainer component={Paper} className={classes.paper}>
          <Table
            className={classes.table}
            aria-label="customized table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Naziv proizvoda</StyledTableCell>
                <StyledTableCell align="right">Proizvodjac</StyledTableCell>
                <StyledTableCell align="right">Kategorija</StyledTableCell>
                <StyledTableCell align="right">Cena</StyledTableCell>
                <StyledTableCell align="right">Karakteristike</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts?.slice(page * 5, page * 5 + 5).map((row) => (
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
                    <Button
                      onClick={() => {
                        setProductForChart(row.name);
                        handleAddToCart();
                      }}
                      startIcon={
                        <AddShoppingCartIcon color="inherit" fontSize="large" />
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 45 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPage={5}
            page={page}
            count={filteredProducts?.length}
            onChangePage={handleChangePage}
            style={{ height: '30px' }}
          />
        </TableContainer>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ margin: 'auto' }}>
          Karakteristike proizvoda
        </DialogTitle>
        <DialogContent style={{ margin: 'auto' }}>
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
      <AddToCart
        open={openAddToCart}
        onClose={handleClose}
        product={chosenProductForChart ? chosenProductForChart : null}
        onAddToCart={handleAddItem}
      />
    </div>
  );
}
