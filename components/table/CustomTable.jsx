import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import "./CustomTable.css";
import { Circles } from 'react-loader-spinner';
const CustomTable = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const tableWidth = props.columns.length * (props.columnWidth ? props.columnWidth : 0);
  const NoRowsOverlay = () => {
    return (
      <p
        className="mt-3 mx-3 align-item-top d-flex justify-content-start"
        style={{
          fontSize: "12px",
          color: "red",
          fontWeight: "bold",
          top: 0,
          textAlign: "center",
        }}
      >
        NO DATA RECORD FOUND
      </p>
    );
  };
  React.useEffect(() => {
    // Simulating data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div
      className={props.divClass}
      style={{
        width: "100%",
      }}
    >
      {isLoading ? (
        <div>
          <Circles
            color="#e30613"
            ariaLabel="circles-loading"
            wrapperStyle={{ paddingLeft: '49%', paddingTop: '10%' }}
            wrapperClass=""
            visible={true}
            display="inherit"
            margin="0 auto"
          />
        </div>
      ) : (
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: props.pageSize },
            },
          }}
          pageSizeOptions={props.pageSizeOptions}
          checkboxSelection={props.checkbox}
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          disableColumnFilter
          onRowSelectionModelChange={props.onRowSelectionModelChange}
          autoHeight
          components={{ NoRowsOverlay }}
        />
      )}
    </div>
  );
};
CustomTable.propTypes = {
  divClass: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  checkbox: PropTypes.bool.isRequired,
  pageSizeOptions: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  columnWidth: PropTypes.number,
  onRowSelectionModelChange: PropTypes.func,
};
export default CustomTable;