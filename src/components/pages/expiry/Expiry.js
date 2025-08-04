// import "./expiry.css";
// import * as React from "react";
// import Topbar from "../../topbar/Topbar";
// import Sidebar from "../../sidebar/Sidebar";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarExport,
//   GridToolbar,
// } from "@mui/x-data-grid";
// import axios from "axios";
// import { Button, Stack, buttonBaseClasses } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import { Link } from "react-router-dom";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// export default function Expiry() {
//   const [userData, setUserData] = React.useState([]);
//   const [dateFilter, setDateFilter] = React.useState(null);
//   const body = { test: "test" };
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const XLSX = require("sheetjs-style");
//   const [dateBegin, setDateBegin] = React.useState(null);
//   const [dateEnd, setDateEnd] = React.useState(null);

//   const columns = [
//     {
//       field: "count",
//       headerName: "#",
//       width: 75,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "date",
//       headerName: "Date",
//       width: 150,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "merchandiserName",
//       headerName: "Merchandiser Name",
//       width: 220,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "outlet",
//       headerName: "Outlet",
//       width: 200,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "month",
//       headerName: "Month",
//       width: 150,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "sku",
//       headerName: "SKU",
//       width: 350,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "expiration",
//       headerName: "Expiration Date",
//       width: 160,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "quantity",
//       headerName: "Quantity",
//       width: 120,
//       headerClassName: "bold-header",
//       headerAlign: "center",
//       align: "center",
//     },
//   ];

//   const fetchCompetitorByDate = async () => {
//     if (!dateBegin || !dateEnd) {
//       return alert("Please fill in the date fields.");
//     }

//     const bDate = new Date(dateBegin.$d);
//     bDate.setHours(0, 0, 0, 0);

//     const eDate = new Date(dateEnd.$d);
//     eDate.setHours(23, 59, 59, 999);

//     if (bDate > eDate) {
//       return alert("End date must be the same or later than the start date.");
//     }

//     const selectedDate = {
//       startDate: bDate.toISOString(),
//       endDate: eDate.toISOString(),
//     };

//     await getDate(selectedDate);
//   };

//   async function getDate(selectedDate) {
//     try {
//       const response = await axios.post(
//         "https://api-carmens-best.bmphrc.com/filter-date-range-Expiry",
//         selectedDate
//       );

//       const parcels = response.data.data;
//       console.log("Expiry fetched:", parcels);

//       const sortedData = parcels.sort(
//         (a, b) => new Date(b.date) - new Date(a.date)
//       );

//       // Flatten each expiry entry into its own row
//       let globalCount = 1;
//       const flattenedData = sortedData.flatMap((item) =>
//         item.expiryEntries.map((entry) => ({
//           count: globalCount++,
//           date: item.date || "N/A",
//           merchandiserName: item.merchandiser || "N/A",
//           userEmail: item.userEmail || "N/A",
//           outlet: item.outlet || "N/A",
//           month: entry.month || "N/A",
//           sku: entry.sku || "N/A",
//           expiration: entry.expiration || "N/A",
//           quantity: entry.quantity || "N/A", // ✅ include quantity here as well
//         }))
//       );

//       console.log("Mapped Expiry data:", flattenedData);
//       setUserData(flattenedData);
//     } catch (error) {
//       console.error("Error fetching Expiry data:", error.message);
//     }
//   }

//   async function getUser() {
//     try {
//       const loggedInBranch = localStorage.getItem("outlet");

//       if (!loggedInBranch) {
//         console.error("No outlet info found in localStorage.");
//         return;
//       }

//       const branches = loggedInBranch.split(",").map((outlet) => outlet.trim());

//       const response = await axios.post(
//         "https://api-carmens-best.bmphrc.com/retrieve-expiry-data",
//         { branches }
//       );

//       if (response.status !== 200) {
//         console.error("Failed to fetch expiry data:", response.statusText);
//         return;
//       }

//       const data = response.data.data || [];

//       // Sort by date descending
//       const sortedData = data.sort(
//         (a, b) => new Date(b.date) - new Date(a.date)
//       );

//       // Flatten expiry entries
//       let globalCount = 1;
//       const flattenedData = sortedData.flatMap((item) =>
//         item.expiryEntries.map((entry) => ({
//           count: globalCount++,
//           date: item.date || "N/A",
//           merchandiserName: item.merchandiser || "N/A",
//           userEmail: item.userEmail || "N/A",
//           outlet: item.outlet || "N/A",
//           month: entry.month || "N/A",
//           sku: entry.sku || "N/A",
//           expiration: entry.expiration || "N/A",
//           quantity: entry.quantity || "N/A", // ✅ added this line
//         }))
//       );

//       setUserData(flattenedData);
//     } catch (error) {
//       console.error("Error fetching expiry data:", error.message);
//     }
//   }

//   const getExportData = async () => {
//     if (!dateBegin || !dateEnd) {
//       return alert("Please fill in the date fields.");
//     }

//     const bDate = dateBegin.format("YYYY-MM-DD");
//     const eDate = dateEnd.format("YYYY-MM-DD");

//     try {
//       const response = await axios.post(
//         "https://api-carmens-best.bmphrc.com/export-Expiry-data",
//         {
//           start: bDate,
//           end: eDate,
//         }
//       );

//       if (!response.data.data || response.data.data.length === 0) {
//         return alert("No data found for the selected date range");
//       }

