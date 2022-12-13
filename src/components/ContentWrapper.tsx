import { TransitionWrapper } from '../components-library/TransitionWrapper';
import { observer } from 'mobx-react';
import { FC, PropsWithChildren } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
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
        <div className="top-pagination d-flex justify-content-between flex-wrap w-100">
          <div className="top-pagination-search d-flex justify-content-flex-start align-items-center flex-nowrap">
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
        </div>
        <TransitionWrapper {...props}>
          <Container className="p-0 m-0">{props.children}</Container>
        </TransitionWrapper>
        <div className="bottom-pagination d-flex justify-content-end w-100">
          {navigationComponent}
        </div>
      </>
    );
  },
);

type BlogPostNavigationProps = {
  onNewerBlogPost: () => void;
  hasNewerBlogPost: boolean;
  onOlderBlogPost: (page: number) => void;
  hasOlderBlogPost: boolean;
  blogPostDate: string;
};

const BlogPostNavigation: FC<BlogPostNavigationProps> = observer(
  (props: BlogPostNavigationProps) => {
    return (
      <div className="d-flex align-items-center">
        <ButtonGroup>
          <Button
            variant="light"
            disabled={!props.hasNewerBlogPost}
            onClick={() => props.onNewerBlogPost()}
          >
            Newer Article
          </Button>
          <Button variant="light" disabled={true}>
            {props.blogPostDate}
          </Button>
          <Button
            variant="light"
            disabled={!props.hasOlderBlogPost}
            onClick={() => props.onOlderBlogPost()}
          >
            Older Article
          </Button>
        </ButtonGroup>
      </div>
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
      className="pagination"
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
      pageRangeDisplayed={3}
      pageCount={props.pageCount}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      forcePage={props.currentPage}
    />
  );
});
