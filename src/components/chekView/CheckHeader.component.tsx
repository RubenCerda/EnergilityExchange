import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Paper,
  Card,
  ButtonGroup,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCheckHeader } from "../../hooks/useCheckHeader";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PreviewIcon from "@mui/icons-material/Preview";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import * as service from "../../flmngApi/checkViewService/services/checkHeader.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faList,
  faArrowUpRightFromSquare,
  faEye,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const CheckHeaderComponent = (props: any) => {
  const { selection, companyName } = props;
  const navigate = useNavigate();
  //Pagination
  const [limitPages, setLimitPages] = useState(1);
  
  const handleChange = (event: any) => {
    setLimitPages(event.target.value);
  };
   const [currentPage, setCurrentPage] = useState(1);
   const [showDetails, setShowDetails] = useState(false);


  const onPdf = async (docSystemNo: number) => {
    if (window.confirm("Are you sure to generate a pdf this record?")) {
      await service
        .getSavePDF(docSystemNo)
        .then((resp) => {
          const file = new Blob([resp], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          URL.revokeObjectURL(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onViewPdf = (docSystemNo: number) => {
    navigate(`/CheckDetails/${selection.companyId}/${selection.docTypeId}/${companyName}/${docSystemNo}`, { replace: true });
  };

  const { checkHeader, totalPage } = useCheckHeader(
    selection,
    currentPage,
    limitPages
  );
   useEffect(() => {
     if (checkHeader.listItems.length !== 0) {
       routerIndex();
     }
   }, [checkHeader.listItems]);

   function routerIndex() {
     setShowDetails(true);
   }
  return (
    <CardMain>
      <CardContent>
        <TableContainer component={Paper}>
          <Table className="fm_table">
            <thead className="fm_table--head">
              <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
                <TableCell className="fm_tb_name col-1">Check Date</TableCell>
                <TableCell className="fm_tb_name col-1">Check Number</TableCell>
                <TableCell className="fm_tb_name col-1">Owner Number</TableCell>
                <TableCell className="fm_tb_name col-4">Owner Name</TableCell>
                <TableCell className="fm_tb_name col-1">Gross Amount</TableCell>
                <TableCell className="fm_tb_name col-1">Tax</TableCell>
                <TableCell className="fm_tb_name col-1">Deductions</TableCell>
                <TableCell className="fm_tb_name col-1">Total Amount</TableCell>
                <TableCell className="fm_tb_name col-1">Actions</TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {checkHeader.listItems.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell className="fm_tb_cell">{row.checkDate}</TableCell>
                  <TableCell className="fm_tb_cell">
                    {row.checkNumber}
                  </TableCell>
                  <TableCell className="fm_tb_cell">
                    {row.totalAmount}
                  </TableCell>
                  <TableCell className="fm_tb_cell">
                    {row.ownerNumber}
                  </TableCell>
                  <TableCell className="fm_tb_cell">{row.ownerName}</TableCell>
                  <TableCell className="fm_tb_cell">
                    {row.grossAmount}
                  </TableCell>
                  <TableCell className="fm_tb_cell">{row.taxs}</TableCell>
                  <TableCell className="fm_tb_cell">{row.deductions}</TableCell>
                  <TableCell>
                    <div className="fm_table--actions d-flex align-items-center">
                      <button
                        className="fa-xl fm-button--link--icon"
                        onClick={() => onPdf(row.docSystemNo)}
                      >
                        <FontAwesomeIcon icon={faFilePdf} />
                      </button>
                      <button
                        className="fa-xl fm-button--link--icon"
                        onClick={() => onViewPdf(row.docSystemNo)}
                      >
                        <FontAwesomeIcon icon={faUpRightFromSquare} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
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
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
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
      </CardContent>
    </CardMain>
  );
};

export default CheckHeaderComponent;

const CardMain = styled.div``;
const CardContent = styled.div``;
const SeccionPagination = styled.div``;
