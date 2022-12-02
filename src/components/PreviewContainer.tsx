/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import fm from '../assets/posts/test-blog-post.md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockFour, faEdit } from '@fortawesome/free-solid-svg-icons';
import { StylisedMarkdown } from './StylisedMarkdown';

export const PreviewContainer: FC = () => {
  console.log(typeof fm.attributes['date']);
  return (
    <Container className="m-5">
      <div className="date-container">
        <div className="date">
          <FontAwesomeIcon icon={faEdit} /> {fm.attributes['date']}
        </div>
      </div>
      <div className="preview-container">
        <div>
          <div className="preview-title">
            <div className="title-card">
              <div className="title">{fm.attributes['title']}</div>
              <div className="description">{fm.attributes['description']}</div>
              {/* <div className="description">{fm.attributes['date']}</div> */}
            </div>
            {/* <div className="title-separator"></div> */}
          </div>
          <div className="title-fade"></div>
          {/* TODO: dynamic import of md files */}
          <StylisedMarkdown markdown={fm.body} />
          <div className="preview-container-bottom-fade"></div>
          {/* <div className="separator"></div> */}
        </div>
      </div>
    </Container>
  );
};
