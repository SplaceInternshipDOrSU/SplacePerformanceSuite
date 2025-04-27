import React from 'react'

const DeactivatedUser = () => {
  return (
    <div className='h-screen w-screen bg-slate-900 text-slate-100'>
    <div className="w-full h-full flex justify-center gap-1 items-center flex-col text-text_color ">
        <h2 className='text-[50px] font-bold'>Your Account Has Been Deactivated</h2>
        <span className='text-xs'>if this is a mistake please contact the Admin</span>
    </div>
</div>
  )
}

export default DeactivatedUser