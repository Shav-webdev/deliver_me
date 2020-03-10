import React from 'react'
import './App.css'
import Routes from './routes/routes'
import { connect } from 'react-redux'
import Storage from './services/localStorage/localStorage'
import ErrorBoundary from './containers/errorBoundary/errorBoundary'
import io from 'socket.io-client'
export const socket = io.connect('https://thawing-ravine-80499.herokuapp.com/')

const App = () => {
  const ls = Storage.get('deliver')
  return (
    <ErrorBoundary>
      <Routes token={ls ? ls.token : null} userType={ls ? ls.userType : null} />
    </ErrorBoundary>
  )
}
export default App