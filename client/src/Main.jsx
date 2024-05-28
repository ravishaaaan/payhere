import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [orderId, setOrderId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:4000/process-order', { order_id: orderId });
      setResponse(result.data);
      setError(null);
    } catch (err) {
      setResponse(null);
      setError(err.response ? err.response.data : 'Error connecting to the server');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="orderId">Order ID:</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {response && <div><pre>{JSON.stringify(response, null, 2)}</pre></div>}
      {error && <div><pre>{JSON.stringify(error, null, 2)}</pre></div>}
    </div>
  );
};

export default Main;
