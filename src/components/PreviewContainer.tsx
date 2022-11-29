/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import fm from '../assets/posts/test-blog-post.md';
import { StylisedMarkdown } from './StylisedMarkdown';

export const PreviewContainer: FC = () => {
  return (
    <Container>
      <div className="preview-container m-5">
        <div className="preview-title">
          <div className="title-card">{fm.attributes['title']}</div>
          <div className="title-separator"></div>
        </div>
        <div className="title-fade"></div>
        {/* TODO: dynamic import of md files */}
        <StylisedMarkdown markdown={fm.body} />
        <div className="preview-container-bottom-fade"></div>
        <div className="separator"></div>
      </div>
    </Container>
  );
};
