import React from 'react'
import './App.css'
import Routes from './routes/routes'
import ErrorBoundary from './containers/errorBoundary/errorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  )
}
