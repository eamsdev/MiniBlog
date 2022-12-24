import { TransitionWrapper } from '../components-library/TransitionWrapper';
import { observer } from 'mobx-react';
import { FC, PropsWithChildren } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { LiveSearch } from './LiveSearch';

export class ContentType {
  static NAVIGATION: 'navigation' = 'navigation';
  static PAGINATION: 'pagination' = 'pagination';
}

export type ContentWrapperProps = PaginationProps &
  BlogPostNavigationProps & {
    type: 'pagination' | 'navigation';
    transitionKey: string;
  };

export const ContentWrapper: FC<PropsWithChildren<ContentWrapperProps>> = observer(
  (props: PropsWithChildren<ContentWrapperProps>) => {
    const navigationComponent =
      props.type == 'pagination' ? (
        <TransitionWrapper transitionKey={props.type}>
          <Pagination {...props} />
        </TransitionWrapper>
      ) : (
        <TransitionWrapper transitionKey={props.type}>
          <BlogPostNavigation {...props} />
        </TransitionWrapper>
      );

    return (
      <>
        <nav className="px-2 d-flex flex-md-row flex-column justify-content-between flex-wrap w-100 align-content-center align-items-center">
          <div className="d-flex justify-content-flex-start align-items-center flex-nowrap">
            <Button
              variant="primary"
              onClick={() => {
                props.onPageSelected(0);
              }}
            >
              <i className="icon fa fa-home" />
            </Button>
            <LiveSearch />
          </div>
          {navigationComponent}
        </nav>
        <TransitionWrapper {...props}>{props.children}</TransitionWrapper>
        <nav className="mt-4 px-2 d-flex w-100 justify-content-md-end justify-content-center">
          {navigationComponent}
        </nav>
      </>
    );
  },
);

type BlogPostNavigationProps = {
  onNewerBlogPost: () => void;
  hasNewerBlogPost: boolean;
  onOlderBlogPost: () => void;
  hasOlderBlogPost: boolean;
  blogPostDate: string;
};

const BlogPostNavigation: FC<BlogPostNavigationProps> = observer(
  (props: BlogPostNavigationProps) => {
    return (
      <ButtonGroup className="d-flex align-items-center">
        <Button
          variant="light"
          disabled={!props.hasNewerBlogPost}
          onClick={() => props.onNewerBlogPost()}
        >
          Newer Article
        </Button>
        <div className="date btn btn-light">{props.blogPostDate}</div>
        <Button
          variant="light"
          disabled={!props.hasOlderBlogPost}
          onClick={() => props.onOlderBlogPost()}
        >
          Older Article
        </Button>
      </ButtonGroup>
    );
  },
);

export type PaginationProps = {
  onPageSelected: (page: number) => void;
  pageCount: number;
  currentPage: number;
};

const Pagination: FC<PaginationProps> = observer((props: PaginationProps) => {
  return (
    <ReactPaginate
      className="pagination user-select-none align-items-center m-0"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      nextLabel="Next"
      onPageChange={(evt) => props.onPageSelected(evt.selected)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={0}
      pageCount={props.pageCount}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      forcePage={props.currentPage}
    />
  );
});
