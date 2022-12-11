import { observer } from 'mobx-react';
import { FC, PropsWithChildren } from 'react';
import ReactPaginate from 'react-paginate';
import { LiveSearch } from './LiveSearch';

export type PaginationProps = {
  onPageSelected: (page: number) => void;
  pageCount: number;
  currentPage: number;
};

export const PaginationWrapper: FC<PropsWithChildren<PaginationProps>> = observer((props) => {
  return (
    <>
      <div className="top-pagination d-flex justify-content-between flex-wrap w-100">
        <LiveSearch />
        <Pagination {...props} />
      </div>
      {props.children}
      <div className="bottom-pagination d-flex justify-content-end w-100">
        <Pagination {...props} />
      </div>
    </>
  );
});

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
      pageRangeDisplayed={5}
      pageCount={props.pageCount}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      forcePage={props.currentPage}
    />
  );
});
