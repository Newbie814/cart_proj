// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useGlobalContext } from './components/contexts/context';

function App() {
  const { loading } = useGlobalContext();
  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading'></div>
      </div>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
