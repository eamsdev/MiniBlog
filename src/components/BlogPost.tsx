import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { FrontMatterSchema } from 'stores/BlogPostStore';

export const BlogPost: FC<PropsWithChildren<BlogFrontMatterProps>> = (
  props: PropsWithChildren<BlogFrontMatterProps>,
) => {
  return (
    <Container className="blog-post-container mt-4 px-lg-2 px-1">
      <div className="reading-time-container fs-7 rounded d-flex flex-row align-items-center px-2 py-2">
        <i className="icon fs-5 fa fa-clock-o d-inline-block text-center align-bottom" />
        <span className="collapsed ps-1 d-inline-block overflow-hidden visible">Time to read</span>
        <span className="reading-time"> {props.frontMatter.readtime}</span>
      </div>
      <div className="blog-post p-lg-4 p-3">
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
      <h1>{headerData.title}</h1>
      <div className="fst-italic">{headerData.description}</div>
      <div className="blog-meta d-flex  fs-7">
        <span className="collapsed d-inline-block overflow-hidden visible">Published&nbsp;</span>
        <span className="blog-author">by {headerData.author}</span>
        <span className="blog-date collapsed d-inline-block overflow-hidden visible">
          &nbsp;at {headerData.date}
        </span>
      </div>
    </div>
  );
};
