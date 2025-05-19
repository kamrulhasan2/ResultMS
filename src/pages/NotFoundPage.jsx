
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '48px', color: '#ff0000' }}>404</h1>
        <h2 style={{ fontSize: '36px' }}>Page Not Found</h2>
        <p style={{ fontSize: '18px' }}>
          The page you are looking for does not exist.
        </p>
        <p style={{ fontSize: '18px' }}>
          You can go back to the <a href="/" style={{ textDecoration: 'underline', color: '#007bff' }}>home page</a>.
        </p>
    </div>
  )
}

export default NotFoundPage;