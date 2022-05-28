import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tasks" element={<h1>HELLO</h1>} />
      </Routes>
    </>
  );
}

export default App;
