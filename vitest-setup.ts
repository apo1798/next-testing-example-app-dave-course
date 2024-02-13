import { expect, afterEach } from 'vitest';

// https://github.com/testing-library/jest-dom?tab=readme-ov-file#with-vitest
import '@testing-library/jest-dom/vitest';

// not needed for importing the `whatwg-fetch` package: solved by msw
// https://github.com/mswjs/msw/issues/1625
// import 'whatwg-fetch';
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// import * as matchers from '@testing-library/jest-dom/matchers';
// type Matchers = typeof matchers;
// declare module 'vitest' {
//   interface Assertion extends Matchers {}
// }
// expect.extend(matchers);
