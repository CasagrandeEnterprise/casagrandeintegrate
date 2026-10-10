import assert from "node:assert/strict";
import test from "node:test";
import { loginSchema } from "./login-schema";

test("accepts a normalized administrator login", () => {
  const parsed = loginSchema.safeParse({
    email: "  Admin@Example.com ",
    password: "senha-segura",
  });

  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.email, "admin@example.com");
  }
});

test("rejects an invalid email and a short password", () => {
  const parsed = loginSchema.safeParse({
    email: "nao-e-email",
    password: "curta",
  });

  assert.equal(parsed.success, false);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    assert.ok(errors.email?.length);
    assert.ok(errors.password?.length);
  }
});

test("rejects a password longer than bcrypt can store", () => {
  const parsed = loginSchema.safeParse({
    email: "admin@example.com",
    password: "a".repeat(73),
  });

  assert.equal(parsed.success, false);
});
