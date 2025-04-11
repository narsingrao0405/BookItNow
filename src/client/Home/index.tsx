import React, { useEffect } from 'react';
import { GetCurrentUser } from '../api/users';

function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetCurrentUser();
    }
    fetchUser(); // Call the fetchUser function to get the current user
  },[]);
  
  return (
    <div>
      <h1>Wel Come to Book It Now Home Page</h1>
    </div>
  )
}

export default Home
