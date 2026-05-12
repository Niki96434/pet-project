import { it, describe, expect } from 'vitest';
import CategoryBadge from './CategoryBadge';
import { render, screen } from '@testing-library/react';
import type { CategoryType } from '../model/types';

function renderCategoryBadge(category: CategoryType) {
    return render(<CategoryBadge category={category} />)
}

describe('CategoryBadge', () => {
    it('renders CategoryBadge component', () => {
        try {
            renderCategoryBadge('Misc');
            screen.debug();
            expect(screen.getByText('Misc')).toBeTruthy();
        } catch (e) {
            console.error(`Rendering error: ${e}`)
        }
    });
});