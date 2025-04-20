import React, { useEffect } from 'react';
import { GetCurrentUser } from '../api/users';

function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      console.log("Get Current User Response", response);
    }
    fetchUser(); // Call the fetchUser function to get the current user
  },[]);
  
  return (
    <main className='App-header'>
      <section className='mw-500 text-center px-3'>
        <h1>Welcome to BookitNow</h1>
        
      </section>
    </main>
  )
}

export default Home
