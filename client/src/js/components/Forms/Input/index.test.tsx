import React from 'react';
import {
 render, waitFor
} from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

import Input from '.';

jest.mock('react', () => ({
    ...jest.requireActual('react')
}));

const setup = () => {
    const wrapper = render(
        <Input 
            id="test-input" 
            type="text" 
            label="Test label" 
            classNames={{
                label: 'test-label-class',
                wrapper: 'wrapper-input-class',
                field: 'field-input-class'
            }}
            onChange={() => 'UnitTest'} 
        />
    );
    const { container } = wrapper;
    const input = container.querySelector('#test-input');

    return {
        wrapper, 
        input
    };
};

describe('Input Component', () => {
    it('Snapshot testing', () => {
        const { wrapper } = setup();
        expect(wrapper.asFragment()).toMatchSnapshot();
    });
    it('Changing value testing', async () => {
        const mock = {
            testValue: '9FyD3Mqs9H3Md0P!@0@4'
        };
        const { input } = setup();
        fireEvent.change(input as any, { target: { value: mock.testValue } });

        await waitFor(() => {
            expect((input as any).value).toBe(mock.testValue);
        });
    });
});
