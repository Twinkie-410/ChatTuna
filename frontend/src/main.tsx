import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { setupStore } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = setupStore()

setupListeners(store.dispatch)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  
)