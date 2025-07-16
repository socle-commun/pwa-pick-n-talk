# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### ♻️ Refactored - Database Schema Clarity Improvements

#### Architecture Changes
- **BREAKING**: Renamed `@/db/entities` folder to `@/db/models`
- **BREAKING**: Moved models from `@/db/entities/data` to `@/db/models` root
- **BREAKING**: Removed `@/db/entities/translated` folder and all translation entities
- **BREAKING**: Removed `Translation.ts` model and `translations` table from database
- **BREAKING**: Renamed `@/db/lib` folder to `@/db/queries`

#### Database Schema Changes
- **BREAKING**: Changed database name from "PickNTalkDB" to "pick-n-talk"
- **BREAKING**: Reset to clean version 1 schema without translations table
- **BREAKING**: Updated indexing to use proper field names and important properties
- **BREAKING**: Removed all translation-related functionality

#### Model Interface Changes
- **BREAKING**: Renamed all `uuid` fields to `id` across all models
- **BREAKING**: `Binder` interface changes:
  - Renamed `icon` property to `image`
  - Added `isFavorite` boolean property
- **BREAKING**: `Category` interface changes:
  - Renamed `icon` property to `image` (now optional)
- **BREAKING**: `Pictogram` interface changes:
  - Reordered properties to have `properties` before join fields
- **BREAKING**: `User` interface changes:
  - Removed duplicate `password` property (kept `hash`)
  - Added `object` to possible types for `settings` property
  - Added `binders: string[]` property for binder relationships

#### Translation System Changes
- **BREAKING**: Removed complex translation table system
- **FEATURE**: Implemented simplified translation using `properties` field
- **FEATURE**: Added `TranslatedBinder`, `TranslatedCategory`, `TranslatedPictogram` interfaces
- **FEATURE**: Added translation query functions for backward compatibility

#### Documentation
- **FEATURE**: Added comprehensive JSDoc comments to all model files
- **FEATURE**: Created this changelog to track changes
- **FEATURE**: Updated database architecture documentation

#### Query System
- **BREAKING**: Removed all functions referencing translated entities
- **FEATURE**: Cleaned and simplified query functions
- **FEATURE**: Updated all database queries to use new model structure
- **FEATURE**: Added backward-compatible translation query functions

### Why These Changes Were Made

1. **Clarity**: The previous translation system was overly complex for the use case
2. **Simplicity**: Moving to a property-based translation system is more maintainable
3. **Performance**: Removing the translation table reduces database complexity
4. **Maintainability**: Clearer folder structure and naming conventions
5. **Flexibility**: The new structure allows for easier future enhancements

### Migration Guide

If you have existing data, you will need to:

1. Back up your existing database
2. The new schema is not backward compatible
3. Rebuild your database with the new structure
4. Migrate translation data to the new property-based system
5. Update any custom code to use `id` instead of `uuid`