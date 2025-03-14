import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "./components/Content/content";
import Header from "./components/Header/header";
import { AuthProvider } from "./hooks/AuthProvider";
import "./style.less";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(
    savedTheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    const newTheme = theme.palette.mode === "light" ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.palette.mode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme === "dark" ? darkTheme : lightTheme);
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("sportprono-user") as string);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <div className="App">
          <Router>
            <Header toggleTheme={toggleTheme} />
            <Content />
          </Router>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
