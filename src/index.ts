import './polyfills';
import App from './components/App.svelte';

const PROJECT_NAME = 'radius-from';
const ROOT_SELECTOR = `[data-${PROJECT_NAME}-root]`;

new App({
  target: document.querySelector(ROOT_SELECTOR)
});
