export const MAX_FAILED_LOGINS = 5;
export const LOCK_DURATION_MS = 15 * 60 * 1000;

export function isAccountLocked(lockedUntil: Date | null, now: Date) {
  return lockedUntil !== null && lockedUntil.getTime() > now.getTime();
}

export function nextFailedLogin(failedLoginCount: number, now: Date) {
  const nextCount = failedLoginCount + 1;

  if (nextCount >= MAX_FAILED_LOGINS) {
    return {
      failedLoginCount: 0,
      lockedUntil: new Date(now.getTime() + LOCK_DURATION_MS),
    };
  }

  return {
    failedLoginCount: nextCount,
    lockedUntil: null,
  };
}
