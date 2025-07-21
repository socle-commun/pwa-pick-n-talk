import { type PromiseExtended } from "dexie";

import type { User } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Get a user by ID
 */
export function getUser(this: PickNTalkDB, id: string): PromiseExtended<User | undefined> {
  return this.users.get(id);
}

/**
 * Get a user by email address
 */
export function getUserByEmail(this: PickNTalkDB, email: string): PromiseExtended<User | undefined> {
  return this.users.where({ email }).first();
}

/**
 * Create a new user
 */
export function createUser(this: PickNTalkDB, user: User): PromiseExtended<string> {
  return this.users.add(user);
}

/**
 * Update an existing user
 */
export function updateUser(
  this: PickNTalkDB,
  user: User
): PromiseExtended<void> {
  return this.users.update(user.id, user).then(() => {});
}

/**
 * Get all users
 */
export function getAllUsers(this: PickNTalkDB): PromiseExtended<User[]> {
  return this.users.toArray();
}

/**
 * Delete a user
 */
export function deleteUser(this: PickNTalkDB, id: string) {
  return this.users.delete(id);
}
