
import React  from 'react';
import TeamSelection from './components/home/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';

const App=()=> {
  return (
    
    <div className="App body-style">
      <Container style={{padding:"2rem 0 0rem 0"}}>
      <TeamSelection />
      </Container>
    </div>
    
  );
}

export default App;