//       const headers = [
//         "#",
//         "Date",
//         "Merchandiser Name",
//         "Outlet",
//         "SKU",
//         "Month",
//         "Expiration",
//         "Quantity", // ✅ Added quantity column
//       ];

//       const newData = [];
//       let counter = 1;

//       response.data.data.forEach((item) => {
//         const expiryEntries = item.expiryEntries || [];

//         expiryEntries.forEach((entry) => {
//           newData.push({
//             "#": counter++,
//             Date: item.date,
//             "Merchandiser Name": item.merchandiserName || "N/A",
//             Outlet: item.outlet || "N/A",
//             SKU: entry.sku || "N/A",
//             Month: entry.month || "N/A",
//             Expiration: entry.expiration || "N/A",
//             Quantity: entry.quantity ?? "N/A", // ✅ Include quantity
//           });
//         });
//       });

//       const wb = XLSX.utils.book_new();
//       const ws = XLSX.utils.json_to_sheet([]);
//       XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
//       XLSX.utils.sheet_add_json(ws, newData, {
//         origin: "A2",
//         skipHeader: true,
//       });

//       // Auto-fit column widths based on content
//       const colWidths = headers.map((header, colIdx) => {
//         const headerLength = header.length;
//         const columnData = newData.map((row) => {
//           const cell = row[header];
//           return cell ? String(cell).length : 0;
//         });
//         const maxDataLength = Math.max(...columnData, headerLength);
//         return { wch: maxDataLength + 2 }; // add buffer space
//       });

//       ws["!cols"] = colWidths;

//       // Header styling
//       headers.forEach((_, index) => {
//         const cell = XLSX.utils.encode_cell({ r: 0, c: index });
//         if (ws[cell]) {
//           ws[cell].s = {
//             font: { bold: true },
//             alignment: { horizontal: "center", vertical: "center" },
//           };
//         }
//       });

//       // Cell alignment
//       newData.forEach((_, rIdx) => {
//         headers.forEach((_, cIdx) => {
//           const cell = XLSX.utils.encode_cell({ r: rIdx + 1, c: cIdx });
//           if (ws[cell]) {
//             ws[cell].s = {
//               alignment: { horizontal: "center", vertical: "center" },
//             };
//           }
//         });
//       });

//       XLSX.utils.book_append_sheet(wb, ws, "Expiry Data");

//       const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
//       const blob = new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `EXPIRY_DATA_CARMENS-BEST${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(link.href);

//       alert(`Successfully exported ${newData.length} expiry records!`);
//     } catch (error) {
//       console.error("Export Error:", error);
//       alert("Error exporting data. Please try again.");
//     }
//   };

//   React.useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <div className="attendance">
//       <Topbar />
//       <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
//         <Sidebar />
//         <Box
//           sx={{
//             flexGrow: 1,
//             padding: { xs: "10px", sm: "20px" },
//             maxWidth: "100%",
//             overflow: "auto",
//             backgroundColor: "#f0f8ff",
//           }}
//         >
//           {/* Responsive Header with Controls */}
//           <Stack
//             direction={{ xs: "column", md: "row" }}
//             spacing={2}
//             sx={{ marginBottom: "20px" }}
//           >
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Start Date"
//                 onChange={(newValue) => setDateBegin(newValue)}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     fullWidth: false,
//                     sx: { backgroundColor: "white" },
//                   },
//                 }}
//               />
//             </LocalizationProvider>

//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="End Date"
//                 onChange={(newValue) => setDateEnd(newValue)}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     fullWidth: false,
//                     sx: { backgroundColor: "white" },
//                   },
//                 }}
//               />
//             </LocalizationProvider>

//             <Button
//               onClick={getExportData}
//               variant="contained"
//               sx={{
//                 backgroundColor: "#987554",
//                 color: "#fff",
//                 borderColor: "#987554",
//                 "&:hover": { backgroundColor: "#664229" },
//               }}
//             >
//               Export
//             </Button>

//             <Button
//               onClick={fetchCompetitorByDate}
//               variant="contained"
//               sx={{
//                 backgroundColor: "#987554",
//                 color: "#fff",
//                 borderColor: "#987554",
//                 "&:hover": { backgroundColor: "#664229" },
//               }}
//             >
//               Show Inventory
//             </Button>
//           </Stack>

//           {/* Responsive DataGrid */}
//           <Box
//             sx={{
//               height: "100%",
//               width: "100%",
//               maxHeight: "80vh",
//               marginTop: 2,
//               overflow: "hidden",
//               "& .MuiDataGrid-root": {
//                 backgroundColor: "#fff",
//               },
//             }}
//           >
//             <DataGrid
//               rows={userData}
//               columns={columns}
//               initialState={{
//                 pagination: {
//                   paginationModel: { page: 0, pageSize: 10 },
//                 },
//               }}
//               slots={{
//                 toolbar: GridToolbar,
//               }}
//               slotProps={{
//                 toolbar: {
//                   showQuickFilter: true,
//                   printOptions: { disableToolbarButton: true },
//                   csvOptions: { disableToolbarButton: false },
//                 },
//               }}
//               disableDensitySelector
//               disableColumnFilter
//               disableColumnSelector
//               disableRowSelectionOnClick
//               pageSizeOptions={[5, 10, 20, 30, 50, 100]}
//               getRowId={(row) => row.count}
//             />
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// }
