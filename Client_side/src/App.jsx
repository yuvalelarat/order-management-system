import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import MainPage from "./pages/MainPage";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { useThemeContext } from "./hooks/useThemeContext";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";
import SignUp from "./pages/SignUp";
import UserProfilePage from "./pages/UserProfilePage";
import PaymentPage from "./pages/PaymentPage";
import { UserContextProvider } from "./contexts/UserContext";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./layouts/RequireAuth";
import ForgotPassword from "./pages/ForgotPassword";
import EditEventPage from "./pages/EditEventPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import EditPassword from "./pages/EditPassword";

function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <ThemedApp />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

function ThemedApp() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/no-access" element={<div>no access</div>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* TODO (gal shoshani): move to protected route(when this page is ready) */}
          <Route path="/edit-event" element={<EditEventPage />} />

          <Route
            path="/event/:eventId/payment/success"
            element={<PaymentSuccess />}
          />
          <Route path="/edit-password/:token" element={<EditPassword />} />
          {/*protected routes */}
          <Route element={<RequireAuth allowedRoles={["User"]} />}>
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/event/:eventId/payment" element={<PaymentPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/admin-panel" element={<div>admin</div>} />
          </Route>
        </Route>
        <Route path="*" element={<div>Bad route</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
