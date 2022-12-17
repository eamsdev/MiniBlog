import { FC } from 'react';
import { Stack } from 'react-bootstrap';
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
    <StyledProfileContainer
      showNavbar={rootStore.uiStore.showNavbar}
      className="container profile overflow-hidden"
    >
      <Stack gap={3} className="p-3">
        <header>
          <picture className="d-flex flex-row alignt-items-center justify-content-center mb-3">
            <div className="photo w-auto h-auto rounded-circle" />
            {/* TODO: use <img /> instead of css */}
          </picture>
          <h1 className="name fw-bold text-center fs-2">
            <span>PETE </span>
            <span>EAMS</span>
            <span>UWAN</span>
          </h1>
          <p className="title fw-bolder text-center mb-0">Fullstack Software Engineer</p>
          <p className="fst-italic text-center mb-0">React | Typescript | .Net | Sql</p>
          <p className="social-media text-center fs-5 mb-0">
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
          </p>
        </header>
      </Stack>
    </StyledProfileContainer>
  );
});
