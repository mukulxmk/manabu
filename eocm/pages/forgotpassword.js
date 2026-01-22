// import Link from 'next/link'
// import React from 'react'

// function Forgotpassword() {
//     return (
//         <div className="min-h-screen flex items-start justify-center py-24 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//                 <div>
//                     <img className="mx-auto h-12 w-auto" src="/codeswearcircle.png" alt="Workflow" />
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
//                     <Link href={'/login'}><p className="mt-2 text-center text-sm text-gray-600">Or<a className="font-medium text-pink-600 hover:text-pink-500"> Login </a></p></Link>
//                 </div>
//                 <form className="mt-8 space-y-6" method="POST">
//                     <input type="hidden" name="remember" />
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div><label htmlFor="fullname" className="sr-only">Name</label><input minLength={2} maxLength={50} id="fullname" name="fullname" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Your Name" /></div>
//                         <div><label htmlFor="email" className="sr-only">Email address</label><input minLength={5} maxLength={320} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email address" /></div>
//                     </div>
//                     <div className="recaptcha">
//                         <div>
//                             <div>
//                                 <div style={{ width: '304px', height: '78px' }}>
//                                     <div><iframe title="reCAPTCHA" src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Le_7GQfAAAAAO5XGhMj07Ynhu0RceUF8J3a6ab5&co=aHR0cHM6Ly93d3cuY29kZXN3ZWFyLmNvbTo0NDM.&hl=en-GB&type=image&v=g8G8cw32bNQPGUVoDvt680GA&theme=light&size=normal&badge=bottomright&cb=haw863hew0vp" width={304} height={78} role="presentation" name="a-q6d97lcc0b55" frameBorder={0} scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox" /></div>
//                                     <textarea id="g-recaptcha-response-5" name="g-recaptcha-response" className="g-recaptcha-response" style={{ width: '250px', height: '40px', border: '1px solid rgb(193, 193, 193)', margin: '10px 25px', padding: '0px', resize: 'none', display: 'none' }} />
//                                 </div>
//                                 <iframe style={{ display: 'none' }} />
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300">
//                             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                                 <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                                 </svg>
//                             </span>
//                             Continue
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Forgotpassword


/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import {useRouter} from 'next/router'
const Forgot = () => {
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem('token')){
     router.push('/');
    }
  })
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
      <Link href={'login'}><a href="#" className="font-medium text-rose-600 hover:text-rose-500"> Sign In</a></Link>
      </p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
        </div>
      </div>
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
          Continue
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default Forgot