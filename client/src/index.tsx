import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './js/App';
import './styles/default.sass';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Main />);
