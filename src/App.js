import React from 'react'
import './App.css'
import Routes from './routes/routes'
import { connect } from 'react-redux'
import Storage from './services/localStorage/localStorage'
import ErrorBoundary from './containers/errorBoundary/errorBoundary'
import io from 'socket.io-client'
export const socket = io.connect('https://thawing-ravine-80499.herokuapp.com/')
const ls = Storage.get('deliver')
const App = ({currentUserData}) => {
 
 console.log(currentUserData)
  return (
    <ErrorBoundary>
      <Routes token={ls?ls.token:currentUserData.token} userType={ls?ls.userType:currentUserData.userType} />
    </ErrorBoundary>
  )
}

const mapStateToProps = state => {
  const { currentUser } = state
  const { currentUserData } = currentUser
  return {
    currentUserData,
  }
}

export default connect(mapStateToProps)(App)