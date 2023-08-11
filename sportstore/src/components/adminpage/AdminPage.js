import React from "react";



const AdminPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="/AdminorderPage">
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/AdminproductPage">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/AdminuserPage">
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/AdminContactPage">
                  Contacts
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Orders</h5>
                  <p className="card-text">View and manage orders here</p>
                  <a href="/AdminorderPage" className="btn btn-primary">
                    Go to Orders
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Products</h5>
                  <p className="card-text">View and manage Products here</p>
                  <a href="/AdminproductPage" className="btn btn-primary">
                    Go to PRoducts
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Conatcts</h5>
                  <p className="card-text">View and manage Contacts here</p>
                  <a href="/AdminContactPage" className="btn btn-primary">
                    Go to Contacts
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">View and manage users here</p>
                  <a href="/AdminuserPage" className="btn btn-primary">
                    Go to Users
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;

