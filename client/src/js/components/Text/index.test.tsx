import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Text from '.';

jest.mock('react', () => ({
    ...jest.requireActual('react')
}));

const setup = () => {
    const wrapper = render(<Text color="primary" size="middle" weight="400" tag="h2" transform="uppercase" id="test-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit</Text>);
    const { container } = wrapper;
    const text = container.querySelector('#test-text');
    return {
        wrapper,
        text
    };
};

describe('Text Component', () => {
    it('Snapshot testing', () => {
        const { wrapper } = setup();
        expect(wrapper.asFragment()).toMatchSnapshot();
    });
    it('Changing text content testing', async () => {
        const mock = {
            testValue: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
            testClass: 'text--middle font--400 color--primary font--uppercase ',
            tastTagName: 'H2'
        };
        const { text } = setup();
         
        await waitFor(() => {
            expect((text as any).className).toBe(mock.testClass);
            expect((text as any).textContent).toBe(mock.testValue);
            expect((text as any).tagName).toBe(mock.tastTagName);
        });
    });
});
