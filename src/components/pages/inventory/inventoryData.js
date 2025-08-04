import "./inventoryStyle.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import axios from "axios";
import { Button, Stack, buttonBaseClasses } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VisibilityIcon from "@mui/icons-material/Visibility";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Inventory() {
  const [userData, setUserData] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState(null);
  const body = { test: "test" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const XLSX = require("sheetjs-style");
  const [dateBegin, setDateBegin] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);

  const filterParcelDate = () => {
    //let selectedDate = new Date(dateFilter.$d).toLocaleString('en-us',{month:'numeric', timeZone: 'Asia/Manila'});
    let month = new Date(dateFilter.$d).toLocaleString("en-us", {
      month: "numeric",
      timeZone: "Asia/Manila",
    });
    let day = new Date(dateFilter.$d).toLocaleString("en-us", {
      day: "numeric",
      timeZone: "Asia/Manila",
    });
    let year = new Date(dateFilter.$d).toLocaleString("en-us", {
      year: "numeric",
      timeZone: "Asia/Manila",
    });

    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    const selectedDate = year + "-" + month + "-" + day;
    console.log(selectedDate);
    getDate(selectedDate);
  };

  const ExpiryCell = ({ value }) => {
    const [open, setOpen] = React.useState(false);
    const expiry = value || [];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isDisabled = expiry.length === 0;

    return (
      <>
        <Stack>
          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={isDisabled}
            onClick={handleOpen}
            style={{
              width: "50%",
              marginTop: "13px",
              backgroundColor: isDisabled ? "#d3d3d3" : "#987554",
              color: "#FFFFFF",
            }}
          >
            <VisibilityIcon fontSize="small" />
          </Button>
        </Stack>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Expiry Dates
            </Typography>

            {expiry.length > 0 ? (
              expiry.map((entry, index) => {
                const formattedDate = entry.date
                  ? new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Invalid Date";

                return (
                  <Typography
                    key={index}
                    sx={{ mb: index < expiry.length - 1 ? 1 : 0 }}
                  >
                    {formattedDate} — Qty: {entry.quantity}
                  </Typography>
                );
              })
            ) : (
              <Typography>—</Typography>
            )}
          </Box>
        </Modal>
      </>
    );
  };

  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 80,
      headerClassName: "bold-header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "merchandiser",
      headerName: "Merchandiser",
      width: 200,
      headerClassName: "bold-header",
    },

    {
      field: "outlet",
      headerName: "Outlet",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      headerClassName: "bold-header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      headerClassName: "bold-header",
    },
    {
      field: "sku",
      headerName: "SKU",
      width: 350,
      headerClassName: "bold-header",
    },
    {
      field: "code",
      headerName: "BARCODE",
      width: 200,
      headerClassName: "bold-header",
    },

    {
      field: "beginningPCS",
      headerName: "Beginning (PCS)",
      width: 180,
      headerClassName: "bold-header",
    },
    {
      field: "deliveryPCS",
      headerName: "Delivery (PCS)",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "rtvPCS",
      headerName: "RTV (PCS)",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "endingPCS",
      headerName: "Ending (PCS)",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "offtake",
      headerName: "Offtake",
      width: 130,
      headerClassName: "bold-header",
    },
    {
      field: "oos",
      headerName: "OOS",
      width: 120,
      headerClassName: "bold-header",
    },

    {
      field: "harvestDates",
      headerName: "Harvest Dates",
      width: 200,
      headerClassName: "bold-header",
      renderCell: (params) => {
        const harvest = params.value || [];
        return (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {harvest.length > 0 ? (
              harvest.map((entry, index) => {
                const formattedDate = new Date(entry.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );
                return <div key={index}>{formattedDate}</div>;
              })
            ) : (
              <div>—</div>
            )}
          </div>
        );
      },
    },

    {
      field: "harvestQuantities",
      headerName: "Harvest Quantities",
      width: 200,
      headerClassName: "bold-header",
      renderCell: (params) => {
        const harvest = params.value || [];
        const category = params.row.category; // Get the row's category

        return (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {harvest.length > 0 ? (
              harvest.map((entry, index) => {
                const showOOS =
                  category === "MVP" &&
                  entry.oos !== undefined &&
                  entry.oos !== "";
                return (
                  <div key={index}>
                    {entry.quantity}
                    {showOOS ? ` (OOS: ${entry.oos})` : ""}
                  </div>
                );
              })
            ) : (
              <div>—</div>
            )}
          </div>
        );
      },
    },
    {
      field: "expiryDates",
      headerName: "Expiry",
      width: 150,
      headerClassName: "bold-header",
      sortable: false,
      filterable: false,
      renderCell: (params) => <ExpiryCell value={params.value} />,
    },
  ];

  // Helper function to format expiry
  // ✅ Works in JavaScript
  const formatExpiry = (expiry = []) => {
    return expiry
      .filter((e) => e.quantity > 0 && e.month !== "")
      .map(
        (e) =>
          `${e.month} Month${e.month !== "1" ? "s" : ""} - Qty: ${e.quantity}`
      )
      .join(" || ");
  };

  async function getUser() {
    try {
      const outlet = localStorage.getItem("outlet")?.split(",");
      if (!outlet) {
        console.error("No branch information found");
        return;
      }

      const response = await axios.post(
        "https://api-carmens-best.bmphrc.com/retrieve-inventory-data",
        { outlet }
      );

      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      let globalCount = 1;
      const newData = sortedData.flatMap((entry) => {
        const { versions, ...rest } = entry;

        return Object.entries(versions || {}).flatMap(
          ([versionKey, versionData]) => {
            if (!versionData) return [];

            const result = [];
            const pushSku = (sku, status, values = {}) => {
              result.push({
                id: `${status.toLowerCase()}-${sku.skuCode}-${versionKey}-${
                  rest.date
                }-${rest.outlet}`,
                count: globalCount++,
                version: versionKey,
                status,
                ...rest,
                sku: sku.sku,
                skuCode: sku.skuCode,
                code: sku.code || "", // ✅ Added barcode support
                ...values,
              });
            };

            versionData.Carried?.forEach((sku) => {
              if (
                versionKey === "MVP" &&
                Array.isArray(sku.harvest) &&
                sku.harvest.length > 0
              ) {
                sku.harvest.forEach((harvestEntry) => {
                  pushSku(sku, "Carried", {
                    category: versionKey,
                    code: "—",
                    beginningPCS: "—",
                    deliveryPCS: "—",
                    rtvPCS: "—",
                    endingPCS: "—",
                    offtake: "—",
                    inventoryDays: "—",
                    oos: sku.oos ?? "—",
                    harvestDates: sku.harvest || [],
                    harvestQuantities: sku.harvest || [],
                    expiryDates: sku.expiry || [], // ✅ NEW
                    expiryQuantities: sku.expiry || [], // ✅ NEW
                  });
                });
              } else {
                pushSku(sku, "Carried", {
                  category: versionKey,
                  beginningPCS: sku.beginningPCS ?? 0,
                  deliveryPCS: sku.deliveryPCS ?? 0,
                  rtvPCS: sku.rtvPCS ?? 0,
                  endingPCS: sku.endingPCS ?? 0,
                  offtake: sku.offtake ?? 0,
                  oos: sku.oos ?? 0,
                  inventoryDays: sku.inventoryDays ?? 0,
                  harvestDates: sku.harvest || [],
                  harvestQuantities: sku.harvest || [],
                  expiryDates: sku.expiry || [], // ✅ NEW
                  expiryQuantities: sku.expiry || [], // ✅ NEW
                });
              }
            });

            versionData["Not Carried"]?.forEach((sku) =>
              pushSku(sku, "Not Carried", {
                category: versionKey,
                beginningPCS: "NC",
                deliveryPCS: "NC",
                rtvPCS: "NC",
                endingPCS: "NC",
                offtake: "NC",
                inventoryDays: "NC",
                harvestDates: sku.harvest || [],
                harvestQuantities: sku.harvest || [],
                expiryDates: sku.expiry || [], // ✅ NEW
                expiryQuantities: sku.expiry || [], // ✅ NEW
              })
            );

            versionData.Delisted?.forEach((sku) =>
              pushSku(sku, "Delisted", {
                category: versionKey,
                beginningPCS: "Delisted",
                deliveryPCS: "Delisted",
                rtvPCS: "Delisted",
                endingPCS: "Delisted",
                offtake: "Delisted",
                inventoryDays: "Delisted",
                harvestDates: sku.harvest || [],
                harvestQuantities: sku.harvest || [],
                expiryDates: sku.expiry || [], // ✅ NEW
                expiryQuantities: sku.expiry || [], // ✅ NEW
              })
            );

            return result;
          }
        );
      });

      console.log(
        "Final data with counts:",
        newData.map((item) => ({
          id: item.id,
          count: item.count,
          sku: item.sku,
          status: item.status,
          code: item.code, // ✅ Check barcode in log
          harvest: item.harvest,
        }))
      );

      setUserData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchInventoryByDate = async () => {
    if (!dateBegin || !dateEnd) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const selectedDate = {
        startDate: dateBegin.format("YYYY-MM-DD"), // Format dates properly
        endDate: dateEnd.format("YYYY-MM-DD"),
      };

      console.log("Sending date range to backend:", selectedDate);

      await getDate(selectedDate); // Call the updated getDate function
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  async function getDate(selectedDate) {
    const data = {
      startDate: selectedDate.startDate,
      endDate: selectedDate.endDate,
    };

    try {
      const response = await axios.post(
        "https://api-carmens-best.bmphrc.com/filter-date-range",
        data
      );

      const inventories = response.data.data;
      console.log("Inventory fetched:", inventories);

      // Sort by date descending
      const sortedData = inventories.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      let globalCount = 1;
      const newData = sortedData.flatMap((entry) => {
        const { versions, ...rest } = entry;

        return Object.entries(versions || {}).flatMap(
          ([versionKey, versionData]) => {
            if (!versionData) return [];

            const result = [];

            const pushSku = (sku, status, values = {}) => {
              result.push({
                id: `${status.toLowerCase()}-${sku.skuCode}-${versionKey}-${
                  rest.date
                }-${rest.outlet}`,
                count: globalCount++,
                version: versionKey,
                status,
                ...rest,
                sku: sku.sku,
                skuCode: sku.skuCode,
                code: sku.code || "", // ✅ Include barcode
                ...values,
              });
            };

            versionData.Carried?.forEach((sku) => {
              if (
                versionKey === "MVP" &&
                Array.isArray(sku.harvest) &&
                sku.harvest.length > 0
              ) {
                sku.harvest.forEach((harvestEntry) => {
                  pushSku(sku, "Carried", {
                    category: versionKey,
                    code: "—",
                    beginningPCS: "—",
                    deliveryPCS: "—",
                    rtvPCS: "—",
                    endingPCS: "—",
                    offtake: "—",
                    inventoryDays: "—",
                    oos: sku.oos ?? "—",
                    harvestDates: sku.harvest || [],
                    harvestQuantities: sku.harvest || [],
                    expiryDates: sku.expiry || [], // ✅ NEW
                    expiryQuantities: sku.expiry || [], // ✅ NEW
                  });
                });
              } else {
                pushSku(sku, "Carried", {
                  category: versionKey,
                  beginningPCS: sku.beginningPCS ?? 0,
                  deliveryPCS: sku.deliveryPCS ?? 0,
                  rtvPCS: sku.rtvPCS ?? 0,
                  endingPCS: sku.endingPCS ?? 0,
                  offtake: sku.offtake ?? 0,
                  oos: sku.oos ?? 0,
                  inventoryDays: sku.inventoryDays ?? 0,
                  harvestDates: sku.harvest || [],
                  harvestQuantities: sku.harvest || [],
                  expiryDates: sku.expiry || [], // ✅ NEW
                  expiryQuantities: sku.expiry || [], // ✅ NEW
                });
              }
            });

            versionData["Not Carried"]?.forEach((sku) =>
              pushSku(sku, "Not Carried", {
                category: versionKey,
                beginningPCS: "NC",
                deliveryPCS: "NC",
                rtvPCS: "NC",
                endingPCS: "NC",
                offtake: "NC",
                inventoryDays: "NC",
                harvestDates: sku.harvest || [],
                harvestQuantities: sku.harvest || [],
                expiryDates: sku.expiry || [], // ✅ NEW
                expiryQuantities: sku.expiry || [], // ✅ NEW
              })
            );

            versionData.Delisted?.forEach((sku) =>
              pushSku(sku, "Delisted", {
                category: versionKey,
                beginningPCS: "Delisted",
                deliveryPCS: "Delisted",
                rtvPCS: "Delisted",
                endingPCS: "Delisted",
                offtake: "Delisted",
                inventoryDays: "Delisted",
                harvestDates: sku.harvest || [],
                harvestQuantities: sku.harvest || [],
                expiryDates: sku.expiry || [], // ✅ NEW
                expiryQuantities: sku.expiry || [], // ✅ NEW
              })
            );

            return result;
          }
        );
      });

      console.log("Mapped Inventory data:", newData);
      setUserData(newData);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  const getExportData = async () => {
    if (!dateBegin || !dateEnd) {
      return alert("Please select a valid date range");
    }

    const bDate = dateBegin.format("YYYY-MM-DD");
    const eDate = dateEnd.format("YYYY-MM-DD");

    try {
      const response = await axios.post(
        "https://api-carmens-best.bmphrc.com/export-inventory-data",
        {
          start: bDate,
          end: eDate,
        }
      );

      const headers = [
        "#",
        "Date",
        "Fullname",
        "Outlet",
        "Category",
        "SKU",
        "BAR CODE",
        "Status",
        "Beginning",
        "Delivery",
        "RTV",
        "Ending",
        "Offtake",
        "OOS",
        "Harvest Dates",
        "Harvest Quantities",
        "Expiration Dates",
        "Expiration Quantities",
      ];

      let rowCount = 1;
      const newData = [];

      response.data.data.forEach((item) => {
        const harvestArray = Array.isArray(item.harvest) ? item.harvest : [];
        const expiryArray = Array.isArray(item.expiry) ? item.expiry : [];

        // Format harvest data into multi-line strings
        const harvestDates = harvestArray
          .map((h) =>
            new Date(h.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          )
          .join("\n");

        const harvestQuantities = harvestArray
          .map((h) => h.quantity)
          .join("\n");

        // Format expiry data into multi-line strings
        const expiryDates = expiryArray
          .map((e) =>
            new Date(e.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          )
          .join("\n");

        const expiryQuantities = expiryArray.map((e) => e.quantity).join("\n");

        newData.push({
          "#": rowCount++,
          Date: item.date,
          Fullname: item.fullname,
          Outlet: item.outlet,
          Category: item.category || "",
          SKU: item.sku,
          "BAR CODE": item.code,
          Status: item.status,
          Beginning: item.beginning,
          Delivery: item.delivery,
          RTV: item.RTV,
          Ending: item.ending,
          Offtake: item.offtake,
          OOS: item.oos || "",
          "Harvest Dates": harvestDates,
          "Harvest Quantities": harvestQuantities,
          "Expiration Dates": expiryDates,
          "Expiration Quantities": expiryQuantities,
        });
      });

      // Generate XLSX file
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(ws, newData, {
        origin: "A2",
        skipHeader: true,
      });

      // Auto column width
      const colWidths = headers.map((header) => {
        const maxLength = Math.max(
          header.length,
          ...newData.map((row) => (row[header] || "").toString().length)
        );
        return { wch: maxLength + 4 };
      });
      ws["!cols"] = colWidths;

      // Header styling
      headers.forEach((_, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
        if (!ws[cellAddress]) return;
        ws[cellAddress].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
        };
      });

      // Data cell styling
      newData.forEach((_, rowIndex) => {
        headers.forEach((_, colIndex) => {
          const cellAddress = XLSX.utils.encode_cell({
            r: rowIndex + 1,
            c: colIndex,
          });
          if (!ws[cellAddress]) return;
          ws[cellAddress].s = {
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },
          };
        });
      });

      XLSX.utils.book_append_sheet(wb, ws, "Inventory Data");

      const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      alert(`Successfully exported ${newData.length} inventory records!`);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `INVENTORY_DATA_CARMENS-BEST_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error exporting data. Please try again.");
    }
  };

  return (
    <div className="attendance">
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: "10px", sm: "20px" },
            maxWidth: "100%",
            overflow: "auto",
            backgroundColor: "#f0f8ff",
          }}
        >
          {/* Responsive Header with Controls */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ marginBottom: "20px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                onChange={(newValue) => setDateBegin(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: false,
                    sx: { backgroundColor: "white" },
                  },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                onChange={(newValue) => setDateEnd(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: false,
                    sx: { backgroundColor: "white" },
                  },
                }}
              />
            </LocalizationProvider>

            <Button
              onClick={getExportData}
              variant="contained"
              sx={{
                backgroundColor: "#987554",
                color: "#fff",
                borderColor: "#987554",
                "&:hover": { backgroundColor: "#664229" },
              }}
            >
              Export
            </Button>

            <Button
              onClick={fetchInventoryByDate}
              variant="contained"
              sx={{
                backgroundColor: "#987554",
                color: "#fff",
                borderColor: "#987554",
                "&:hover": { backgroundColor: "#664229" },
              }}
            >
              Show Inventory
            </Button>
          </Stack>

          {/* Responsive DataGrid */}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxHeight: "80vh",
              marginTop: 2,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
            }}
          >
            <DataGrid
              rows={userData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: false },
                },
              }}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20, 30, 50, 100]}
              getRowId={(row) => row.count}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
