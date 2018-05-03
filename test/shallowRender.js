import ShallowRenderer from 'react-test-renderer/shallow';

export default function shallowRender(component) {
  const renderer = new ShallowRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}
