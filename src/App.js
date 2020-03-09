import React from 'react'
import './App.css'
import Routes from './routes/routes'
import { connect } from 'react-redux'
import ErrorBoundary from './containers/errorBoundary/errorBoundary'
import io from 'socket.io-client'
export const socket = io.connect('https://thawing-ravine-80499.herokuapp.com/')
import { getCookie } from './pages/registration/services/cookiesUtils'
function App({ currentUserData }) {
  // const token = Cookies.getJSON('token')
  // const userType = Cookies.getJSON('userType')
  //const { token, userType } = currentUserData
  console.log(currentUserData)
  return (
    <ErrorBoundary>
      {<Routes currentUser={currentUserData} />}
    </ErrorBoundary>
  )
}

const mapStateToProps = state => {
  const { currentUser } = state
  const { currentUserData } = currentUser
  console.log(currentUserData)
  return {
    currentUserData,
  }
}

export default connect(mapStateToProps)(App)
