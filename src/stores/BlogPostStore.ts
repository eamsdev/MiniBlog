import { observable, makeObservable, runInAction, toJS, computed, action } from 'mobx';

const markdownContext = require.context('../assets/posts', false, /\.md$/);

export class BlogPostStore {
  itemsPerPage = 1;
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

  getBlogPostById(id: string): NavigatableBLogPostModel {
    const currentPostIndex = this.blogPosts.findIndex((x) => x.attributes.id == id);
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

export type NavigatableBLogPostModel = {
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
      this.attributes.title.includes(searchString) ||
      this.attributes.description.includes(searchString)
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
  tags: string[] | undefined;
};

const blogPostStore = new BlogPostStore();
export { blogPostStore };
