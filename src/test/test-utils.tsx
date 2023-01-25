import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import React from 'react';

import { ThemeProvider } from '@mui/material';
import theme from '@/theme';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const customRender = (ui: React.ReactElement, renderOptions?: Omit<RenderOptions, 'queries'>): RenderResult =>
  render(<Providers>{ui}</Providers>, renderOptions);

export * from '@testing-library/react';

export { customRender as render };
export { render as baseRender };
