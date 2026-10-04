// Lab 6.2
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function NotFound() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong";

  return (
    <section className="page-panel">
      <h1>{title}</h1>
      <Link to="/">Back to dashboard</Link>
    </section>
  );
}
