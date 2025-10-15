import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';


export default function NotFoundPage(): JSX.Element {
  return (
    <section className="six-cities">
      <Helmet>
        <title>six-cities: Page not found</title>
      </Helmet>

      <section className="error__page">
        <h1 className="error__name">404. Page not found</h1>
        <Link to="/">Return to main page</Link>
      </section>
    </section>
  );
}
