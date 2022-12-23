import { observable, makeObservable, runInAction, toJS, computed, action } from 'mobx';
import moment from 'moment';

const markdownContext = require.context('../assets/posts', false, /\.md$/);

export class BlogPostStore {
  itemsPerPage = 2;
  @observable currentPage = 0;
  @observable blogPosts: BlogPostModel[] = [];

  constructor() {
    makeObservable(this);
    this.loadPosts();
  }

  @action
  selectPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getByDate(month: number, year: number) {
    return this.blogPosts.filter((x) => {
      const momentDate = moment(x.attributes.date, 'DD-MM-YYYY');
      return momentDate.month() == month && momentDate.year() == year;
    });
  }

  getByTag(tag: string) {
    return this.blogPosts.filter((x) => x.attributes.tags.includes(tag));
  }

  @computed
  get allTags() {
    const allTags = this.blogPosts
      .map((x) => x.attributes.tags)
      .reduce((acccum, value) => acccum.concat(value), [])
      .sort();

    return [...new Set(allTags)];
  }

  @computed
  get allTitles(): ArticleTitleModel[] {
    return this.blogPosts.map((x) => {
      return {
        title: x.attributes.title,
        id: x.attributes.id,
      };
    });
  }

  @computed
  get allMonths(): ArticleDateModel[] {
    const allDates = this.blogPosts
      .map((x) => x.attributes.date)
      .reduce((acccum, value) => acccum.concat(value), [])
      .map((x) => moment(x, 'DD-MM-YYYY'))
      .sort((a, b) => a.valueOf() - b.valueOf())
      .reverse()
      .map((x) => {
        return {
          displayDate: x.format('MMMM') + ' ' + x.year(),
          queryString: `${x.month()}-${x.year()}`,
        };
      });

    return allDates;
  }

  @computed
  get pageCount() {
    if (this.blogPosts.length <= this.itemsPerPage) return 0;

    return Math.ceil(this.blogPosts.length / this.itemsPerPage);
  }

  getItemsAtPage(pageNumber: number) {
    const startingIndex = pageNumber * this.itemsPerPage;
    const endingIndex = startingIndex + this.itemsPerPage;
    return this.blogPosts.slice(startingIndex, endingIndex).map((x) => toJS(x));
  }

  getBlogPostById(id: string): NavigatableBlogPostModel {
    const currentPostIndex = this.blogPosts.findIndex((x) => x.attributes.id == id);
    if (currentPostIndex == -1) {
      return undefined;
    }

    return {
      currentPost: toJS(this.blogPosts[currentPostIndex]),
      newerPostId:
        currentPostIndex == 0
          ? undefined
          : toJS(this.blogPosts[currentPostIndex - 1]).attributes.id,
      olderPostId:
        currentPostIndex == this.blogPosts.length - 1
          ? undefined
          : toJS(this.blogPosts[currentPostIndex + 1]).attributes.id,
    };
  }

  private async loadPosts() {
    const getModules = (context: __WebpackModuleApi.RequireContext) =>
      context.keys().map(context) as BlogPostModel[];
    const markdownModules: BlogPostModel[] = getModules(markdownContext);

    runInAction(() => {
      this.blogPosts = markdownModules.map((x) => new BlogPostModel(x.attributes, x.body));
    });
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

export type NavigatableBlogPostModel = {
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
