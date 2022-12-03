import { FC } from 'react';
import { BlogPost } from './BlogPost';
import fm from '../assets/posts/test-blog-post.md';
import { StylisedMarkdown } from './StylisedMarkdown';

export const MainContent: FC = () => {
  return (
    <div className="content">
      <BlogPost headerData={fm.attributes}>
        <StylisedMarkdown markdown={fm.body} />
      </BlogPost>
    </div>
  );
};
