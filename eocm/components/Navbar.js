import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiOutlineClose } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'

function Navbar({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, name, qty }) {
    // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
    const ref = useRef()
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')

        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')

        }

    }

    // -------DropDown-------

    const [dropdown, setDropdown] = useState(false)


    return (
        <div className=' flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md sticky top-0 bg-white z-10'>
            <div className="logo mr-auto md:mx-5">
                <Link href={"/"}><a> <Image src="/logo.webp" width={200} height={40} alt="logo" /></a></Link>
            </div>
            <div className="nav">
                <ul className='flex  items-center space-x-4 font-bold md:text-sm'>
                    <Link href={"/tshirts"}><a><li>Tshirts</li></a></Link>
                    <Link href={"/hoodies"}><a><li>Hoodies</li></a></Link>
                    <Link href={"/stickers"}><a><li>Stickers</li></a></Link>
                    <Link href={"/mugs"}><a><li>Mugs</li></a></Link>
                </ul>
            </div>
            <div className="cart absolute right-0 mx-5 top-4 flex cursor-pointer">
                <a onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
                    {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-8 bg-white shadow-lg border top-5 md:top-6 rounded-md px-5 w-32  ">
                        <ul>
                            <Link href={'/myaccount'}><li className='py-1 text-sm hover:text-pink-700 font-bold'>MyAccount</li></Link>
                            <Link href={'/orders'}><li className='py-1 text-sm hover:text-pink-700 font-bold'>Orders</li></Link>
                            <li onClick={logout} className='py-1 text-sm hover:text-pink-700 font-bold'>Logout</li>
                        </ul>
                    </div>}

                    {user.value && <MdAccountCircle className=' text-xl md:text-2xl mx-2' />}
                </a>
                {!user.value && <Link href={'/login'}><a>
                    <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button>
                </a></Link>}
                <AiOutlineShoppingCart onClick={toggleCart} className=' text-xl md:text-2xl cursor-pointer' />
            </div>


            {/* //sidebar */}

            <div ref={ref} className={`w-72 h-[100vh] over sideCart absolute top-0 right-0 bg-pink-100 p-10 py-10 px-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className=' font-bold text-xl text-center'>Shoping Cart</h2>
                <span onClick={toggleCart} className="absolute top-5 right-2 text-2xl text-pink-500 cursor-pointer"><AiOutlineClose /></span>
                <ol className=' list-decimal font-semibold'>
                    {Object.keys(cart).length === 0 && <div className=' my-4 font-semibold mx-2'>
                        {/* No Items present in Cart.
                        Please add a few items to checkout */}
                        Your Card is Empty
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
                <div className="font-bold my-2 mx-2">SubTotal: ₹{subTotal}</div>
                <div className="flex">
                    <Link href={'/checkout'}><button className="flex mx-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded"><BsFillBagCheckFill className=' m-1' />CheckOut</button></Link>
                    <button onClick={clearCart} className="flex mx-2 cursor-pointer text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">ClearCart</button>
                </div>

            </div>
        </div>
    )
}

export default Navbar