import { useLocation } from "react-router-dom";
import { Menu } from "./../menu";
import { Main } from "./../main";

export const Body = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const name = urlParams.get("name");
  return (
    <>
      <Menu />
      {name && <Main name={name} />}
    </>
  );
};
