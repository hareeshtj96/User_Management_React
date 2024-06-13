// AdminHeader.jsx
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../Slices/adminApiSlice";
import { logout } from "../Slices/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutAdmin] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutAdmin().unwrap();
      dispatch(logout());
      navigate('/admin/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/admin/dashboard">
            <Navbar.Brand>ADMIN DASHBOARD</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {adminInfo && (
                <NavDropdown title={adminInfo.name} id="adminname">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
