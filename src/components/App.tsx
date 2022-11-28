import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <MainContent />
      </div>
    </div>
  );
};

export default App;
