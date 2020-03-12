import React from 'react'
import './App.css'
import Routes from './routes/routes'
import { connect } from 'react-redux'
import Storage from './services/localStorage/localStorage'
import ErrorBoundary from './containers/errorBoundary/errorBoundary'


const App = ({ currentUserData }) => {
  const ls = Storage.get('deliver')
  return (
    <ErrorBoundary>
      <Routes token={ls ? ls.token : currentUserData.token} userType={ls ? ls.userType : currentUserData.userType} />
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

export default connect(mapStateToProps, null)(App)
