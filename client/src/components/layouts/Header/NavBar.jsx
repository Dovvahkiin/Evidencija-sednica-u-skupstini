import "@/styles/header/header.css";

const NavBar = ({ isOpen }) => {
  return (
    <nav className={isOpen ? "" : "close"}>
      <div className="side-nav left">
        <a href="">HOME</a>
        <a href="">PROFILE</a>
        <a href="">ADD MEETING</a>
      </div>
      <div className="side-nav right">
        <a href="">LOGOUT</a>
      </div>
    </nav>
  );
};

export default NavBar;
