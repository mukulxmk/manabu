import Link from 'next/link'
import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineClose } from 'react-icons/ai'
import Head from 'next/head';
import Script from 'next/script'

function Checkout({ cart, addToCart, removeFromCart, subTotal }) {
  const initialPayment = async () => {
    // let txnToken;
    let oid = Math.floor(Math.random()* Date.now())
    // get a transaction token 
    const data = { cart, subTotal, oid, email: "email" };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      
    })
    console.log(a)
     let txnToken = await a.json()
     console.log(txnToken)
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });


  }
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />

      {/* <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js" onload="onScriptLoad();`} crossorigin="anonymous"></Script> */}
      <div className="container px-2 sm:m-auto min-h-screen pb-8">
        <div className="Toastify" />
        <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
        <h2 className="font-semibold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4"><label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label><input minLength={2} maxLength={40} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4"><label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label><input minLength={5} maxLength={320} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4"><label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label><textarea minLength={2} maxLength={400} name="address" id="address" cols={30} rows={2} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4"><label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label><input minLength={10} maxLength={10} placeholder="Your 10 Digit Phone Number" type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4"><label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode (Shipping only to India)</label><input minLength={6} maxLength={6} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4"><label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label><input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4"><label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label><input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></div>
          </div>
        </div>
        <h2 className="font-semibold text-xl">2. Review Cart Items &amp; Pay</h2>
        <div className="sideCart bg-pink-100 p-2 m-2 my-4">
          <div className=" sideCart  bg-pink-100 p-10 py-10 px-8 ">
            {/* <h2 className=' font-bold text-xl text-center'>Shoping Cart</h2> */}
            <ol className=' list-decimal font-semibold'>
              {Object.keys(cart).length === 0 && <div className=' my-4 font-semibold mx-2'>
                {/* No Items present in Cart.
                        Please add a few items to checkout */}

              </div>}
              {
                Object.keys(cart).map((k) => {
                  return (
                    <li key={k}>
                      <div className="item flex my-5">
                        <div className=' w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
                        <div className=' flex items-center justify-center w-1/3 text-lg  '>
                          <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className=' cursor-pointer text-pink-500' /><span className='mx-2'>{cart[k].qty}</span>
                          <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className=' cursor-pointer text-pink-500' /></div>
                      </div>

                    </li>
                  )
                })
              }
            </ol>

            <span className="font-bold">SubTotal: ₹{subTotal}</span>
          </div>

        </div>
        <div className="flex row justify-between lg:items-center flex-col lg:flex-row">
          <div className="mx-4">
            <div className="form-check flex items-center">
              <input className="mr-2 p-8 md:h-4 md:w-4" type="checkbox" id="flexCheckDefault" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                <p className="py-4">I want to place a Cash on Delivery (COD) Order. I promise to pay the delivery partner on delivery</p>
              </label>
            </div>
          </div>
          <div className="coupon mx-4 my-4 lg:mx-60 ">
            <h3 className="text-gray-600 font-semibold">Apply Promo code</h3>
            <div className="pin my-2 flex space-x-2 text-sm"><input className="px-2 border-2 border-gray-400 rounded-md" placeholder="Enter Code (Only Prepaid)" type="text" /><button className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-200">Apply</button></div>
          </div>
        </div>
        <div className="mx-4">
          {/* <div className="recaptcha my-2 hidden">
            <div>
              <div>
                <div style={{ width: '304px', height: '78px' }}>
                  <div><iframe title="reCAPTCHA" src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Le_7GQfAAAAAO5XGhMj07Ynhu0RceUF8J3a6ab5&co=aHR0cHM6Ly93d3cuY29kZXN3ZWFyLmNvbTo0NDM.&hl=en-GB&type=image&v=g8G8cw32bNQPGUVoDvt680GA&theme=light&size=normal&badge=bottomright&cb=lhwgbzah66o3" width={304} height={78} role="presentation" name="a-62gt5l9lz3ib" frameBorder={0} scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox" /></div>
                  <textarea id="g-recaptcha-response-2" name="g-recaptcha-response" className="g-recaptcha-response" style={{ width: '250px', height: '40px', border: '1px solid rgb(193, 193, 193)', margin: '10px 25px', padding: '0px', resize: 'none', display: 'none' }} />
                </div>
                <iframe style={{ display: 'none' }} />
              </div>
            </div>
          </div> */}
          <Link href={'/checkout'}>
            <button className="flex items-center justify-center mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm disabled:bg-pink-300 " onClick={initialPayment}>
              {/* <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium m-1 css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShoppingBagIcon">
              <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z" />
            </svg> */}
              Pay {subTotal}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Checkout


