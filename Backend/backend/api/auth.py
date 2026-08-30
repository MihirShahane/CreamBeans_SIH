"""Supabase Auth integration for FastAPI.

Authentication is delegated to Supabase Auth. FastAPI only validates the
Supabase access token and exposes the authenticated user to protected routes.
No auth or contact data is passed into the AI module.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from backend.database.supabase_client import get_client

bearer = HTTPBearer(auto_error=False)


def get_current_auth_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
) -> dict:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Supabase access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        response = get_client().auth.get_user(credentials.credentials)
        user = getattr(response, "user", None)
        if user is None:
            raise ValueError("Supabase returned no authenticated user")
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Supabase access token: {exc}",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    return {
        "id": user.id,
        "email": user.email,
        "phone": getattr(user, "phone", None),
    }
