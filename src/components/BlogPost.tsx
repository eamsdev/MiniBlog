import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

export const BlogPost: FC<PropsWithChildren<BlogHeaderDataProps>> = (
  props: PropsWithChildren<BlogHeaderDataProps>,
) => {
  return (
    <Container>
      <div className="reading-time-container">
        <FontAwesomeIcon icon={faClockFour} />
        <span className="collapsed">Time to read</span>
        <span className="reading-time"> {props.headerData['readtime']}</span>
      </div>
      <div className="blog-post">
        <BlogHeader {...props} />
        <hr className="solid" />
        {props.children && props.children}
      </div>
    </Container>
  );
};

export type BlogHeaderDataProps = {
  headerData: Record<string, string>;
};

export const BlogHeader: FC<BlogHeaderDataProps> = (props: BlogHeaderDataProps) => {
  const { headerData } = props;
  return (
    <div className="blog-header">
      <h1 className="blog-title">{headerData['title']}</h1>
      <div className="blog-description">{headerData['description']}</div>
      <div className="blog-meta">
        <div className="blog-author">By {headerData['author']}</div>
        <div className="blog-date">{headerData['date']}</div>
      </div>
    </div>
  );
};
