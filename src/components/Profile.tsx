import { FC } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { rootStore } from '../stores/RootStore';
import styled from 'styled-components';
import { observer } from 'mobx-react';

type StyledProfileContainerProps = {
  showNavbar: boolean;
};

const StyledProfileContainer = styled.div<StyledProfileContainerProps>`
  @media (max-width: 991.98px) {
    // this is bootstrap large (lg) breakpoint
    // cant reference boostrap media query here zzzz.
    max-height: ${(props) => (!props.showNavbar ? `0` : `600px`)};
`;

export const Profile: FC = observer(() => {
  return (
    <Container className="profile">
      <StyledProfileContainer
        showNavbar={rootStore.uiStore.showNavbar}
        className="profile-collapse"
      >
        <Stack gap={3} className="p-3">
          <div className="photo-container">
            <div className="photo" />
          </div>
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
      </StyledProfileContainer>
    </Container>
  );
});
