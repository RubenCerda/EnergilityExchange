import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Collapse,
  IconButton,
  Table,
  FormControl,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCheckProperty } from "../../hooks/useCheckProperty";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";

const CheckPropertyComponent = (props: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const { selection } = props;
  //Pagination
  const [limitPages, setLimitPages] = useState(5);
  const handleChange = (event: any) => {
    setLimitPages(event.target.value);
  };
   const [currentPage, setCurrentPage] = useState(1);

  const { checkProperty, totalPage } = useCheckProperty(selection, currentPage,
    limitPages);
  
  useEffect(() => {
    if (checkProperty.listItems.length !== 0) {
      routerIndex();
    }
  }, [checkProperty.listItems]);

  function routerIndex() {
    setShowDetails(true);
  }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className="fm_table">
        <TableHead className="fm_table--head">
          <TableRow>
            <TableCell className="fm_tb_name" />
            <TableCell className="fm_tb_name " colSpan={1}>Check Month</TableCell>
            <TableCell className="fm_tb_name " colSpan={1}>Property Number</TableCell>
            <TableCell className="fm_tb_name " colSpan={1}>Property Name</TableCell>
            <TableCell className="fm_tb_name " colSpan={1}>Gross Amount</TableCell>
            <TableCell className="fm_tb_name " colSpan={1}>Tax</TableCell>
            <TableCell className="fm_tb_name " colSpan={1}>Deductions</TableCell>
            <TableCell className="fm_tb_name " colSpan={1}>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkProperty.listItems.map((row: any, index: any) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="row align-items-center justify-content-end fm_table--pagination">
          <div className="d-flex w-auto align-items-center fm_table--pagination--rows">
            <p className=".fm_paragraph">Rows per page</p>
            <FormControl className="d-flex">
              <Select
                className="fm_table--pagination--rows--input"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limitPages}
                onChange={handleChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="d-flex w-auto ">
            {showDetails && (
              <Pagination
                initialPage={currentPage}
                itemsPerPage={limitPages}
                onPageСhange={(pageNumber) => setCurrentPage(pageNumber)}
                totalItems={totalPage}
                pageNeighbours={2}
              />
            )}
          </div>
        </div>
    </div>
  );
};

export default CheckPropertyComponent;

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell className="col-auto">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="col-auto"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={1}>{row.monthDate}</TableCell>
        <TableCell colSpan={1}>{row.propertyNo}</TableCell>
        <TableCell colSpan={1}>{row.propertyName}</TableCell>
        <TableCell colSpan={1}>{row.grossAmount}</TableCell>
        <TableCell colSpan={1}>{row.tax}</TableCell>
        <TableCell colSpan={1}>{row.deduction}</TableCell>
        <TableCell colSpan={1}>{row.totalAmountM}</TableCell>
      </TableRow>
      <TableRow className="fm_subtable">
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="fm_subtable--subcell--name">
                      Check Date
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Check Month
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Property Number
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Property Name
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Check Number
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Owner Number
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Gross Amount
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Tax
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Deductions
                    </TableCell>
                    <TableCell className="fm_subtable--subcell--name">
                      Total Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow: any) => (
                    <TableRow key={detailsRow.checkDate}>
                      <TableCell
                        component="th"
                        className="col-auto fm_subtable--subcell"
                        scope="row"
                      >
                        {detailsRow.checkDate}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.propertyNo}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.propertyName}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.checkNumber}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.ownerNumber}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.ownerName}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.grossAmount}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.tax}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.deduction}
                      </TableCell>
                      <TableCell className="fm_subtable--subcell">
                        {detailsRow.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
