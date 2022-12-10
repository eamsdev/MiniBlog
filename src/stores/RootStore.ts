import { liveSearchStore } from './LiveSearchStore';
import { blogPostStore } from './BlogPostStore';
import { navUiStore } from './UiStore';
export const rootStore = {
  uiStore: navUiStore,
  blogPostStore: blogPostStore,
  liveSearchStore: liveSearchStore,
};
