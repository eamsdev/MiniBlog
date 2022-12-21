import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';

export const ThemeToggle: FC = observer(() => {
  return (
    <Form.Group className="d-flex align-items-center justify-content-center">
      <i className="icon fa fa-sun-o me-1 text-warning" />
      <Form.Check
        className="ms-1"
        type="switch"
        onClick={() => rootStore.themeStore.toggleTheme()}
      />
      <i className="icon fa fa-moon-o" style={{ color: 'pink' }} />
    </Form.Group>
  );
});
