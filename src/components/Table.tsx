"use client";
import * as React from "react";
import { MdDelete } from "react-icons/md";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Column {
  id:
    | "productName"
    | "description"
    | "pricePerItem"
    | "numProducts"
    | "total"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "productName", label: "Product Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170, align: "left" },
  {
    id: "pricePerItem",
    label: "Price per Item ($)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "numProducts",
    label: "No. of Products",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total ($)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "left",
  },
];

interface Data {
  productName: string;
  description: string;
  pricePerItem: number;
  numProducts: number;
  total: number;
}

function createData(
  productName: string,
  description: string,
  pricePerItem: number,
  numProducts: number
): Data {
  const total = pricePerItem * numProducts;
  return { productName, description, pricePerItem, numProducts, total };
}

const initialRows = [
  createData("iPhone 14", "Latest Apple iPhone", 999.99, 2),
  createData("MacBook Pro", "16-inch M1 Pro", 2499.0, 1),
  createData("AirPods Pro", "Noise Cancelling Earbuds", 249.0, 3),
  createData("iPad Air", "10.9-inch Liquid Retina", 599.99, 2),
  createData("Apple Watch", "Series 7, GPS", 399.0, 1),
  createData("HomePod Mini", "Smart Speaker", 99.99, 4),
  createData("Magic Keyboard", "For iPad Pro", 299.0, 1),
  createData("Apple TV 4K", "Streaming Device", 179.99, 2),
  createData("MagSafe Charger", "Wireless Charging Pad", 39.99, 5),
  createData("iMac", "24-inch M1 Chip", 1499.0, 1),
];

export default function StickyHeadTable() {
  const [rows, setRows] = React.useState<Data[]>(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    productName: "",
    description: "",
    pricePerItem: "",
    numProducts: "",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewProduct({
      productName: "",
      description: "",
      pricePerItem: "",
      numProducts: "",
    });
  };

  const handleAddProduct = () => {
    const { productName, description, pricePerItem, numProducts } = newProduct;
    if (
      productName &&
      description &&
      !isNaN(parseFloat(pricePerItem)) &&
      !isNaN(parseInt(numProducts))
    ) {
      const newRow = createData(
        productName,
        description,
        parseFloat(pricePerItem),
        parseInt(numProducts)
      );
      setRows([...rows, newRow]);
      handleCloseDialog();
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <Button className= "bg-purple-500"
        variant="outlined"
        color="info"
        onClick={handleOpenDialog}
        sx={{ marginBottom: 2 }}
      >
        + Add Product
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align="left">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteRow(index)}
                          >
                            <MdDelete size={24} />
                          </Button>
                        </TableCell>
                      );
                    }
                    const value = row[column.id as keyof Data];
                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for Adding New Product */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Price per Item ($)"
            type="number"
            fullWidth
            value={newProduct.pricePerItem}
            onChange={(e) =>
              setNewProduct({ ...newProduct, pricePerItem: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="No. of Products"
            type="number"
            fullWidth
            value={newProduct.numProducts}
            onChange={(e) =>
              setNewProduct({ ...newProduct, numProducts: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
