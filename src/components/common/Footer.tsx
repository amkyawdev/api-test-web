const Footer: React.FC = () => {
  return (
    <footer className="footer-glass">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="footer-text mb-0">
              &copy; {new Date().getFullYear()} API Test Hub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <p className="footer-text mb-0">
              <span className="me-3">
                <i className="bi bi-person-badge"></i> Admin: Aung Myo Kyaw
              </span>
              <span className="me-3">
                <i className="bi bi-code-slash"></i> Developer: AmkyawDev
              </span>
              <span>
                <i className="bi bi-geo-alt"></i> Nay Pyi Taw, Myanmar
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
