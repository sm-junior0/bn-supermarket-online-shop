import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8081/api/products';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ code: '', name: '', productType: '', price: '', inDate: '', image: '' });
  const [editCode, setEditCode] = useState(null);

  const fetchProducts = () => {
    axios.get(API).then(res => setProducts(res.data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editCode) {
      axios.put(`${API}/${editCode}`, form).then(() => {
        setEditCode(null);
        setForm({ code: '', name: '', productType: '', price: '', inDate: '', image: '' });
        fetchProducts();
      });
    } else {
      axios.post(API, form).then(() => {
        setForm({ code: '', name: '', productType: '', price: '', inDate: '', image: '' });
        fetchProducts();
      });
    }
  };

  const handleEdit = p => {
    setEditCode(p.code);
    setForm(p);
  };

  const handleDelete = code => {
    axios.delete(`${API}/${code}`).then(fetchProducts);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{editCode ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
            <input 
              name="code" 
              placeholder="Product Code" 
              value={form.code} 
              onChange={handleChange} 
              required 
              disabled={!!editCode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              name="name" 
              placeholder="Product Name" 
              value={form.name} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input 
              name="productType" 
              placeholder="Product Type" 
              value={form.productType} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              name="price" 
              placeholder="Price" 
              value={form.price} 
              onChange={handleChange} 
              required 
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              name="inDate" 
              placeholder="In Date" 
              value={form.inDate} 
              onChange={handleChange} 
              required 
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input 
              name="image" 
              placeholder="Image URL" 
              value={form.image} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <div className="flex items-end space-x-2 md:col-span-2 lg:col-span-3">
            <button 
              type="submit" 
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            >
              {editCode ? 'Update Product' : 'Add Product'}
            </button>
            {editCode && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditCode(null); 
                  setForm({ code: '', name: '', productType: '', price: '', inDate: '', image: '' }); 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(p => (
                <tr key={p.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.productType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.inDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.image && <img src={p.image || "/placeholder.svg"} alt={p.name} className="h-10 w-10 object-cover rounded-md" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEdit(p)}
                      className="text-teal-600 hover:text-teal-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.code)}
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

export default Products;
