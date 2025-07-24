import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import "./defaultApp.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";

// import ViewAttendance from "./components/pages/attendance/ViewAttendance";
// import Attendance from "./components/pages/attendance/Attendance";
import Account from "./components/pages/account/Account";

import Login from "./components/LoginPage/login";
import Admin from "./components/pages/AdminAccount/Admin";
import ForgotPassword from "./components/LoginPage/forgotpassword";
import Path from "./path/Path";
import Inventory from "./components/pages/inventory/inventoryData";
import Expiry from "./components/pages/expiry/Expiry";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Path />}>
          <Route path="/" element={<Login />} />
          <Route path="/dashBoard" element={<dashBoard />} />
          {/* <Route path="/view-outletinputs" element={<OutletInputs />} /> */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/view-admin-accounts" element={<Admin />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/view-Expiry" element={<Expiry />} />
          {/* <Route path="/attendance" element={<Attendance />} />
          <Route path="/view-attendance" element={<ViewAttendance />} /> */}
          <Route path="/view-accounts" element={<Account />} />
          {/* <Route path="/view-RTV" element={<RTV />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
