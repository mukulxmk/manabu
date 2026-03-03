"use client";

import React from "react"; 
import { motion } from "framer-motion"; 
import { Card, CardContent } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Plus, Package, Search } from "lucide-react";

export default function InventoryPage() { 
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex justify-center"> {/* Background Glow */} 
    <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl top-20 left-10" /> 
    <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl bottom-10 right-10" />

<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative w-full max-w-7xl rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl p-8"
  >
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
          <Package size={24} /> Inventory Management
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Create and manage your products seamlessly.
        </p>
      </div>

      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
        <Input
          placeholder="Search products..."
          className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
        />
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Create Product Form */}
      <Card className="lg:col-span-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Plus size={18} /> Add Product 
          </h2>

          <Input
            placeholder="Product Name"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="Price"
            type="number"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="Stock Quantity"
            type="number"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <div className="flex flex-wrap justify-evenly">
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <Button className="">
            <Plus size={18} /> Category
            </Button>
            </div>
              <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <Button className="">
            <Plus size={18} /> Images
            </Button>
            </div>
               <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <Button className="">
            <Plus size={18} /> Location
            </Button>
            </div>
         
          </div>
        
          <Textarea
            placeholder="Product Description"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          

          <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-xl">
            Save Product
          </Button>

          <div className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-xl">
           Personal Tags
          </div>
        </CardContent>
      </Card>

      {/* Product List */}
      <div className="lg:col-span-2 space-y-6">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium text-lg">
                    Product Name
                  </h3>
                  <p className="text-white/60 text-sm">
                    ₹999 • 25 in stock
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                  >
                    Edit
                  </Button>
                  <Button className="bg-red-500/70 hover:bg-red-500 text-white rounded-xl">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
</div>

); }