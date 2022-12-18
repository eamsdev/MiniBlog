import { FC } from 'react';
import { Separator } from './Profile';
import { Stack } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { rootStore } from '../stores/RootStore';

export const ContentBar: FC = () => {
  return (
    <aside className="aside-secondary p-0 text-white min-vh-100">
      <Stack gap={0} className="p-3">
        <ByTags />
        <Separator />
        <ByMonths />
        <Separator />
        <ByArticles />
      </Stack>
    </aside>
  );
};

const ByTags: FC = observer(() => {
  return (
    <>
      <h5>
        <i className="icon fa fa-tag" /> Tags
      </h5>
      <nav className="d-flex flex-column ps-3">
        {rootStore.blogPostStore.allTags.map((x) => (
          <a href={`/articles?tag=${x}`} className="text-white fs-7 pe-auto me-1" key={x}>
            <i className="icon fa fa-tag" /> {x}
          </a>
        ))}
      </nav>
    </>
  );
});

const ByMonths: FC = () => {
  return (
    <>
      <h5>
        <i className="icon fa fa-calendar" /> Histories
      </h5>

      <nav className="d-flex flex-column ps-3">
        {rootStore.blogPostStore.allMonths.map((x) => (
          <a
            href={`/articles?date=${x.queryString}`}
            className="text-white fs-7 pe-auto me-1"
            key={x.queryString}
          >
            <i className="icon fa fa-tag" /> {x.displayDate}
          </a>
        ))}
      </nav>
    </>
  );
};

const ByArticles: FC = () => {
  return (
    <>
      <h5>
        <i className="icon fa fa-book" /> Articles
      </h5>

      <nav className="d-flex flex-column ps-3">
        {rootStore.blogPostStore.allTitles.map((x) => (
          <a href={`/article/${x.id}`} className="text-white fs-7 pe-auto me-1" key={x.id}>
            <i className="icon fa fa-tag" /> {x.title}
          </a>
        ))}
      </nav>
    </>
  );
};
