import ShallowRenderer from 'react-test-renderer/shallow';

export default function shallow(component) {
  const renderer = new ShallowRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}
