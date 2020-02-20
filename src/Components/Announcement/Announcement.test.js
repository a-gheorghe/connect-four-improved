import React from 'react';
import Announcement from './Announcement';
import { render } from '@testing-library/react'


test('renders Announcement with no content if game is not over', () => {
    const {getByRole} = render(
        <Announcement />
    )
    const alert = getByRole('alert')
    expect(alert.firstChild).toBeEmpty()
});