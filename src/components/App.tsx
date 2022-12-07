import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="page">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;
