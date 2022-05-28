import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/home';
import Web3 from 'web3/dist/web3.min';
import { MainLayout } from './layout';

function App() {
  useEffect(() => {
    if (window.ethereum) {
      /* window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts: string[]) => {
          console.log(accounts);
        })*/

      const web3 = new Web3(window.ethereum);
      web3.eth.requestAccounts().then((accounts: string[]) => {});
    }
  }, []);

  return (
    <MainLayout>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tasks" element={<h1>HELLO</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
