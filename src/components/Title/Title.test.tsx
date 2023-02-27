import React from 'react';
import * as renderer from 'react-test-renderer';
import Title from './Title.tsx';

it('title showing correctly', () => {
    const component = renderer.create(
        <Title />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})