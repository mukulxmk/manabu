'use client'

import React from "react"; 
import { motion } from "framer-motion"; 
import { Card, CardContent } from "../../components/ui/card.tsx"; 
import { Button } from "../../components/ui/button.tsx"; 
import { Input } from "../../components/ui/input.tsx"; 
import { Search, Bell, User } from "lucide-react";

export default function GlassDashboard() { 
  return ( 
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6"> {/* Background Glow */} 
    <div className="absolute w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl top-10 left-10" /> 
    <div className="absolute w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-3xl bottom-10 right-10" />

{/* Main Glass Container */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative w-full max-w-6xl rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl p-6"
  >
    {/* Navbar */}
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-semibold text-white tracking-wide">
        WELCOME, OWNER
      </h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
          <Input
            placeholder="Search..."
            className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
          />
        </div>
        <Bell className="text-white/70 cursor-pointer hover:text-white transition" />
        <User className="text-white/70 cursor-pointer hover:text-white transition" />
      </div>
    </div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-3 gap-6">
      {["MANAGE INVENTORY", "SHOP THEMES", "PERFORMANCE"].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Card className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-white mb-2">
                {item}
              </h2>
              <p className="text-white/60 text-sm mb-4">
                Modern seamless glass effect with depth layering
              </p>
              <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 rounded-xl">
                
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Bottom Section */}
    <div className="mt-10 grid md:grid-cols-2 gap-6">
      <Card className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            ANALYTICS
          </h2>
          <div className="h-40 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/40">
            Chart Placeholder
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            NOTIFICATIONS/TRANSACTIONS
          </h2>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="bg-white/5 p-3 rounded-xl backdrop-blur-md border border-white/10">
              New user signed up
            </li>
            <li className="bg-white/5 p-3 rounded-xl backdrop-blur-md border border-white/10">
              Server load optimized
            </li>
            <li className="bg-white/5 p-3 rounded-xl backdrop-blur-md border border-white/10">
              Monthly report generated
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </motion.div>
</div>

); }