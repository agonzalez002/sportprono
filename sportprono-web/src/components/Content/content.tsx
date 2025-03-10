import { ArrowBack } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledBack } from "../../globalStyled";
import { useAuth } from "../../hooks/useAuth";
import MainContent from "../MainContent/main-content";
import UnAuthInfo from "../UnAuthInfo/UnAuthInfo";

function Content() {
  const { authData, setAuth } = useAuth();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    if (!authData) {
      const storedUser = localStorage.getItem("sportprono-user");
      if (storedUser) {
        setAuth(JSON.parse(storedUser).value);
      } else {
        navigate("/");
      }
    }
  }, [authData, setAuth, navigate]);

  return (
    <div className="content">
      {pathnames.length !== 0 && (
        <StyledBack onClick={() => navigate(-1)}>
          <span>
            <ArrowBack />
            Retour
          </span>
        </StyledBack>
      )}

      {authData ? <MainContent /> : <UnAuthInfo />}
    </div>
  );
}

export default Content;
