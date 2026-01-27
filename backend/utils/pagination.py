"""
Pagination utilities.
"""
from typing import Generic, TypeVar, List, Any
from pydantic import BaseModel
from math import ceil

T = TypeVar('T')


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response wrapper."""
    
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int
    has_next: bool
    has_previous: bool
    
    class Config:
        from_attributes = True


def paginate(
    items: List[Any],
    total: int,
    page: int = 1,
    page_size: int = 20
) -> PaginatedResponse:
    """
    Create a paginated response.
    
    Args:
        items: List of items for current page
        total: Total number of items
        page: Current page number (1-indexed)
        page_size: Number of items per page
        
    Returns:
        Paginated response
    """
    total_pages = ceil(total / page_size) if page_size > 0 else 0
    
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1
    )
