import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '48px', color: '#ff0000' }}>Login Page</h1>
        <h2>This page is under construction</h2>
        <p style={{ fontSize: '18px' }}>
          The login functionality is not yet implemented.
        </p>
        <p style={{ fontSize: '18px' }}>
          You can go back to the <Link to="/" style={{ textDecoration: 'underline' }} >home page</Link>.
        </p><br />
        <p style={{ fontSize: '18px' }}>
          Or visit the <Link to="/admin" style={{ textDecoration: 'underline' }}>admin dashboard</Link>.
        </p>
    </div>
  )
}

export default LoginPage;