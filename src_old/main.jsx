import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Home from './components/home'


// var App = ReactDOM.render(<Home />, document.getElementById('home'));

let reactElement = document.getElementById('react')
render(
  <Provider store={store}>
    <Home />
  </Provider>,
  reactElement
)
