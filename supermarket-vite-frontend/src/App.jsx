import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Products from "./components/Products"
import Customers from "./components/Customers"
import Quantities from "./components/Quantities"
import Cart from "./components/Cart"
import Purchased from "./components/Purchased"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-teal-600 font-bold text-xl">KALIM SHOP</span>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-2">
                  <Link
                    to="/products"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                  >
                    Products
                  </Link>
                  <Link
                    to="/quantities"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                  >
                    Quantities
                  </Link>
                  <Link
                    to="/customers"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                  >
                    Customers
                  </Link>
               
                  <Link
                    to="/cart"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                  >
                    Cart
                  </Link>
                  <Link
                    to="/purchased"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                  >
                    Purchases
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden py-3 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                <Link
                  to="/products"
                  className="text-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                >
                  Products
                </Link>
                <Link
                  to="/customers"
                  className="text-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                >
                  Customers
                </Link>
                <Link
                  to="/quantities"
                  className="text-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                >
                  Inventory
                </Link>
                <Link
                  to="/cart"
                  className="text-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                >
                  Cart
                </Link>
                <Link
                  to="/purchased"
                  className="text-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
                >
                  Purchases
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-4">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/quantities" element={<Quantities />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchased" element={<Purchased />} />
            <Route
              path="/"
              element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Inventory Management System</h1>
                  <p className="text-xl text-gray-600 mb-8">Manage your products, customers, and sales in one place</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <Link
                      to="/products"
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h2 className="text-xl font-semibold text-teal-600 mb-2">Products</h2>
                      <p className="text-gray-600">Manage your product catalog</p>
                    </Link>
                    <Link
                      to="/customers"
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h2 className="text-xl font-semibold text-teal-600 mb-2">Customers</h2>
                      <p className="text-gray-600">Manage your customer database</p>
                    </Link>
                    <Link to="/cart" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h2 className="text-xl font-semibold text-teal-600 mb-2">Sales</h2>
                      <p className="text-gray-600">Process orders and track sales</p>
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-500 text-sm">
              © 2025 Kalim shop System. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
