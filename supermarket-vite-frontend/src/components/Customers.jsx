import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8081/api/customers';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ firstname: '', phone: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchCustomers = () => {
    axios.get(API).then(res => setCustomers(res.data));
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      axios.put(`${API}/${editId}`, form).then(() => {
        setEditId(null);
        setForm({ firstname: '', phone: '', email: '', password: '' });
        fetchCustomers();
      });
    } else {
      axios.post(API, form).then(() => {
        setForm({ firstname: '', phone: '', email: '', password: '' });
        fetchCustomers();
      });
    }
  };

  const handleEdit = c => {
    setEditId(c.id);
    setForm({ firstname: c.firstname, phone: c.phone, email: c.email, password: c.password });
  };

  const handleDelete = id => {
    axios.delete(`${API}/${id}`).then(fetchCustomers);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customers</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{editId ? 'Edit Customer' : 'Add New Customer'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              name="firstname" 
              placeholder="Full Name" 
              value={form.firstname} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              name="phone" 
              placeholder="Phone Number" 
              value={form.phone} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              name="email" 
              placeholder="Email Address" 
              value={form.email} 
              onChange={handleChange} 
              required
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              name="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div className="flex items-end space-x-2 md:col-span-2">
            <button 
              type="submit" 
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            >
              {editId ? 'Update Customer' : 'Add Customer'}
            </button>
            {editId && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditId(null); 
                  setForm({ firstname: '', phone: '', email: '', password: '' }); 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.firstname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEdit(c)}
                      className="text-teal-600 hover:text-teal-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
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

export default Customers;
