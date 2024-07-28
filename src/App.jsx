import CountriesDetails from './components/CountriesDetails'
import Countriess from './components/Countriess'
import { ThemeProvider } from './components/ThemeContext'

import TopBar from './components/TopBar'



function App() {
  return (
    <ThemeProvider>
    <div>
      <TopBar/>
      
      <Countriess/>
    <div>
      <CountriesDetails/>
    </div>
    </div>
    </ThemeProvider>
  )
}
export default App