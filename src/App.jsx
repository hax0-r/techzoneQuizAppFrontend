import './App.css';
import Navbar from './Components/Navbar';
import Router from './Router/Router';
import { QuizProvider } from './Context/QuizContext';
import { MainProvider } from './Context/MainContext';

function App() {
  return (
    <MainProvider>
      <QuizProvider>
        <Navbar />
        <Router />
      </QuizProvider>
    </MainProvider>
  );
}

export default App;
