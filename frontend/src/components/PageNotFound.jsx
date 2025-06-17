import React from 'react'

export default function PageNotFound() {
  return (
    <>
        <div className="flex flex-col h-screen items-center justify-center text-xl">
            <span>404</span>
            <div className="text-xl font-semibold text-red-700">Page Not Found</div>
        </div>
    </>
  );
}
