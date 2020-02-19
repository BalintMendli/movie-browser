export function setAuth(sessionId, guest) {
  sessionStorage.clear();
  if (guest) sessionStorage.setItem('movie_app_guest_session_id', sessionId);
  else sessionStorage.setItem('movie_app_session_id', sessionId);
}

export function getAuthInfo() {
  const session = sessionStorage.getItem('movie_app_session_id');
  const guestSession = sessionStorage.getItem('movie_app_guest_session_id');
  if (session) return { sessionId: session, guest: false };
  if (guestSession) return { sessionId: guestSession, guest: true };
  return { sessionId: null, guest: null };
}

export function deleteAuth() {
  sessionStorage.clear();
}
