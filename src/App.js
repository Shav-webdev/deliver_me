import React from 'react'
import './App.css'
import Routes from './routes/routes'
import ErrorBoundary from './containers/errorBoundary/errorBoundary'
import io from "socket.io-client";
export const socket = io.connect('https://thawing-ravine-80499.herokuapp.com/');
export default function App() {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  )
}
