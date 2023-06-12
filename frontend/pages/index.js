import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export default function Home() {
  const [address, setAddress] = useState('');
  const [nefturian, setNefturian] = useState(null);
  const [statistics, setStatistics] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/search', { address });
    setNefturian(response.data);
  };

  const fetchStatistics = async () => {
    const response = await api.get('/statistics');
    setStatistics(response.data);
  };

  const getClan = () => {
    if (nefturian) {
      const clanAttribute = nefturian.attributes.find((attr) => attr.trait_type === 'Clan');
      return clanAttribute ? clanAttribute.value : 'Lone Wolf';
    }
    return '';
  };

  return (
    <div>
      <h1>Nefturians War</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address"
          required
        />
        <button type="submit">Search</button>
      </form>
      {nefturian && (
        <div>
          <h2>{nefturian.name}</h2>
          <img className='image-nefturian' src={nefturian.image} alt={nefturian.name} />
          <p>Side: {getClan()}</p>
        </div>
      )}
      <button onClick={fetchStatistics}>Fetch Statistics</button>
      {statistics && (
        <div>
          <h2>Army Statistics</h2>
          <p>Cyberians: {statistics.cyberians}</p>
          <p>Samurians: {statistics.samurians}</p>
          <p>Lone Wolves: {statistics.loneWolves}</p>
        </div>
      )}
    </div>
  );
}