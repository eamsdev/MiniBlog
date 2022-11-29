import { MainContent } from './MainContent';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="page">
      <Sidebar />
      <Navbar />
      <MainContent />
    </div>
  );
};

export default App;
