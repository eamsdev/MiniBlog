import { Content } from './Content';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="page position-relative">
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
