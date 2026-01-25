
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIAssistantChat } from './AIAssistantChat';
import { vi } from 'vitest';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('AIAssistantChat', () => {
    it('renders initial greeting', () => {
        render(<AIAssistantChat open={true} onOpenChange={() => { }} />);
        expect(screen.getByText(/Hello! I'm your GRC Assistant/i)).toBeInTheDocument();
    });

    it('sends a user message and receives a response', async () => {
        render(<AIAssistantChat open={true} onOpenChange={() => { }} />);

        const input = screen.getByPlaceholderText(/Ask about risks/i);
        const sendBtn = screen.getByRole('button', { name: /send message/i });

        fireEvent.change(input, { target: { value: 'Show me critical vulnerabilities' } });
        fireEvent.click(sendBtn); // Or fireEvent.keyDown(input, { key: 'Enter' })

        expect(screen.getByText('Show me critical vulnerabilities')).toBeInTheDocument();

        // Wait for mock response
        await waitFor(() => {
            expect(screen.getByText(/I found 3 critical/i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});
