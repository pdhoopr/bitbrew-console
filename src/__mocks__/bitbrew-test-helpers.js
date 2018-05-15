import { shallow } from 'enzyme';
import enzymeSerializer from 'enzyme-to-json/serializer';
import diff from 'jest-diff';
import { addSerializer, getSerializers, utils } from 'jest-snapshot';
import styledSerializer from 'jest-styled-components/src/styleSheetSerializer';
import stripAnsi from 'strip-ansi';

const DIFF_HEADER = 'Diff:\n';

export const diffComponents = (baseComponent, compareComponent) => {
  const serializers = getSerializers();
  [styledSerializer, enzymeSerializer].forEach(serializer => {
    if (!serializers.includes(serializer)) {
      addSerializer(serializer);
    }
  });
  const base = `${utils.serialize(shallow(baseComponent))}\n`;
  const compare = `${utils.serialize(shallow(compareComponent))}\n`;
  const changes = diff(base, compare, {
    aAnnotation: `<BaseComponent />`,
    bAnnotation: `<CompareComponent />`,
    contextLines: 3,
    expand: false,
  });
  return `${DIFF_HEADER}${changes}`;
};

export const diffSerializer = {
  test(value) {
    return typeof value === 'string' && value.startsWith(DIFF_HEADER);
  },
  print(value) {
    return stripAnsi(value).trim();
  },
};

export const fixtures = {
  accessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjUxMTUzNTAsImV4cCI6MTU1NjY1MTM1MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.4O-W8aeOOUFU8fkGTAFaAu9D9nK_l61yPomNG1Qkny8',
  orgs: {
    danlaw: {
      id: 'bd006616-3bd2-4783-a84d-b0fa4ed81135',
      properName: 'Danlaw',
    },
    azuga: {
      id: '8d9ec637-f3bb-4c46-83ee-11764d09f0b2',
      properName: 'Azuga',
    },
    bitbrew: {
      id: '94d9b0ca-a758-4502-8dcd-41d883e38714',
      properName: 'BitBrew',
    },
  },
  users: {
    bill: {
      email: 'bill@bitbrew.com',
      name: 'Bill Monaghan',
    },
    cynthia: {
      email: 'cynthia@bitbrew.com',
      name: 'Cynthia Hamilton',
    },
    alex: {
      email: 'bill@bitbrew.com',
      name: 'Alex Li',
    },
  },
};
