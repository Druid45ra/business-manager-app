// /frontend/src/pages/Inventory.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Inventory() {
  const { userLocation, isAdmin, isManager } = useAuth();

  return (
    <div>
      <h1>Inventory for {userLocation}</h1>
      <p>This section shows inventory data **only** for the **{userLocation}** branch.</p>
      
      {(isAdmin || isManager) && (
          <Link to="/inventory/add" style={{ display: 'inline-block', padding: '10px', background: 'green', color: 'white', textDecoration: 'none', marginBottom: '20px' }}>
            + Add New Item
          </Link>
        )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>SKU</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Product Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Quantity</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>LOC-{userLocation.slice(0, 3).toUpperCase()}-001</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Sample Product A</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>50</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>9.99</td>
          </tr>
          {/* Real data fetching logic would go here */}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
