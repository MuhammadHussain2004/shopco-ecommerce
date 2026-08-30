import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="container not-found">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
