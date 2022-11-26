import { Col, Container, Row } from 'react-bootstrap';
import { MainContent } from './MainContent';
import { Sidebar, SidebarMobile } from './Sidebar';

export const App = () => {
  return (
    <>
      <Container fluid className="root vh-100">
        <Row className="h-100">
          <Col className="d-none d-sm-block" sm={3} lg={3} xl={2}>
            <Sidebar />
          </Col>
          <Col className="d-xs-none" sm={3} lg={3} xl={2}>
            <SidebarMobile />
          </Col>
          <Col>
            <MainContent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
