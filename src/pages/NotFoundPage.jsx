import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export const NotFoundPage = () => (
  <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
    <Helmet>
      <title>Page Not Found | 845 Sites</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-primary">404</h1>
    <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
      We couldn't find the page you were looking for.
    </p>
    <Link
      to="/"
      className="mt-8 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
    >
      Back to Home
    </Link>
  </section>
)
