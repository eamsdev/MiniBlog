import { FC } from 'react';
import { Container, Stack } from 'react-bootstrap';

export const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <Container className="mt-3 profile">
        <Stack gap={3}>
          <div className="photo" />
          <div>
            <div className="name">
              <span>PETE </span>
              <span>EAMS</span>
              <span>UWAN</span>
            </div>
            <div className="title">Fullstack Software Engineer</div>
            <div className="skills">React | Typescript | .Net | Sql</div>
            <div className="social-media">
              <span>
                <a
                  href="https://github.com/eamsdev"
                  className="icon fa fa-github-square"
                  title="See some of my work"
                />
                <a
                  href="https://www.linkedin.com/in/pete-e-339708117/"
                  className="icon fa fa-linkedin-square"
                  title="Lets connect"
                />
                <a href="https://eams.dev" className="icon fa fa-globe" title="My landing page" />
              </span>
            </div>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export const SidebarMobile: FC = () => {
  return <>MobleSidebar content placeholder</>;
};
