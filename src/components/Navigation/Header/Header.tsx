import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getAuth, signOut } from 'firebase/auth';

import CartContext from '../../../context/CartContext';

import './Header.scss'
import { AiOutlineLogout } from 'react-icons/ai';

const Header = ({ user }: Record<string, any>) => {
  const { burgers } = useContext(CartContext);

  const auth = getAuth();

  return (
    <header className="Header bg-gray-900 py-2">
      <div className="container mx-auto px-3">
        <nav className="Header__nav flex items-center">
          <div className="Header__logo flex">
            <i className="las la-hamburger text-[34px]"></i>
          </div>

          <ul className="Header__menuList flex gap-3 ml-auto">
            <li className="Header__menuItem flex">
              <Link to="/List" className="Header__menuLink text-white hover:text-teal-600">
                <i className="las la-home la-lg"></i>
              </Link>
            </li>
            <li className="Header__menuItem flex">
              <Link to="/Cart" className="Header__menuLink text-white Header__cartLink">
                <i className="las la-shopping-bag la-lg"></i>
                <span className="Header__cartLink--count text-[14px]">{burgers.length}</span>
              </Link>
            </li>
            <li className="Header__menuItem flex ml-4">
              <button 
                type='button' 
                className="Header__menuLink text-white hover:text-red-600"
                onClick={() => signOut(auth)}
              >
                <AiOutlineLogout size={'22px'} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;