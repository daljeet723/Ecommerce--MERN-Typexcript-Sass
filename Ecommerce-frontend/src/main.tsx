import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/app.scss"
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
      {/* WRAP IN PROVIDER TO USE REDUX STORE */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>

  ,
)
