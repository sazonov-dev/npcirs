import React from 'react'
import Main from '../Main/Main'
import { Routes, Route, Navigate } from 'react-router-dom'
import Tables from '../Tables/Tables'

const Layout = () => {
    return (
          <Main>
            <Routes>
                <Route path='/tables' element={<Tables />} />
            </Routes>
          </Main>
    )
  }
  
  export default Layout