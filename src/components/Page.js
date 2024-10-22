import React from 'react'
import Navbar from './Navbar'

import Widget from './Widget'

import { Outlet } from 'react-router-dom'


const Page = ({allProps}) => {
  return (
    <div className="flex justify-between  h-screen overflow-y-scroll no-scrollbar">
    
      <Navbar allProps={allProps}  />
      <Outlet allProps={allProps} />
      <Widget />
      
      </div>
    )
  }
  
  export default Page
  
  