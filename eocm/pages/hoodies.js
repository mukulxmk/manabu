import Link from 'next/link'
import React from 'react'
import Product from '../models/Product'
import mongoose from 'mongoose'

function Hoodies({ products }) {
  return (
    <div>
    <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length===0 && <p>Sorry all the Hoodies are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {
              Object.keys(products).map((item) => {
                return (

                  <Link passHref={true} href={`/product/${products[item].slug}`} key={products[item]._id}>
                    <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-6">
                      <a style={{
                        position: 'inherit'
                      }} className="block relative  rounded overflow-hidden">
                        <img alt="ecommerce" className=" h-[40vh] md:h-[36vh] block m-auto" src={products[item].img} />
                      </a>
                      <div className="mt-4 text-center md:text-left">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                        <p className="mt-1">₹ {products[item].price}</p>
                        <div className="mt-1">
                          {products[item].size.includes('S') && <span className=' border border-gray-300 px-1 mx-1'>S</span>}
                          {products[item].size.includes('M') && <span className=' border border-gray-300 px-1 mx-1'>M</span>}
                          {products[item].size.includes('L') && <span className=' border border-gray-300 px-1 mx-1'>L</span>}
                          {products[item].size.includes('XL') && <span className=' border border-gray-300 px-1 mx-1'>XL</span>}
                          {products[item].size.includes('XXL') && <span className=' border border-gray-300 px-1 mx-1'>XXL</span>}
                        </div>
                        <div className="mt-1 ">
                           {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-rose-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                         
                          {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        </div>
                      </div>
                    </div>
                  </Link>

                )
              })
            }
          </div>
        </div>
      </section>
  </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: 'hoodies' });
  let hoodiess = {};
  for (let item of products) {
    if (item.title in hoodiess) {
      if (!hoodiess[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodiess[item.title].color.push(item.color)
      }
      if (!hoodiess[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodiess[item.title].size.push(item.size)
      }


    }
    else {

      hoodiess[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoodiess[item.title].color = [item.color]
        hoodiess[item.title].size = [item.size]

      }

    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(hoodiess)) }
  }
}

export default Hoodies