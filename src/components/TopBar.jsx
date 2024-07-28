import { useTheme } from './ThemeContext';
import { IoMoonOutline } from 'react-icons/io5';


function TopBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`flex justify-between items-center p-4 shadow-md ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}>
      <h1 className={`text-xl font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}>Where in the world?</h1>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleTheme}>
        {isDarkMode ? (
          <IoMoonOutline className="w-5 h-5 text-black" />
        ) : (
          <IoMoonOutline className="w-5 h-5 text-white" />
        )}
        <span className={isDarkMode ? 'text-black' : 'text-white'}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>
    </div>
  );
}

export default TopBar;