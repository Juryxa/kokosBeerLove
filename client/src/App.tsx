import React from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';

function App() {
  const tabloinfo = {
    title:"Высший дивизион 25 ТУР",
    data: "20:10:2024", 
    day: 'Четверг',
    time: "14:00" ,
    score:"2 - 1"
};
  return (
    <div className="App">
    <MainPage tabloinfo={tabloinfo} />
    </div>
  );
}

export default App;
