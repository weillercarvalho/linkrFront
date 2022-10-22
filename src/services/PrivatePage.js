import { useNavigate } from "react-router-dom";



export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  const auth = localStorage.getItem(`token`);

  if (auth) {
    return <>{children}</>;
  } else {
    alert(`O usuario não está logado, acesso não autorizado.`);
    navigate(`/`);
  }
}