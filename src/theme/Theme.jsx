import { createTheme } from "@mui/material/styles";
import { ThemeProvider as OldThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";

const ThemeProvider = ({ children }) => {
  const theme = createTheme({}, esES);

  return <OldThemeProvider theme={theme}>{children}</OldThemeProvider>;
};

export default ThemeProvider;
