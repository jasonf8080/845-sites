import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/main'
import { HomePage, LoginPage, NotFoundPage } from './pages'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
