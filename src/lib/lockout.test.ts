import assert from "node:assert/strict";
import test from "node:test";
import {
  LOCK_DURATION_MS,
  MAX_FAILED_LOGINS,
  isAccountLocked,
  nextFailedLogin,
} from "./lockout";

const now = new Date("2026-10-09T12:00:00.000Z");

test("counts failures until the account locks", () => {
  const beforeLock = nextFailedLogin(MAX_FAILED_LOGINS - 2, now);

  assert.equal(beforeLock.failedLoginCount, MAX_FAILED_LOGINS - 1);
  assert.equal(beforeLock.lockedUntil, null);

  const locked = nextFailedLogin(MAX_FAILED_LOGINS - 1, now);

  assert.equal(locked.failedLoginCount, 0);
  assert.equal(
    locked.lockedUntil?.getTime(),
    now.getTime() + LOCK_DURATION_MS,
  );
});

test("treats a future lock as active and an expired lock as clear", () => {
  assert.equal(
    isAccountLocked(new Date(now.getTime() + 1_000), now),
    true,
  );
  assert.equal(
    isAccountLocked(new Date(now.getTime() - 1_000), now),
    false,
  );
  assert.equal(isAccountLocked(null, now), false);
});
