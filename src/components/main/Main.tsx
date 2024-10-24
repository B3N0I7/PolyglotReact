import "./main.css";

export const Main = ({ name }: { name: string }) => {
  return (
    <div className="central-bloc">
      <h1>CORPS</h1>
      <br />
      <p>Bonjour {name}</p>
    </div>
  );
};
