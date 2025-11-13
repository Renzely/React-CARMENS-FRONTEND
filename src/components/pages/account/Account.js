import "./account.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import axios, { isAxiosError } from "axios";
import { Button, Stack, TextField, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDemoData } from "@mui/x-data-grid-generator";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Autocomplete } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

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

export default function Account() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  const [userData, setUserData] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [updateStatus, setUpdateStatus] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  var test = "testing";

  const requestBody = { isActivate: updateStatus, emailAddress: userEmail };

  const [modalFullName, setModalFullName] = React.useState("");
  const [modalBranch, setModalBranch] = React.useState("");
  const [modalEmail, setModalEmail] = React.useState("");
  const [modalPhone, setModalPhone] = React.useState("");
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [adminViewBranch, setAdminViewBranch] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const roleAccount = localStorage.getItem("roleAccount"); // Get roleAccount from localStorage
  const allowedRoles = [
    "ACCOUNT SUPERVISOR",
    "OPERATION OFFICER",
    "OPERATION HEAD",
    "COORDINATOR",
  ];
  const isClient = roleAccount === "CLIENT  ";
  const isAllowed = allowedRoles.includes(roleAccount); // Check if role is allowed

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleViewCloseModal = () => {
    setOpenViewModal(false);
  };

  const [outlets, setBranches] = React.useState([
    "Branch",
    "CASH & CARRY MAKATI",
    "DUTY FREE PARANAQUE",
    "FISHER SUPERMARKET - MALABON",
    "FISHER SUPERMARKET - QUEZON AVENUE",
    "GAISANO MALL CEBU",
    "LANDERS ALABANG",
    "LANDERS ANGELES",
    "LANDERS ARCA SOUTH",
    "LANDERS ARCOVIA",
    "LANDERS ASEANA",
    "LANDERS BALINTAWAK",
    "LANDERS BGC",
    "LANDERS CEBU",
    "LANDERS FAIRVIEW",
    "LANDERS NUVALI",
    "LANDERS OTIS",
    "LANDERS U.P. TOWN CENTER",
    "LANDERS VERMOSA",
    "LANDMARK ALABANG",
    "LANDMARK AYALA MANILA BAY",
    "LANDMARK BGC",
    "LANDMARK MAKATI",
    "LANDMARK NUVALI",
    "LANDMARK TRINOMA MAIN",
    "MAKATI SUPERMARKET ALABANG",
    "MERKADO SUPERMARKET - AVIDA ASTEN",
    "MERKADO SUPERMARKET - U.P. TOWN CENTER",
    "MERKADO SUPERMARKET - VERTIS NORTH",
    "MERRY MART GROCERY - ARAYAT",
    "MERRY MART GROCERY - ARTON STRIP",
    "MERRY MART GROCERY - BGC",
    "MERRY MART GROCERY - BLOC 10 ALABANG",
    "MERRY MART GROCERY - DOUBLE DRAGON",
    "MERRY MART GROCERY - GRACE PARK CALOOCAN",
    "MERRY MART GROCERY - TARLAC",
    "MERRY MART GROCERY - UMBRIA",
    "METRO AYALA CENTER CEBU",
    "METRO BINONDO LUCKY CHINA TOWN",
    "METRO FELIZ PASIG",
    "METRO FRESH 'N EASY LAWTON TAGUIG",
    "METRO IT PARK",
    "METRO MANDAUE",
    "METRO MARKET-MARKET",
    "METRO MARQUEE MALL ANGELES",
    "METRO PASEO",
    "METRO SHAW MANDALUYONG",
    "METRO SUPERMARKET IMUS",
    "METRO VALUE MART LANCASTER",
    "NB ALABANG TOWN CENTER",
    "NB AYALA CENTER CEBU",
    "NB AYALA MALL CIRCUIT",
    "NB AYALA MALL MANILA BAY",
    "NB FESTIVAL MALL MUNTINLUPA",
    "NB GALLERIA SOUTH",
    "NB GLORIETTA 4 MAKATI",
    "NB RP ERMITA MANILA",
    "NB RP GALLERIA",
    "NB RP IMUS",
    "NB RP MAGNOLIA",
    "NB SHANGRILA MANDALUYONG",
    "NB TRINOMA",
    "NB UP TOWN CENTER KATIPUNAN",
    "PIONEER CENTER SUPERMARKET",
    "PUREGOLD DUTY FREE - CLARK",
    "PUREGOLD JR - BETTERLIVING",
    "PUREGOLD JR - BF HOMES",
    "PUREGOLD JR - DASMARIÑAS CAVITE",
    "PUREGOLD JR - DON ANTONIO",
    "PUREGOLD JR - DOROTEO JOSE",
    "PUREGOLD JR - KALAYAAN (COMPANY E)",
    "PUREGOLD JR - MOTHER IGNACIA",
    "PUREGOLD JR - TIMOG",
    "PUREGOLD JR - V. MAPA",
    "PUREGOLD JR - WEST AVENUE STRIPMALL",
    "PUREGOLD PPCI - ANABU",
    "PUREGOLD PPCI - ARANETA",
    "PUREGOLD PPCI - AYALA MALL MARIKINA",
    "PUREGOLD PPCI - BACOLOR",
    "PUREGOLD PPCI - BAGUIO",
    "PUREGOLD PPCI - BF AGUIRRE",
    "PUREGOLD PPCI - BINAN",
    "PUREGOLD PPCI - BINANGONAN",
    "PUREGOLD PPCI - BUHAY NA TUBIG",
    "PUREGOLD PPCI - CABANATUAN",
    "PUREGOLD PPCI - CAINTA",
    "PUREGOLD PPCI - CAINTA Q. PLZA",
    "PUREGOLD PPCI - CALACIAO",
    "PUREGOLD PPCI - CAPAS",
    "PUREGOLD PPCI - COMMONWEALTH",
    "PUREGOLD PPCI - CONCEPCION",
    "PUREGOLD PPCI - DAU",
    "PUREGOLD PPCI - EASTLAND",
    "PUREGOLD PPCI - FTI",
    "PUREGOLD PPCI - KANLAON",
    "PUREGOLD PPCI - KASAMBAGAN CEBU",
    "PUREGOLD PPCI - KAWIT",
    "PUREGOLD PPCI - LA UNION",
    "PUREGOLD PPCI - LAOAG",
    "PUREGOLD PPCI - LAS PINAS",
    "PUREGOLD PPCI - LIGAYA",
    "PUREGOLD PPCI - LILAC",
    "PUREGOLD PPCI - LIPA",
    "PUREGOLD PPCI - MABALACAT",
    "PUREGOLD PPCI - MAKATI",
    "PUREGOLD PPCI - MINDANAO AVE.",
    "PUREGOLD PPCI - NE PACIFIC MALL",
    "PUREGOLD PPCI - NORTH COMMONWEALTH",
    "PUREGOLD PPCI - PARANAQUE",
    "PUREGOLD PPCI - PASIG",
    "PUREGOLD PPCI - PASO DE BLAS",
    "PUREGOLD PPCI - PUTATAN",
    "PUREGOLD PPCI - QI CENTRAL",
    "PUREGOLD PPCI - QUEZON AVE",
    "PUREGOLD PPCI - SAN ANTONIO",
    "PUREGOLD PPCI - SAN MATEO",
    "PUREGOLD PPCI - SAN PABLO",
    "PUREGOLD PPCI - SHAW BLVD",
    "PUREGOLD PPCI - SILANG",
    "PUREGOLD PPCI - SINDALAN",
    "PUREGOLD PPCI - SOUTHGATE",
    "PUREGOLD PPCI - SOUTHPARK",
    "PUREGOLD PPCI - STO. TOMAS BATANGAS",
    "PUREGOLD PPCI - SUMULONG",
    "PUREGOLD PPCI - TAGAPO",
    "PUREGOLD PPCI - TAGUIG",
    "PUREGOLD PPCI - TALISAY CEBU",
    "PUREGOLD PPCI - TANAY",
    "PUREGOLD PPCI - TANZA",
    "PUREGOLD PPCI - TAYTAY",
    "PUREGOLD PPCI - TAYUMAN",
    "PUREGOLD PPCI - TERRACES",
    "PUREGOLD PPCI - VALENZUELA",
    "PUREGOLD PPCI - VIGAN",
    "PUREGOLD PRICE CLUB - 88 SQUARE PARANAQUE",
    "PUREGOLD PRICE CLUB - ABUCAY",
    "PUREGOLD PRICE CLUB - AGORA",
    "PUREGOLD PRICE CLUB - BACNOTAN",
    "PUREGOLD PRICE CLUB - BACOOR",
    "PUREGOLD PRICE CLUB - BALANGA BATAAN",
    "PUREGOLD PRICE CLUB - BALIUAG",
    "PUREGOLD PRICE CLUB - BALIUAG DTR HI-WAY",
    "PUREGOLD PRICE CLUB - BUCANDALA",
    "PUREGOLD PRICE CLUB - BULAON",
    "PUREGOLD PRICE CLUB - BURGOS MONTALBAN ",
    "PUREGOLD PRICE CLUB - C. RAYMUNDO",
    "PUREGOLD PRICE CLUB - CARMONA",
    "PUREGOLD PRICE CLUB - CENTRAL TOWN ANGELES",
    "PUREGOLD PRICE CLUB - CIRCUMFERENTIAL ROAD",
    "PUREGOLD PRICE CLUB - CROSSING",
    "PUREGOLD PRICE CLUB - CROSSING EAST TAGAYTAY",
    "PUREGOLD PRICE CLUB - CULIAT ",
    "PUREGOLD PRICE CLUB - DAU ACCESS RD",
    "PUREGOLD PRICE CLUB - DEPARO",
    "PUREGOLD PRICE CLUB - GUADALUPE",
    "PUREGOLD PRICE CLUB - KAPARANGAN",
    "PUREGOLD PRICE CLUB - KASIGLAHAN ",
    "PUREGOLD PRICE CLUB - LA PAZ ",
    "PUREGOLD PRICE CLUB - LANGGAM",
    "PUREGOLD PRICE CLUB - LIBERTAD",
    "PUREGOLD PRICE CLUB - MAGALANG PAMPANGA",
    "PUREGOLD PRICE CLUB - MALATE",
    "PUREGOLD PRICE CLUB - MANGO CEBU",
    "PUREGOLD PRICE CLUB - MARCOS ALVAREZ LAS PIÑAS",
    "PUREGOLD PRICE CLUB - MARILAO PLAZA CECILIA",
    "PUREGOLD PRICE CLUB - MAWAQUE",
    "PUREGOLD PRICE CLUB - MERCEDES",
    "PUREGOLD PRICE CLUB - MEXICO PAMPANGA",
    "PUREGOLD PRICE CLUB - MOLINO BACOOR",
    "PUREGOLD PRICE CLUB - MOLINO ROAD",
    "PUREGOLD PRICE CLUB - MOLINO TOWN CENTER ",
    "PUREGOLD PRICE CLUB - MOONWALK",
    "PUREGOLD PRICE CLUB - NOVALICHES",
    "PUREGOLD PRICE CLUB - NOVELETA",
    "PUREGOLD PRICE CLUB - PAGSANJAN",
    "PUREGOLD PRICE CLUB - PULANG LUPA UNO ",
    "PUREGOLD PRICE CLUB - REMANVILLE",
    "PUREGOLD PRICE CLUB - ROSARIO (CAVITE)",
    "PUREGOLD PRICE CLUB - SAN ILDEFONSO ",
    "PUREGOLD PRICE CLUB - SAN MIGUEL ",
    "PUREGOLD PRICE CLUB - SAN PEDRO",
    "PUREGOLD PRICE CLUB - SAN SIMON PAMPANGA",
    "PUREGOLD PRICE CLUB - SAN VICENTE PACITA",
    "PUREGOLD PRICE CLUB - SKY REGENCY, PASAY",
    "PUREGOLD PRICE CLUB - STA. ROSA VICTORY MALL",
    "PUREGOLD PRICE CLUB - TALAVERA",
    "PUREGOLD PRICE CLUB - TANDANG SORA CROSSROAD ",
    "PUREGOLD PRICE CLUB - TANGOS BALIUAG",
    "PUREGOLD PRICE CLUB - TERMINAL MALL",
    "PUREGOLD PRICE CLUB - TUGATOG",
    "PUREGOLD PRICE CLUB - URDANETA",
    "PUREGOLD PRICE CLUB - ZABARTE",
    "RE LOYOLA HEIGHTS QC",
    "RE NOAH BUILDING AGUIRRE",
    "RS B HIVE MALL VALENZUELA",
    "RS BANILAD CEBU",
    "RS BASELINE CENTER CEBU       ",
    "RS BELMONT ONE MINGLANILLA",
    "RS BERKELEY COMMONWEALTH      ",
    "RS CALIFORNIA MANDALUYONG",
    "RS CENTRO MALL CABUYAO",
    "RS CENTRO PACITA",
    "RS CIRCLE C CONGRESSIONAL",
    "RS CITI SQUARE MALABON        ",
    "RS CLOVERLEAF MALL BALINTAWAK",
    "RS DOLORES SAN FERNANDO",
    "RS DONA CARMEN FAIRVIEW",
    "RS EASTWOOD TECHNOPLAZA II",
    "RS FEDERAL BAY GARDEN PASAY",
    "RS GATEWAY CUBAO",
    "RS GCC MEXICO PAMPANGA",
    "RS GUAGUA TOWNCENTER",
    "RS HAPPY GO MALL VALENZUELA",
    "RS HERMOSA BATAAN",
    "RS IMALL CANLUBANG",
    "RS ISLAND CENTRAL MACTAN      ",
    "RS KAI MALL ZABARTE CALOOCAN",
    "RS KINGHOME BUCANDALA IMUS",
    "RS LIMA EXCHANGE BATANGAS",
    "RS LIPA TOWN CENTER",
    "RS MADISON GALERIES MUNTINLUPA",
    "RS MAIN SQUARE MOLINO",
    "RS METRO CENTRAL MALL STA CRUZ",
    "RS METROPLAZA QUIRINO CALOOCAN",
    "RS METROTOWN TARLAC",
    "RS NEPOMALL ANGELES",
    "RS NEPOMALL DAGUPAN",
    "RS ONE AYALA MAKATI",
    "RS PORTA VAGA MALL BAGUIO     ",
    "RS PREMIER PLAZA SILANG",
    "RS PUEBLO VERDE MACTAN        ",
    "RS RIOKING DON ANTONIO",
    "RS RMR SQUARE TANDANG SORA",
    "RS ROBINSONS GALLERIA QC",
    "RS RP ANGELES",
    "RS RP CEBU                    ",
    "RS RP DASMARINAS",
    "RS RP ERMITA",
    "RS RP GALLERIA SOUTH SAN PEDRO",
    "RS RP GENERAL TRIAS",
    "RS RP ILOCOS NORTE            ",
    "RS RP IMUS",
    "RS RP LA UNION",
    "RS RP LAS PINAS",
    "RS RP LIPA",
    "RS RP LOS BANOS",
    "RS RP MAGNOLIA",
    "RS RP NOVALICHES",
    "RS RP OTIS",
    "RS RP PANGASINAN",
    "RS RP STA ROSA",
    "RS RP TARLAC",
    "RS SAN CARLOS TC PANGASINAN",
    "RS SAN MIGUEL BULACAN",
    "RS SOUTH TOWN CENTER TABUNOK  ",
    "RS SOUTHPARK MALL ALABANG",
    "RS SOUTHWOODS MALL LAGUNA",
    "RS STARMILLS PAMPANGA",
    "RS SUMMIT RIDGE TAGAYTAY",
    "RS TALAMBAN TIME SQUARE CEBU  ",
    "RS TALISAY CEBU               ",
    "RS TANEDO TARLAC",
    "RS TARGETMALL STA. ROSA",
    "RS TOWN MALL MALABON",
    "RS TOWNVILLE ARVO DASMARINAS",
    "RS TOWNVILLE BF PARANAQUE     ",
    "RS TOWNVILLE BUHAY NA TUBIG",
    "RS TOWNVILLE CABANATUAN",
    "RS TOWNVILLE GAPAN NUEVA ECIJA",
    "RS TOWNVILLE MEYCAUAYAN",
    "RS TOWNVILLE NUVALI STA ROSA",
    "RS TOWNVILLE REGALADO FAIRVIEW",
    "RS TUTUBAN CENTERMALL",
    "RS TWIN LAKES VILLAGE BATANGAS",
    "RS VICTORIA TOWER TIMOG",
    "RS WOODSVILLE MERVILLE",
    "RS XENTRO MALL LEMERY BATANGAS",
    "RS XENTRO MALL VIGAN          ",
    "RS XEVERA MABALACAT",
    "RS Z SQUARE BANAWE",
    "S&R ALABANG",
    "S&R ASEANA",
    "S&R BACOOR",
    "S&R BALIUAG",
    "S&R CIRCUIT MAKATI",
    "S&R COMMONWEALTH",
    "S&R CONGRESSIONAL",
    "S&R DAU MABALACAT",
    "S&R IMUS",
    "S&R KAWIT",
    "S&R LIBIS BAGUMBAYAN",
    "S&R LIPA BATANGAS",
    "S&R MARIKINA",
    "S&R NEW MANILA",
    "S&R NUVALI",
    "S&R PARANAQUE",
    "S&R SAN FERNANDO",
    "S&R SHAW",
    "S&R STO TOMAS",
    "S&R SUCAT",
    "S&R THE FORT",
    "SH HYPERMARKET TAGAYTAY",
    "SM HYPERMARKET - ROSARIO",
    "SM HYPERMARKET ANTIPOLO",
    "SM HYPERMARKET BALIWAG",
    "SM HYPERMARKET BATANGAS",
    "SM HYPERMARKET BICUTAN",
    "SM HYPERMARKET CAINTA",
    "SM HYPERMARKET CEBU (LOGARTA)",
    "SM HYPERMARKET CHERRY CONGRESSIONAL",
    "SM HYPERMARKET CLARK",
    "SM HYPERMARKET CUBAO",
    "SM HYPERMARKET DAGUPAN",
    "SM HYPERMARKET DECA MARILAO",
    "SM HYPERMARKET ETON CENTRIS",
    "SM HYPERMARKET FAIRVIEW",
    "SM HYPERMARKET FTI",
    "SM HYPERMARKET IMUS",
    "SM HYPERMARKET JAZZ",
    "SM HYPERMARKET JMALL",
    "SM HYPERMARKET KADIWA",
    "SM HYPERMARKET LAOAG",
    "SM HYPERMARKET LAPU-LAPU",
    "SM HYPERMARKET LEMERY",
    "SM HYPERMARKET MAKATI",
    "SM HYPERMARKET MANDALUYONG",
    "SM HYPERMARKET MARILAO",
    "SM HYPERMARKET MOLINO",
    "SM HYPERMARKET MONUMENTO",
    "SM HYPERMARKET NAIC",
    "SM HYPERMARKET NORTH EDSA",
    "SM HYPERMARKET NOVALICHES",
    "SM HYPERMARKET PAMPANGA",
    "SM HYPERMARKET PASIG",
    "SM HYPERMARKET ROSALES",
    "SM HYPERMARKET SAN PEDRO",
    "SM HYPERMARKET SUN RESIDENCE",
    "SM HYPERMARKET TAYTAY",
    "SM HYPERMARKET TAYTAY 2",
    "SM HYPERMARKET URBAN IMUS",
    "SM HYPERMARKET VALENZUELA",
    "SM SAVEMORE ACACIA",
    "SM SAVEMORE AIR MALL",
    "SM SAVEMORE ALAPAN",
    "SM SAVEMORE AMANG RODRIGUEZ",
    "SM SAVEMORE ANONAS",
    "SM SUPERMARKET AURA",
    "SM SUPERMARKET BACOOR",
    "SM SUPERMARKET BATANGAS",
    "SM SUPERMARKET CALAMBA",
    "SM SUPERMARKET CEBU RECLAMATION",
    "SM SUPERMARKET DASMARINAS",
    "SM SUPERMARKET EAST ORTIGAS",
    "SM SUPERMARKET FAIRVIEW",
    "SM SUPERMARKET LAOAG",
    "SM SUPERMARKET MAKATI",
    "SM SUPERMARKET MANILA",
    "SM SUPERMARKET MASINAG",
    "SM SUPERMARKET MEGAMALL B",
    "SM SUPERMARKET NORTH EDSA",
    "SM SUPERMARKET SAN LAZARO",
    "SM SUPERMARKET STA. MESA",
    "SM SUPERMARKET BAGUIO",
    "SOUTH GROCER - BF HOMES",
    "SOUTH GROCER - BRENT",
    "SOUTH SUPERMARKET - ALABANG",
    "SOUTH SUPERMARKET - LIPA",
    "SOUTH SUPERMARKET - LOS BANOS",
    "SOUTH SUPERMARKET - MARIKINA",
    "SOUTH SUPERMARKET - PAMPANGA",
    "SOUTH SUPERMARKET - PASIG",
    "SOUTH SUPERMARKET - STA ROSA",
    "SOUTH SUPERMARKET - STO TOMAS",
    "SOUTH SUPERMARKET - VALENZUELA",
    "SUPER METRO ANTIPOLO",
    "SUPER METRO LAPU LAPU",
    "SUPER METRO MAMBALING",
    "SUPER METRO TAGAYTAY",
    "SW ANABU IMUS",
    "SW BASAK CEBU",
    "SW CHINO ROCES MAKATI",
    "SW CIRCUIT MAKATI",
    "SW COMMONWEALTH",
    "SW FESTIVAL MALL ALABANG",
    "SW GATEWAY 2 CUBAO",
    "SW GRAND TERMINAL BATANGAS",
    "SW LANCASTER IMUS",
    "SW SAN PEDRO LAGUNA",
    "SW SHOPKING SAN FERNANDO",
    "SW STA. ROSA",
    "SW SUCAT",
    "TMP 8 BANAWA CENTRALE",
    "TMP 8 FORBES TOWN ROAD TAGUIG",
    "TMP ALPHALAND MAKATI",
    "TMP AYALA ALABANG",
    "TMP AYALA CENTER CEBU",
    "TMP AYALA THE 30TH PASIG",
    "TMP AYALA TRIANGLE MAKATI",
    "TMP CAPITOL HILLS QC",
    "TMP CENTRAL SQUARE BGC",
    "TMP CENTURY MALL MAKATI",
    "TMP CORINTHIAN HILLS",
    "TMP EASTBAY SUCAT",
    "TMP EASTWOOD LIBIS",
    "TMP EDSA SHANGRI-LA",
    "TMP GALLERIA CEBU",
    "TMP KATIPUNAN",
    "TMP LEONARD WOOD BAGUIO",
    "TMP MAKATI",
    "TMP MET LIVE PASAY",
    "TMP MPC P. GUEVARRA",
    "TMP PARQAL ASEANA CITY",
    "TMP PASEO CENTER MAKATI",
    "TMP PASEO DE MAGALLANES",
    "TMP POWERPLANT MALL ROCKWELL",
    "TMP RP MAGNOLIA",
    "TMP SAN ANTONIO ARCADE MAKATI",
    "TMP SANTOLAN TOWN PLAZA",
    "TMP TOMAS MORATO",
    "TMP TWO CENTRAL MAKATI",
    "TMP UPTOWN PLACE MALL TAGUIG",
    "TMP VENICE GRAND MCKINLEY",
    "TMP WESTBOROUGH SILANG",
    "WALTERMART ANTIPOLO",
    "WALTERMART BACOOR",
    "WALTERMART DASMARINAS",
    "WALTERMART E. RODRIGUEZ",
    "WALTERMART MAKATI",
    "WALTERMART NORTH EDSA",
    "WALTERMART STA ROSA",
    "WALTERMART TAGAYTAY",
    "WALTERMART VISAYAS AVE.",
    "GAISANO BROTHERS - COUNTRY MALL",
    "GAISANO BROTHERS - MARKET SQUARE",
    "GAISANO CITIMALL BUHANGIN",
    "GAISANO GRAND - TABUNOK",
    "GAISANO JR BORJA",
    "GAISANO LUMBIA",
    "GAISANO MAIN ",
    "GAISANO MALL BAJADA",
    "GAISANO MALL ILLUSTRE",
    "GAISANO PUERTO ",
    "KAREILA MANAGEMENT CORP (S&R) CEBU",
    "MERRY MART GROCERY - BOCAUE",
    "METRO FRESH N EASY - SHANGS PLACE MACTAN",
    "METRO GAISANO (COLON)",
    "METRO GAISANO MARKET (BANILAD)",
    "NB AYALA MALLS FELIZ PASIG",
    "NB RP ANTIPOLO",
    "NB RP METROEAST",
    "NCCC LANANG",
    "NCCC MA-A",
    "NCCC VICTORIA",
    "NCCC VISTA MALL",
    "ORORAMA CARMEN ",
    "ORORAMA COGON",
    "PRUTASAN NI ADAN BANAWA",
    "PRUTASAN NI ADAN BTC",
    "PRUTASAN NI ADAN MABOLO",
    "PUREGOLD PRICE CLUB - CALUMPIT",
    "PUREGOLD PRICE CLUB - MUZON",
    "PUREGOLDJR - CAFE FERNANDINO",
    "PUREGOLD PPCI - 999 CALOOCAN",
    "PUREGOLD PPCI - 999 DIVISORIA",
    "PUREGOLD PPCI - ANGELES",
    "PUREGOLD PPCI - ANGONO",
    "PUREGOLD PPCI - ANTIPOLO (PARCO)",
    "PUREGOLD PPCI - ARAYAT, PAMPANGA",
    "PUREGOLD PPCI - BAGONG SILANG",
    "PUREGOLD PPCI - BALINTAWAK",
    "PUREGOLD PPCI - BATANGAS NEW MARKET",
    "PUREGOLD PPCI - BINAN BAYAN",
    "PUREGOLD PPCI - BROOKSIDE LANE",
    "PUREGOLD PPCI - BULAKAN",
    "PUREGOLD PPCI - BUNTUN TUGUEGARAO",
    "PUREGOLD PPCI - BUSTOS BULACAN",
    "PUREGOLD PPCI - CALABANGA CAMSUR",
    "PUREGOLD PPCI - CALAMBA CROSSING",
    "PUREGOLD PPCI - CALAUAG",
    "PUREGOLD PPCI - CALAUAN",
    "PUREGOLD PPCI - CALICANTO BATANGAS",
    "PUREGOLD PPCI - CALOOCAN (PARCO)",
    "PUREGOLD PPCI - CAMARIN",
    "PUREGOLD PPCI - CANDABA",
    "PUREGOLD PPCI - CANDELARIA",
    "PUREGOLD PPCI - CASA CECILIA",
    "PUREGOLD PPCI - CATANAUAN",
    "PUREGOLD PPCI - CHAMPACA",
    "PUREGOLD PPCI - CIRCUMFERENTIAL CABANATUAN",
    "PUREGOLD PPCI - DARAGA ALBAY",
    "PUREGOLD PPCI - DIVIMART - OLONGAPO",
    "PUREGOLD PPCI - DIVIMART - SANDOVAL PASIG",
    "PUREGOLD PPCI - DIVISORIA",
    "PUREGOLD PPCI - DV BANLIC",
    "PUREGOLD PPCI - DV SAN ISIDRO ",
    "PUREGOLD PPCI - DV SAN MIGUEL ",
    "PUREGOLD PPCI - DV TAYTAY",
    "PUREGOLD PPCI - EASTGATE",
    "PUREGOLD PPCI - GMA CAVITE",
    "PUREGOLD PPCI - GUMACA",
    "PUREGOLD PPCI - GUIGUINTO",
    "PUREGOLD PPCI - HALANG CALAMBA ",
    "PUREGOLD PPCI - HAGONOY BULACAN",
    "PUREGOLD PPCI - KALENTONG",
    "PUREGOLD PPCI - LEGAZPI ALBAY",
    "PUREGOLD PPCI - LIAS TOWN PLAZA",
    "PUREGOLD PPCI - MALABON LETRE",
    "PUREGOLD PPCI - MALANDAY",
    "PUREGOLD PPCI - MALOLOS",
    "PUREGOLD PPCI - MANAOAG",
    "PUREGOLD PPCI - MAYPAJO",
    "PUREGOLD PPCI - MEYCAUAYAN",
    "PUREGOLD PPCI - MONUMENTO",
    "PUREGOLD PPCI - NAIC",
    "PUREGOLD PPCI - NAGA DIVERSION ",
    "PUREGOLD PPCI - NAVOTAS",
    "PUREGOLD PPCI - NOVELETA OASIS",
    "PUREGOLD PPCI - OBANDO",
    "PUREGOLD PPCI - ORTIGAS AVE. EXT.",
    "PUREGOLD PPCI - PACO",
    "PUREGOLD PPCI - PAG-ASA BINANGONAN",
    "PUREGOLD PPCI - PALIPARAN",
    "PUREGOLD PPCI - PANDAN",
    "PUREGOLD PPCI - PANTUKAN DAVAO",
    "PUREGOLD PPCI - PAOMBONG",
    "PUREGOLD PPCI - PAYATAS",
    "PUREGOLD PPCI - PULANG LUPA",
    "PUREGOLD PPCI - ROSARIO BATANGAS",
    "PUREGOLD PPCI - SAN JOSE DEL MONTE BULACAN",
    "PUREGOLD PPCI - SAN JOSE NUEVA ECIJA",
    "PUREGOLD PPCI - SAN LEONARDO",
    "PUREGOLD PPCI - SAN PABLO HIGHWAY",
    "PUREGOLD PPCI - SARIAYA",
    "PUREGOLD PPCI - SINDANGAN ZAMBOANGA",
    "PUREGOLD PPCI - STA MARIA",
    "PUREGOLD PPCI - STA. CRUZ LAGUNA",
    "PUREGOLD PPCI - STA. MESA",
    "PUREGOLD PPCI - STA ROSA BALIBAGO",
    "PUREGOLD PPCI - SUCAT",
    "PUREGOLD PPCI - SUPER PALENGKE ANTIPOLO",
    "PUREGOLD PPCI - TABACO ALBAY",
    "PUREGOLD PPCI - TAGUDIN ILOCOS",
    "PUREGOLD PPCI - TALISAY, BATANGAS",
    "PUREGOLD PPCI - TANAUAN",
    "PUREGOLD PPCI - TARLAC PUBLIC MARKET",
    "PUREGOLD PPCI - TDC SUSANO",
    "PUREGOLD PPCI - TRECE MARTIREZ (HUGO PEREZ)",
    "PUREGOLD PPCI - TUNGKONG MANGGA",
    "PUREGOLD PPCI - UBAY BOHOL",
    "PUREGOLD PPCI - VICTORIA",
    "PUREGOLD PPCI - VISAYAS AVE. (COMPANY E)",
    "RS ACACIA ESCALADES PASIG",
    "RS BALAGTAS TOWNCENTER",
    "RS BLUEWAVE MARIKINA",
    "RS CHOICE MARKET ORTIGAS PASIG",
    "RS EL PASEO, STA MARIA",
    "RS GRACELAND PLAZA MARIKINA",
    "RS GROTTO SHOP N RIDE BULACAN",
    "RS MERCEDES PASIG",
    "RS MONTALBAN TOWNCENTER",
    "RS RP ANTIPOLO",
    "RS RP CAINTA",
    "RS RP MALOLOS",
    "RS RP METROEAST",
    "RS TOWNVILLE PULILAN",
    "S&R MALOLOS",
    "SAVEMORE AGORA",
    "SAVEMORE CAPISTRANO",
    "SAVEMORE KAUSWAGAN ",
    "SHOPWISE OLIVAREZ PLAZA",
    "SM DOWNTOWN",
    "SM HYPERMARKET ALABANG ZAPOTE ROAD",
    "SM HYPERMARKET BANGKAL",
    "SM HYPERMARKET IMUS",
    "SM HYPERMARKET KADIWA",
    "SM HYPERMARKET LAS PINAS",
    "SM HYPERMARKET MALL OF ASIA",
    "SM HYPERMARKET MOLINO",
    "SM HYPERMARKET MUNTINLUPA",
    "SM HYPERMARKET NAIC",
    "SM HYPERMARKET PULILAN",
    "SM HYPERMARKET SUCAT",
    "SM HYPERMARKET SUCAT LOPEZ",
    "SM HYPERMARKET TAGAYTAY",
    "SM HYPERMARKET THE VILLAGE SQUARE",
    "SM SAVEMORE ALAPAN",
    "SM SUPERMARKET BACOOR",
    "SM SUPERMARKET DASMARINAS",
    "SM SUPERMARKET SOUTHMALL",
    "SM UPTOWN",
    "SMCO CEB BASAK",
    "SMCO ELIZABETH MALL",
    "SMCO LAP MARIBAGO",
    "SMCO MACTAN",
    "SMCO PARKMALL",
    "SMCO PRIMARK MACTAN CEBU",
    "SMCO BANGKAL",
    "SOUTH SUPERMARKET - MALOLOS",
    "SVI CONSOLACION",
    "SVI ECOLAND",
    "SVI LANANG",
    "SVI SEASIDE CEBU",
    "SW SAN ROQUE ANTIPOLO",
    "THE METRO GAISANO - BANAWA",
    "THE METRO GAISANO - LG GARDEN MACTAN",
    "TMP OPUS MALL",
    "TMP THE GROVE PASIG",
  ]);

  // State for the second modal
  const [openBranchModal, setOpenBranchModal] = React.useState(false);
  const handleOpenBranchModal = () => setOpenBranchModal(true);
  const handleCloseBranchModal = () => setOpenBranchModal(false);

  // State for selected branches
  const [selectedBranches, setSelectedBranches] = React.useState([]);

  // Update the outlet of the user with the selected branches

  const handleBranchSave = async () => {
    try {
      // Update the user's branches with the selected branches
      const response = await axios.put(
        "https://api-carmens-best.bmphrc.com/update-user-branch",
        {
          email: modalEmail,
          outlet: selectedBranches,
        }
      );

      console.log("User branches updated:", response.data);

      // Update the branch field in the userData state
      const updatedUserData = userData.map((user) => {
        if (user.email === modalEmail) {
          return {
            ...user,
            outlet: selectedBranches.join(", "), // Update the Branch field
          };
        }
        return user;
      });

      setUserData(updatedUserData); // Set the updated userData state

      // After successful update, you might want to refresh the user data
      getUser();
      setTimeout(() => window.location.reload(), 1000);
      handleCloseBranchModal(); // Close the branch selection modal after saving
    } catch (error) {
      console.error("Error updating user branches:", error);
    }
  };

  const capitalizeWords = (words) => {
    if (!words || !Array.isArray(words)) return [];

    return words.map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
    );
  };

  const columns = [
    { field: "count", headerName: "#", width: 75 },
    {
      field: "firstName",
      headerName: "FIRST NAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "middleName",
      headerName: "MIDDLE NAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "lastName",
      headerName: "LAST NAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "username",
      headerName: "USERNAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "emailAddress",
      headerName: "EMAIL ADDRESS",
      width: 250,
      headerClassName: "bold-header",
    },
    // {
    //   field: "remarks",
    //   headerName: "REMARKS",
    //   width: 150,
    //   headerClassName: "bold-header",
    // },
    {
      field: "contactNum",
      headerName: "CONTACT NUMBER",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "outlet",
      headerName: "OUTLETS",
      width: 300,
      headerClassName: "bold-header",
    },
    {
      field: "isActive",
      headerName: "STATUS",
      headerClassName: "bold-header",
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const status = params.row.isActive;
        const rowEmail = params.row.emailAddress;
        const roleAccount = localStorage.getItem("roleAccount"); // Get role from localStorage

        const onClick = (e) => {
          if (allowedRoles.includes(roleAccount)) {
            setUpdateStatus(params.row.isActive ? false : true); // Set status based on current state
            setUserEmail(params.row.emailAddress);
            handleOpenDialog(); // Open the dialog
          }
        };

        return (
          <>
            {status ? (
              <Stack>
                <ColorButton
                  variant="contained"
                  size="small"
                  style={{
                    width: "50%",
                    marginTop: "13px",
                    backgroundColor: "#987554",
                    color: "white",
                  }}
                  onClick={onClick}
                  disabled={isClient || !isAllowed}
                >
                  Active
                </ColorButton>
              </Stack>
            ) : (
              <Stack>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{ width: "50%", marginTop: "13px" }}
                  onClick={onClick}
                  disabled={isClient || !isAllowed}
                >
                  Inactive
                </Button>
              </Stack>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerClassName: "bold-header",
      headerName: "ACTION",
      width: 90,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const roleAccount = localStorage.getItem("roleAccount");
        const isClient = roleAccount === "CLIENT";

        const onClick = (e) => {
          let mFullname = params.row.firstName + " " + params.row.lastName;
          let condition = params.row.middleName;
          let mOutlet = params.row.outlet;
          let mEmail = params.row.emailAddress;
          let mPhone = params.row.contactNum;

          if (condition === "Null") {
            mFullname = params.row.firstName + " " + params.row.lastName;
          } else {
            mFullname =
              params.row.firstName +
              " " +
              params.row.middleName +
              " " +
              params.row.lastName;
          }

          setModalFullName(mFullname);
          setModalBranch(mOutlet);
          setModalEmail(mEmail);
          setModalPhone(mPhone);

          return setOpenViewModal(true);
        };

        return (
          <Stack>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={onClick}
              style={{
                width: "50%",
                marginTop: "13px",
                backgroundColor: "#987554",
                color: "#FFFFF",
              }}
              disabled={isClient} // 🔹 Disable for Client
            >
              <PersonIcon />
            </Button>
          </Stack>
        );
      },
    },
  ];

  async function getUser() {
    try {
      const loggedInBranch = localStorage.getItem("outlet");
      console.log("Logged in branch:", loggedInBranch);

      if (!loggedInBranch) {
        console.error("No branch information found for the logged-in admin.");
        return;
      }

      const loggedInBranches = loggedInBranch
        .split(",")
        .map((outlet) => outlet.trim());

      const response = await axios.post(
        "https://api-carmens-best.bmphrc.com/get-all-user"
      );
      const data = response.data.data;

      console.log("User data:", data);

      const filteredData = data.filter((item) => {
        console.log("Checking branch for user:", item.outlet);
        return loggedInBranches.some((outlet) => item.outlet?.includes(outlet));
      });

      console.log(filteredData, "filtered user data");

      const newData = filteredData.map((data, key) => {
        const capitalizedNames = capitalizeWords([
          data.firstName,
          data.middleName || "",
          data.lastName,
        ]);

        return {
          count: key + 1,
          outlet: data.outlet,
          firstName: capitalizedNames[0],
          middleName: capitalizedNames[1] || "Null",
          lastName: capitalizedNames[2],
          username: data.username,
          emailAddress: data.email, // now using `email` from updated schema
          contactNum: data.contactNumber, // now using `contactNumber`
          isActive: data.isVerified, // now using `isVerified`
        };
      });

      console.log(newData, "filtered and mapped user data");
      setUserData(newData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function setStatus() {
    console.log("check body", requestBody);
    await axios
      .put("https://api-carmens-best.bmphrc.com/update-status", requestBody)
      .then(async (response) => {
        const data = await response.data.data;

        console.log(data, "status info");
        window.location.reload();
      });
  }

  React.useEffect(() => {
    getUser();
    if (Array.isArray(modalBranch)) {
      setSelectedBranches(modalBranch); // Pre-select branches based on modalBranch
    }
  }, [modalBranch]);

  return (
    <div className="account">
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
                columns: {
                  columnVisibilityModel: {
                    address: false,
                    phone: false,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
              }}
              loading={!userData.length}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              pageSizeOptions={[5, 10, 20, 50, 100]}
              getRowId={(row) => row.count}
              disableRowSelectionOnClick
            />
          </Box>

          {/* Responsive Modal */}

          <Modal
            open={openViewModal}
            onClose={handleViewCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                padding: 4,
                backgroundColor: "white",
                margin: { xs: "10% auto", md: "5% auto" },
                width: { xs: "90%", sm: "70%", md: "50%" },
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: 24,
                borderRadius: 2,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Full Details
              </Typography>
              <Stack spacing={3} sx={{ mt: 2 }}>
                {/* Display Outlets */}
                <Typography id="modal-modal-description">
                  <span className="detailTitle">OUTLETS:</span>{" "}
                  <span className="detailDescription">
                    {Array.isArray(adminViewBranch)
                      ? adminViewBranch.join(", ")
                      : adminViewBranch}
                  </span>
                </Typography>

                {/* Dropdown for selecting branches */}
                <Autocomplete
                  multiple
                  id="branches-autocomplete"
                  options={outlets}
                  value={selectedBranches}
                  onChange={(event, newValue) => setSelectedBranches(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Outlet"
                      placeholder="Select Outlet"
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option}
                    </li>
                  )}
                />

                {/* Buttons for selecting/removing all outlets */}
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    onClick={() => setSelectedBranches(outlets)}
                    // variant="outlined"
                    sx={{
                      backgroundColor: "#987554",
                      color: "#fff",
                      borderColor: "#987554",
                      "&:hover": { backgroundColor: "#B99976" },
                    }}
                  >
                    Select All
                  </Button>
                  <Button
                    onClick={() => setSelectedBranches([])}
                    // variant="outlined"
                    sx={{
                      backgroundColor: "#987554",
                      color: "#fff",
                      borderColor: "#FF0000",
                      "&:hover": { backgroundColor: "#FF0000" },
                    }}
                  >
                    Remove All
                  </Button>
                </Stack>

                {/* Save Button */}
                <Button
                  onClick={() => handleBranchSave(modalEmail)}
                  // variant="contained"
                  sx={{
                    backgroundColor: "#987554",
                    color: "#fff",
                    borderColor: "#FF0000",
                    "&:hover": { backgroundColor: "#B99976" },
                  }}
                >
                  Save Outlet Changes
                </Button>

                {/* Read-only fields */}
                <TextField
                  label="Email"
                  id="outlined-read-only-input"
                  defaultValue={modalEmail}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Contact Number"
                  id="outlined-read-only-input"
                  defaultValue={modalPhone}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                {/* Close Button */}
                <DialogActions>
                  <Button onClick={handleViewCloseModal}>Close</Button>
                </DialogActions>
              </Stack>
            </Box>
          </Modal>

          {/* Branch Selection Dialog */}
          <Dialog
            open={openBranchModal}
            onClose={handleCloseBranchModal}
            aria-labelledby="branch-dialog-title"
            aria-describedby="branch-dialog-description"
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="branch-dialog-title">Select Branch</DialogTitle>
            <DialogContent>
              <Autocomplete
                multiple
                id="branches-autocomplete"
                options={outlets}
                defaultValue={selectedBranches}
                onChange={(event, value) => setSelectedBranches(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Branch"
                    placeholder="Select Branch"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseBranchModal}>Cancel</Button>
              <Button onClick={handleBranchSave} autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Account Activation Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Account Activation
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {updateStatus
                  ? "Are you sure you want to set this user as active?"
                  : "Are you sure you want to set this user as inactive?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={setStatus} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#000",
  backgroundColor: "#F6FAB9",
  "&:hover": {
    backgroundColor: "#CAE6B2",
  },
}));
