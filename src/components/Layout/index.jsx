import "./style.css";
/* eslint-disable react/prop-types */
function Layout({ children }) {
  return (
    <div className="container">
      <div className="container-page">{children}</div>;
    </div>
  );
}

export { Layout };
