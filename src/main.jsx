import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'

// import pages
import Root from './root.jsx'
import SignIn from './pages/signin.jsx'
import ForgotPassword from './pages/forgotPassword.jsx'
import VerifyCode from './pages/verifyCode.jsx'
import ResetPassword from './pages/resetPassword.jsx'
import Dashboard from './pages/dashboard.jsx'
import WriteCard from './pages/writeCard.jsx'
import CardsPending from './pages/cardsPending.jsx'
import CardsCompleted from './pages/cardsCompleted.jsx'
import CardsUncompleted from './pages/cardsUncompleted.jsx'
import Settings from './pages/settings.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
    [<Route path='/' element={<Root />}>
      <Route path='' element={<Dashboard />} />
      <Route path='writeCard' element={<WriteCard />} />
      <Route path='pendingcards' element={<CardsPending />} />
      <Route path='completedcards' element={<CardsCompleted />} />
      <Route path='uncompletedcards' element={<CardsUncompleted />} />
      <Route path='settings' element={<Settings />} />
    </Route>,
    <Route path='login' element={<SignIn />} />,
    <Route path='forgotPassword' element={<ForgotPassword />} />,
    <Route path='verifyCode' element={<VerifyCode />} />,
    <Route path='resetPassword' element={<ResetPassword />} />,
    ]
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)