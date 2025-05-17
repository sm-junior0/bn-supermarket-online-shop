import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8081/api/cart';

function Cart() {
  const [customerId, setCustomerId] = useState('');
  const [cartId, setCartId] = useState('');
  const [productCode, setProductCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  const createCart = () => {
    axios.post(`${API}/create?customerId=${customerId}`).then(res => {
      setCartId(res.data.id);
      setItems([]);
    });
  };

  const addItem = () => {
    axios.post(`${API}/add-item?cartId=${cartId}&productCode=${productCode}&quantity=${quantity}`).then(() => {
      fetchItems();
      setProductCode('');
      setQuantity('');
    });
  };

  const fetchItems = () => {
    axios.get(`${API}/items/${cartId}`).then(res => setItems(res.data));
  };

  const checkout = () => {
    axios.post(`${API}/checkout?cartId=${cartId}&customerId=${customerId}`).then(() => {
      setCartId('');
      setItems([]);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
            <input 
              placeholder="Enter Customer ID" 
              value={customerId} 
              onChange={e => setCustomerId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <button 
            onClick={createCart}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
          >
            Create Cart
          </button>
        </div>
      </div>
      
      {cartId && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Cart ID: <span className="text-teal-600">{cartId}</span></h3>
              <button 
                onClick={fetchItems}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
              >
                Refresh Items
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
                <input 
                  placeholder="Product Code" 
                  value={productCode} 
                  onChange={e => setProductCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input 
                  placeholder="Quantity" 
                  value={quantity} 
                  onChange={e => setQuantity(e.target.value)} 
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <button 
                  onClick={addItem}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.length > 0 ? (
                    items.map(i => (
                      <tr key={i.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i.productCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No items in cart</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button 
                onClick={checkout}
                className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
