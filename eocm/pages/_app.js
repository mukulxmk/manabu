// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   const [cart, setCart] = useState({})
//   const [subTotal, setSubTotal] = useState(0);
//   const router = useRouter()
//   useEffect(() => {
//     // console.log('useef') 
//     try {
//       if (localStorage.getItem("cart")) {
//         setCart(JSON.parse(localStorage.getItem("cart")))
//         saveCart(JSON.parse(localStorage.getItem("cart")))
//       }
//     } catch (error) {
//       console.log(error)
//       localStorage.clear()
//     }
//     // saveCart(cart)

//   }, [])


//   const saveCart = (myCart) => {
//     localStorage.setItem("cart", JSON.stringify(myCart))
//     let subt = 0;
//     let keys = Object.keys(myCart)
//     for (let i = 0; i < keys.length; i++) {
//       // console.log(keys)
//       subt += myCart[keys[i]].price * myCart[keys[i]].qty
//     }
//     setSubTotal(subt)
//   }
//   const addToCart = (itemCode, qty, price, name, size, varient) => {
//     let newCart = cart;
//     if (itemCode in cart) {
//       newCart[itemCode].qty = cart[itemCode].qty + qty
//     }
//     else (
//       newCart[itemCode] = { qty: 1, price, name, size, varient }

//     )
//     setCart(newCart)
//     // console.log(newCart)
//     saveCart(newCart)
//   }
//   const clearCart = () => {
//     setCart({})
//     saveCart({})
//   }
//   const removeFromCart = (itemCode, qty, price, name, size, varient) => {
//     let newCart = JSON.parse(JSON.stringify(cart));
//     if (itemCode in cart) {
//       newCart[itemCode].qty = cart[itemCode].qty - qty
//     }
//     if (newCart[itemCode]["qty"] <= 0) {
//       delete newCart[itemCode]
//     }
//     setCart(newCart)
//     saveCart(newCart)
//   }

//   const buyNow = (itemCode,qty,price,name,size,varient) =>{
//     let newCart = { itemCode: {qty : 1,price,name,size,varient}};
//       setCart(newCart);
//       saveCart(newCart);
//     router.push('/checkout')
//   }
  
//   return (
//     <>
//       <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
//       <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} {...pageProps} />
//       <Footer />
//     </>
//   )
// }
// export default MyApp


import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState({});
  const [subTotal, setsubTotal] = useState(0);
  const [user, setUser] = useState({value:null});
  const [key, setKey] = useState(0);
  const router  = useRouter();
  
  useEffect(() => {
    // routerchange ------------
    router.events.on('routeChangeStart',()=>{
      setProgress(50)
    });
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    });
    // -------------------
    try {
      if(localStorage.getItem("cart")){
        setcart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }  
    } catch (error) {
      localStorage.clear();
    }
    const token = localStorage.getItem('token');
    if(token){
      setUser({value: token});
      setKey(Math.random());
    }
  }, [router.query])
  const logout = () =>{
    localStorage.removeItem('token');
    setUser({value: null})
    setKey(Math.random());
    router.push('/'); 
  }
  const saveCart = (myCart) =>{
    localStorage.setItem("cart",JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for(let i =0 ; i < keys.length ; i++ ){
        subt += myCart[keys[i]].price * myCart[keys[i]].qty; 
    }
    setsubTotal(subt);
    }

  const addToCart = (itemCode,qty,price,name,size,varient) =>{
    toast.success('Item is Added to your Cart!',{
      position : "top-left",
      autoClose : 3000,
      hideProgressBar : false,
      closeOnClick : true,
      draggable : true,
      progress : undefined,
    });
      let newCart = cart;
      if(itemCode in cart) {
        newCart[itemCode].qty = cart[itemCode].qty+qty;
      } else{
        newCart[itemCode] = {qty : 1,price,name,size,varient}
      }
      setcart(newCart);
      saveCart(newCart);
  }
  const buyNow = (itemCode,qty,price,name,size,varient) =>{
    let newCart = { itemCode: {qty : 1,price,name,size,varient}};
      setcart(newCart);
      saveCart(newCart);
    router.push('/checkout')
  }
  const clearCart = () =>{
    setcart({});
    saveCart({});
  }
  const removeFromCart = (itemCode,qty,price,name,size,varient) =>{
    let newCart = cart;
    if(itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode].qty <= 0 ){
      delete newCart[itemCode];
    }
    setcart(newCart);
    saveCart(newCart);
}
const [progress, setProgress] = useState(100)

  return (
    <>
    <LoadingBar
        color='rgb(236 72 153)'
        height={3}
        shadow={true}
        waitingTime={300}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar logout={logout} user={user} key={key}  cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  
  <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer/>
  </>
  )
}

export default MyApp
