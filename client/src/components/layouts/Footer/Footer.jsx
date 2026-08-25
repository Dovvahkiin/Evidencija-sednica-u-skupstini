import "@/styles/footer/footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footerLayout">
        <p style={{ textAlign: "center", color: "var(--lightBlue)" }}>
          Dovvahkiin &copy; {new Date().getFullYear()} - Božidar Tovarnicki. All
          rights are reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
