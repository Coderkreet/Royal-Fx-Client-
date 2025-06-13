import { Outlet } from 'react-router-dom';
import Navbar from '../Components/HomeComponents/Navbar';
import { Footer } from '../Components/HomeComponents/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar/>
      <main style={{backgroundColor:'rgb(17, 24, 39)'}} className=" px-4 py-8">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout; 