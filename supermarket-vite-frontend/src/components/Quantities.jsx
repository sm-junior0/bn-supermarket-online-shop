"use client"

import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:8081/api/quantities"

function Quantities() {
  const [quantities, setQuantities] = useState([])
  const [form, setForm] = useState({ productCode: "", quantity: "", operation: "", date: "" })
  const [editId, setEditId] = useState(null)

  const fetchQuantities = () => {
    axios.get(API).then((res) => setQuantities(res.data))
  }

  useEffect(() => {
    fetchQuantities()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      axios.put(`${API}/${editId}`, form).then(() => {
        setEditId(null)
        setForm({ productCode: "", quantity: "", operation: "", date: "" })
        fetchQuantities()
      })
    } else {
      axios.post(API, form).then(() => {
        setForm({ productCode: "", quantity: "", operation: "", date: "" })
        fetchQuantities()
      })
    }
  }

  const handleEdit = (q) => {
    setEditId(q.id)
    setForm({ productCode: q.productCode, quantity: q.quantity, operation: q.operation, date: q.date })
  }

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`).then(fetchQuantities)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {editId ? "Edit Inventory Entry" : "Add Inventory Entry"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
            <input
              name="productCode"
              placeholder="Product Code"
              value={form.productCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
            <select
              name="operation"
              value={form.operation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Operation</option>
              <option value="add">Add</option>
              <option value="remove">Remove</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              name="date"
              placeholder="Date"
              value={form.date}
              onChange={handleChange}
              required
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-end space-x-2 md:col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            >
              {editId ? "Update Entry" : "Add Entry"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null)
                  setForm({ productCode: "", quantity: "", operation: "", date: "" })
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quantities.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.productCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        q.operation === "add" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {q.operation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(q)}
                      className="text-teal-600 hover:text-teal-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Quantities
