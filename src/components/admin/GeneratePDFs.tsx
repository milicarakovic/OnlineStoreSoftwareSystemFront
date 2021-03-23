import { Button, Grid, Paper } from '@material-ui/core';
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { Manufacturer } from '../../models/Manufacturer';
import { ProductType } from '../../models/ProductType';
import { useStylesPDFs } from '../../syle/AuxiliaryElementsStyle';

interface Props {
  manufacturers: Manufacturer[];
  productTypes: ProductType[];
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: '15mm',
  },
  section: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '3mm',
    height: '10mm',
    borderRadius: '1mm',
    borderStyle: 'solid',
  },
  title: {
    fontSize: '7mm',
  },
  details: {
    marginLeft: '10mm',
    fontSize: 11,
    marginBottom: '2mm',
  },
});

export function PdfDocumentMan(manufacturers: Manufacturer[]) {
  return (
    <Document>
      <Page style={styles.page}>
        {manufacturers
          ? manufacturers.map((a, index) => {
              return (
                <View key={index} style={styles.section}>
                  <View style={styles.title}>
                    <Text>Sifra proizvodjaca: {a.id}</Text>
                    <Text>Naziv proizvodjaca: {a.name}</Text>
                  </View>

                  <View style={styles.details}>
                    <Text>Email proizvodjaca: {a.email}</Text>
                    <Text>Telefon proizvodjaca: {a.phone}</Text>
                    <Text>Adresa proizvodjaca: {a.adress}</Text>
                  </View>
                </View>
              );
            })
          : ''}
      </Page>
    </Document>
  );
}

export function PdfDocumentTypes(types: ProductType[]) {
  return (
    <Document>
      <Page style={styles.page}>
        {types
          ? types.map((a, index) => {
              return (
                <View key={index} style={styles.section}>
                  <Text>Sifra tipa proizvoda: {a.id}</Text>
                  <Text>Naziv tipa proizvoda: {a.name}</Text>
                </View>
              );
            })
          : ''}
      </Page>
    </Document>
  );
}

export default function GeneratePDFs(props: Props) {
  const classes = useStylesPDFs();
  return (
    <Grid component={Paper} className={classes.root}>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.labelMain}>Spiskovi</label>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Grid item xs={6}>
          <Button
            id="listMan"
            variant="contained"
            className={classes.btns}
            style={{ color: '#676d92' }}
          >
            <PDFDownloadLink
              document={PdfDocumentMan(props.manufacturers)}
              className={classes.btns}
              style={{ color: '#676d92' }}
              fileName="proizvodjaci.pdf"
            >
              Izlistaj proizvodjace
            </PDFDownloadLink>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            id="listType"
            variant="contained"
            className={classes.btns}
            style={{ color: '#222431' }}
          >
            <PDFDownloadLink
              document={PdfDocumentTypes(props.productTypes)}
              className={classes.btns}
              style={{ color: '#676d92' }}
              fileName="tipoviProizvoda.pdf"
            >
              Izlistaj tipove proizvoda
            </PDFDownloadLink>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
