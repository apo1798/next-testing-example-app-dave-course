import { render } from '@testing-library/react';
import { TestPage } from './page';

it('test', async () => {
  render(await TestPage());
});
