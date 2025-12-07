function Header() {
  return (
    <header className="py-4 mb-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="logo-circle">
              <img src="/logo/شعار (1).png" alt="معمل سلمى" className="logo-img" />
            </div>
          </div>
          <div className="col">
            <h1 className="mb-0 display-6 fw-bold">معمل سلمى للرياضيات</h1>
            <p className="mb-0 text-muted">ساعة مع الأرقام ⏰</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
