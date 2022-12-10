import { Content } from './Content';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="page">
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
