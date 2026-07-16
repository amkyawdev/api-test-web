const Footer: React.FC = () => {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-secondary">
              &copy; {new Date().getFullYear()} API Test Hub. All rights reserved.
            </small>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <small className="text-secondary">
              <span className="me-3">
                <i className="bi bi-person-badge me-1"></i>
                Admin: Aung Myo Kyaw
              </span>
              <span className="me-3">
                <i className="bi bi-code-slash me-1"></i>
                Developer: AmkyawDev
              </span>
              <span>
                <i className="bi bi-geo-alt me-1"></i>
                Nay Pyi Taw, Myanmar
              </span>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
