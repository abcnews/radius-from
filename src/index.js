import App from './components/App.svelte';

const PROJECT_NAME = 'radius-from';
const ROOT_SELECTOR = `[data-${PROJECT_NAME}-root]`;

new App({
  target: document.querySelector(ROOT_SELECTOR)
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}
