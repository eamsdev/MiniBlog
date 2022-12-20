import { Content } from './Content';
import { ContentBar } from './ContentBar';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <>
      <div className="d-lg-flex flex-row justify-content-between position-relative">
        <Sidebar />
        <Content />
        <ContentBar />
      </div>
      <footer
        className="navbar fixed-bottom w-100 d-flex flex-row align-items-center justify-content-center position-relative shadow-sm"
        style={{ height: '40px', backgroundColor: '#535353', color: '#dee2e6' }}
      >
        <a href="https://github.com/eamsdev" className="fs-6 text-center m-0 link-unstyled">
          👉 Like what you see? check out my github <i className="icon fa fa-github" /> 👈
        </a>
      </footer>
    </>
  );
};

export default App;
