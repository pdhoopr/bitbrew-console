import diff from 'jest-diff';

export default function getComponentDiff(baseComponent, compareComponent) {
  const componentDiff = diff(baseComponent, compareComponent, {
    aAnnotation: `<BaseComponent />`,
    bAnnotation: `<CompareComponent />`,
    contextLines: 3,
    expand: false,
  });
  return `Component Diff:\n${componentDiff}`;
}
