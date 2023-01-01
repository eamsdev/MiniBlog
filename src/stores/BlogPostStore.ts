import { observable, makeObservable, runInAction, toJS, computed, action } from 'mobx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const markdownContext = require.context('../assets/posts', false, /\.md$/, 'lazy');

export class BlogPostStore {
  itemsPerPage = 2;
  @observable currentPage = 0;
  @observable isLoading = true;
  @observable blogPosts: BlogPostModel[] = [];

  constructor() {
    makeObservable(this);
    this.loadPosts();
  }

  private async loadPosts() {
    const getModules = (context: __WebpackModuleApi.RequireContext) => context.keys().map(context);
    const markdownModules: BlogPostModel[] = (await Promise.all(
      getModules(markdownContext),
    )) as BlogPostModel[];

    runInAction(() => {
      this.blogPosts = markdownModules
        .map((x) => new BlogPostModel(x.attributes, x.body))
        .sort(
          (a, b) =>
            dayjs(a.attributes.date, 'DD-MM-YYYY').valueOf() -
            dayjs(b.attributes.date, 'DD-MM-YYYY').valueOf(),
        );
      this.isLoading = false;
    });
  }

  @action
  selectPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getByDate(month: number, year: number) {
    return this.blogPosts.filter((x) => {
      const date = dayjs(x.attributes.date, 'DD-MM-YYYY');
      return date.month() + 1 == month && date.year() == year;
    });
  }

  getByTag(tag: string) {
    return this.blogPosts.filter((x) => x.attributes.tags.includes(tag));
  }

  @computed
  get allTags() {
    const allTags = this.blogPosts
      .map((x) => x.attributes.tags)
      .reduce((acc, value) => acc.concat(value), [])
      .sort();

    return [...new Set(allTags)];
  }

  @computed
  get allTitles(): ArticleTitleModel[] {
    return this.blogPosts
      .map((x) => {
        return {
          title: x.attributes.title,
          id: x.attributes.id,
        };
      })
      .reverse();
  }

  @computed
  get allMonths(): ArticleDateModel[] {
    const allDates = this.blogPosts
      .map((x) => dayjs(x.attributes.date, 'DD-MM-YYYY'))
      .reduce((acc, value) => acc.concat(value), [])
      .reverse()
      .map((x) => {
        return {
          displayDate: x.format('MMMM') + ' ' + x.year(),
          queryString: `${x.month() + 1}-${x.year()}`,
        };
      });

    const uniques = Object.fromEntries(allDates.map((x) => [x.displayDate, x.queryString]));
    const allUniqueDates: ArticleDateModel[] = [];
    for (const key in uniques) {
      const val = uniques[key];
      allUniqueDates.push({
        displayDate: key,
        queryString: val,
      });
    }
    return allUniqueDates;
  }

  @computed
  get pageCount() {
    if (this.blogPosts.length <= this.itemsPerPage) return 0;

    return Math.ceil(this.blogPosts.length / this.itemsPerPage);
  }

  getItemsAtPage(pageNumber: number) {
    const startingIndex = pageNumber * this.itemsPerPage;
    const endingIndex = startingIndex + this.itemsPerPage;
    return this.blogPosts
      .map((x) => toJS(x))
      .reverse()
      .slice(startingIndex, endingIndex);
  }

  getBlogPostById(id: string): NavigableBlogPostModel {
    const currentPostIndex = this.blogPosts.findIndex((x) => x.attributes.id == id);
    if (currentPostIndex == -1) {
      return undefined;
    }

    return {
      currentPost: toJS(this.blogPosts[currentPostIndex]),
      olderPostId:
        currentPostIndex == 0
          ? undefined
          : toJS(this.blogPosts[currentPostIndex - 1]).attributes.id,
      newerPostId:
        currentPostIndex == this.blogPosts.length - 1
          ? undefined
          : toJS(this.blogPosts[currentPostIndex + 1]).attributes.id,
    };
  }
}

export type ArticleTitleModel = {
  title: string;
  id: string;
};

export type ArticleDateModel = {
  displayDate: string;
  queryString: string;
};

export type NavigableBlogPostModel = {
  currentPost: BlogPostModel;
  newerPostId?: string;
  olderPostId?: string;
};

export class BlogPostModel {
  readonly attributes: FrontMatterSchema;
  readonly body: string;

  constructor(attributes: FrontMatterSchema, body: string) {
    this.body = body;
    this.attributes = attributes;
    this.matches.bind(this.matches);
  }

  matches(searchString: string): boolean {
    return (
      this.attributes.title.toLowerCase().includes(searchString.toLowerCase()) ||
      this.attributes.description.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}

export type FrontMatterSchema = {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  date: string | undefined;
  author: string | undefined;
  readtime: string | undefined;
  meta: string | undefined;
  tags: string[] | undefined;
};

const blogPostStore = new BlogPostStore();
export { blogPostStore };
