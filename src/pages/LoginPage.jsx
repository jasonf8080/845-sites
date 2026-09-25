import { Helmet } from 'react-helmet-async'
import { LoginForm } from '../components/Auth'

export const LoginPage = () => (
  <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-16 md:px-8 md:py-20">
    <Helmet>
      <title>Sign In | 845 Sites</title>
      <meta
        name="description"
        content="Sign in to 845 Sites to start a new website project or check the status of your current build."
      />
    </Helmet>
    <LoginForm />
  </section>
)
