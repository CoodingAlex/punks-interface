import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/home';
import Web3 from 'web3/dist/web3.min';
import { MainLayout } from './layout';
import { Punks } from './views/punks';
import { Punk } from './views/punk';

function App() {
  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.requestAccounts().then((accounts: string[]) => {});
    }
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/punks" element={<Punks />} />
        <Route path="/punks/:tokenId" element={<Punk />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
