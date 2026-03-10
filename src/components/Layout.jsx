import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-outfit relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full p-4 lg:p-8 pt-8 md:pt-10 z-10 scroll-smooth">
        <div className="max-w-7xl mx-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
