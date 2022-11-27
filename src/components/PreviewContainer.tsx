/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import fm from '../assets/posts/test-blog-post.md';
import { StylisedMarkdown } from './StylisedMarkdown';

export const PreviewContainer: FC = () => {
  return (
    <Container>
      <div className="preview-container mt-3">
        <StylisedMarkdown markdown={fm.body} />
        <div className="read-more"></div>
      </div>
    </Container>
  );
};
