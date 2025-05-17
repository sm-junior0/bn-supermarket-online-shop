import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8081/api/purchased';

function Purchased() {
  const [purchased, setPurchased] = useState([]);
  const [form, setForm] = useState({ productCode: '', quantity: '', total: '', date: '' });
  const [editId, setEditId] = useState(null);

  const fetchPurchased = () => {
    axios.get(API).then(res => setPurchased(res.data));
  };

  useEffect(() => { fetchPurchased(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      axios.put(`${API}/${editId}`, form).then(() => {
        setEditId(null);
        setForm({ productCode: '', quantity: '', total: '', date: '' });
        fetchPurchased();
      });
    } else {
      axios.post(API, form).then(() => {
        setForm({ productCode: '', quantity: '', total: '', date: '' });
        fetchPurchased();
      });
    }
  };

  const handleEdit = p => {
    setEditId(p.id);
    setForm({ productCode: p.productCode, quantity: p.quantity, total: p.total, date: p.date });
  };

  const handleDelete = id => {
    axios.delete(`${API}/${id}`).then(fetchPurchased);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Purchase History</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{editId ? 'Edit Purchase' : 'Add New Purchase'}</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
            <input 
              name="total" 
              placeholder="Total Amount" 
              value={form.total} 
              onChange={handleChange} 
              required 
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              name="date" 
              placeholder="Purchase Date" 
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
              {editId ? 'Update Purchase' : 'Add Purchase'}
            </button>
            {editId && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditId(null); 
                  setForm({ productCode: '', quantity: '', total: '', date: '' }); 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchased.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.productCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEdit(p)}
                      className="text-teal-600 hover:text-teal-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
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
  );
}

export default Purchased;
