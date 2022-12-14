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
    <Container className="profile overflow-hidden">
      <StyledProfileContainer
        showNavbar={rootStore.uiStore.showNavbar}
        className="profile-collapse"
      >
        <Stack gap={3} className="p-3">
          <div className="photo-container d-flex flex-row alignt-items-center justify-content-center">
            <div className="photo w-auto h-auto rounded-circle" />
          </div>
          <div>
            <div className="name fw-bold text-center fs-2">
              <span>PETE </span>
              <span>EAMS</span>
              <span>UWAN</span>
            </div>
            <div className="title text-center">Fullstack Software Engineer</div>
            <div className="fst-italic text-center mt-0">React | Typescript | .Net | Sql</div>
            <div className="social-media text-center">
              <span>
                <a
                  href="https://github.com/eamsdev"
                  className="icon fa fa-github-square text-decoration-none"
                  title="See some of my work"
                />
                <a
                  href="https://www.linkedin.com/in/pete-e-339708117/"
                  className="icon fa fa-linkedin-square text-decoration-none"
                  title="Lets connect"
                />
                <a
                  href="https://eams.dev"
                  className="icon fa fa-globe text-decoration-none"
                  title="My landing page"
                />
              </span>
            </div>
          </div>
        </Stack>
      </StyledProfileContainer>
    </Container>
  );
});
