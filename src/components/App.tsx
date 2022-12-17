import { Content } from './Content';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="position-relative">
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
