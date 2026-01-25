
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlobalSearch } from './GlobalSearch';
import { vi } from 'vitest';

describe('GlobalSearch', () => {
    it('opens on keyboard shortcut', async () => {
        render(<GlobalSearch />);

        // Initial state closed
        expect(screen.queryByPlaceholderText(/Search controls/i)).not.toBeInTheDocument();

        // Fire Cmd+K
        fireEvent.keyDown(document, { key: 'k', metaKey: true });

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Search controls/i)).toBeInTheDocument();
        });
    });

    it('shows recent searches initially', async () => {
        render(<GlobalSearch />);
        fireEvent.keyDown(document, { key: 'k', metaKey: true });

        await waitFor(() => {
            expect(screen.getByText('Recent Searches')).toBeInTheDocument();
        });
    });
});
