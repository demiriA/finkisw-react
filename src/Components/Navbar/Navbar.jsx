import React from 'react';

function Navbar() {
  return (
    <nav className="container mb-1 navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">FINKI SW</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
        aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-question"></i> Help</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-magic"></i> About</a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto nav-flex-icons">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-th"></i> Courses
          </a>
          <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
            <a className="dropdown-item" href="#"><i class="fas fa-angle-right"></i> Course 1</a>
            <a className="dropdown-item" href="#"><i class="fas fa-angle-right"></i> Course 2</a>
            <a className="dropdown-item" href="#"><i class="fas fa-angle-right"></i> Course 3</a>
          </div>
        </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-user"></i> Username
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-default"
              aria-labelledby="navbarDropdownMenuLink-333">
              <a className="dropdown-item" href="#"><i class="fas fa-eye"></i> Role</a>
              <a className="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Sign out</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
