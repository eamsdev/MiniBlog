import { Content } from './Content';
import { ContentBar } from './ContentBar';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <div className="d-lg-flex flex-row justify-content-between">
      <Sidebar />
      <Content />
      <ContentBar />
    </div>
  );
};

export default App;
