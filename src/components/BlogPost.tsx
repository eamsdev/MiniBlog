import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { FrontMatterSchema } from 'stores/BlogPostStore';

export const BlogPost: FC<PropsWithChildren<BlogFrontMatterProps>> = (
  props: PropsWithChildren<BlogFrontMatterProps>,
) => {
  return (
    <Container className="blog-post-container">
      <div className="reading-time-container">
        <FontAwesomeIcon icon={faClockFour} />
        <span className="collapsed">Time to read</span>
        <span className="reading-time"> {props.frontMatter.readtime}</span>
      </div>
      <div className="blog-post">
        <BlogHeader {...props} />
        <hr className="solid" />
        {props.children && props.children}
      </div>
    </Container>
  );
};

export type BlogFrontMatterProps = {
  frontMatter: FrontMatterSchema;
};

export const BlogHeader: FC<BlogFrontMatterProps> = (props: BlogFrontMatterProps) => {
  const { frontMatter: headerData } = props;
  return (
    <div className="blog-header">
      <h1 className="blog-title">{headerData.title}</h1>
      <div className="blog-description">{headerData.description}</div>
      <div className="blog-meta">
        <span className="collapsed">Published&nbsp;</span>
        <span className="blog-author">by {headerData.author}</span>
        <span className="blog-date collapsed">&nbsp;at {headerData.date}</span>
      </div>
    </div>
  );
};
