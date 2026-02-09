'use client'

export default function AuthSuccess(){

    return (
        <div>
       <h1>AUthentication Sucess logged in!!</h1>
        <button onClick={() => { window.location.href = `http://localhost:3000` }}>Home</button>
        </div>
 
    )
}