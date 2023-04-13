import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useScreen } from 'src/hooks/useScreen';

import DesktopNavigation from './DesktopNavigation';
import MobileNaviagtion from './MobileNaviagtion';

import { AiOutlineStock, AiFillHome } from 'react-icons/ai';
import { BiBitcoin, BiMoney } from 'react-icons/bi';
import { GiMetalBar } from 'react-icons/gi';

export type NavData = {
  icon: JSX.Element;
  label: string;
  path: string;
};

const navData: NavData[] = [
  {
    icon: <AiFillHome className="text-white text-2xl" />,
    label: 'Home',
    path: '/dashboard'
  },
  {
    icon: <BiMoney className="text-white text-2xl" />,
    label: 'Month Cash',
    path: '/month-finance'
  },
  {
    icon: <BiBitcoin className="text-white text-2xl" />,
    label: 'Cryptocurrency',
    path: '/cryptocurrency'
  },
  {
    icon: <AiOutlineStock className="text-white text-2xl" />,
    label: 'Stock',
    path: '/stock'
  },
  {
    icon: <GiMetalBar className="text-white text-2xl" />,
    label: 'Metal',
    path: '/metals'
  }
];

const GlobalNavigation = () => {
  const location = useLocation();
  const { isMobileScreen } = useScreen();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavOpen = () => {
    setIsOpen(!isOpen);
  };

  const activeRoute = (path: string): string => {
    return location.pathname.includes(path) ? 'bg-sky-700' : 'bg-inherit';
  };

  return (
    <>
      {isMobileScreen() ? (
        <MobileNaviagtion
          activeRoute={activeRoute}
          navData={navData}
          handleNavOpen={handleNavOpen}
          isOpen={isOpen}
        />
      ) : (
        <DesktopNavigation
          activeRoute={activeRoute}
          navData={navData}
          handleNavOpen={handleNavOpen}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default GlobalNavigation;
