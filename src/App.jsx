import './App.css';
import Navbar from './Components/Navbar';
import Router from './Router/Router';
import { QuizProvider } from './Context/QuizContext';
import { MainProvider } from './Context/MainContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <MainProvider>
      <QuizProvider>
        <Navbar />
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
/>
        <ToastContainer />
      </QuizProvider>
    </MainProvider>
  );
}

export default App;
