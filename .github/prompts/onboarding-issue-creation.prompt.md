---
mode: agent
---

# Onboarding issue creation prompt

For the sub features below create issues in the repository with the title "[✨] User Onboarding: SUB_FEATURE_NAME: STEP_NAME" where:

- `SUB_FEATURE_NAME` is the name of the sub feature (e.g. "Setup flow" or "Tutorial flow")
- `STEP_NAME` is the name of the step (e.g. "General", "Welcome", "caregiver accounts creation", etc.)

Use the provided descriptions to create the issues with the appropriate labels and milestones.
Use the `body` field to provide a detailed description of the step and its requirements.

## Feature: "User Onboarding"

The feature is split into two sub features:

1. **[Setup flow](#setup-flow)**: The user is taken through multiple steps to create essential starter data for the application
2. **[Tutorial flow](#tutorial-flow)**: The user is shown the different application's features through a dynamic tutorial

---

### Setup flow

The setup will take the user through the process of creating data for the use of the application.
It should present a global completion status and buttons to navigate between the different steps with an emphasis on the next button.
Every step should have a short description explaining why the step is necessary.
All changes should be saved in real time in the IndexedDb (through DexieJS) so that the user can come back to the setup at any time and continue where they left off.
All changes should be logged in the `history` table of the IndexedDb (through DexieJS) so that the user can see what has been changed in the setup process.
The setup should be accessible from the settings page of the application and should be possible to restart at any time.

The setup should be composed of various steps:

1. **Welcome** step

- Does not count towards global setup completion
- Should present the application quickly and tell the user this is the setup phase
- Should create a `history` entry in the `history` table of the IndexedDb (through DexieJS) with the `action` field set to `setupStarted` and the `date` field set to the current date
- Should allow the user to set the global settings for the application (language, colour (dark or light) mode with daltonism options, accessibility settings...)
- Those settings should be saved in real time in the `settings` table of the IndexedDb (through DexieJS)
- Should create a new entry in the `settings` table of the IndexedDb (through DexieJS) with the `tutorial` field set to `true` to setup the tutorial flow coming next once it is done
- Allow to start the setup process

2. **Accounts creation: `caregiver`** step:

- Should allow the user to create possibly multiple accounts for `caregiver` user role
- The form should be a component of it's own which will be reused for user creation and edition
- The password should be optional
- The role is not editable it is `caregiver` for all
- Should allow the user to edit personal settings through the `settings` column of the `users` table for preferred language, colour (dark or light) mode (with daltonism options)...
- The changes should be saved in the `users` table of the IndexedDb (thorough DexieJS)

3. **Accounts creation: `user`** step:

- Should allow the user to create possibly multiple accounts for the `users` user role
- The password should be optional
- The role is not editable it is `user` for all
- Should allow the user to edit personal settings through the `settings` column of the `users` table for preferred language, colour (dark or light) mode (with daltonism options)...

4. **Binder creation** step:

- Should allow the user to create possibly multiple binders
- The form should be a component of it's own which will be reused for binder creation and edition
- The binder should have a name, an author and a description
- The binder should be saved in the `binders` table of the IndexedDb (through DexieJS)
- The user should be able to assign binders to `users` accounts
- The pictograms should also be creatable, editable and saved in real time in the `pictograms` table of the IndexedDb (through DexieJS)
- The categories should also be manageable in the pictogram forms with an autocomplete input and should be saved in real time in the `categories` table of the IndexedDb (through DexieJS)

5. **Finalization** step:

- Should allow the user to review the setup and confirm that everything is correct
- Should allow the user to restart the setup process if needed
- Should allow the user to finish the setup process and go to the application home page
- Should create a `history` entry in the `history` table of the IndexedDb (through DexieJS) with the `action` field set to `setupCompleted` and the `date` field set to the current date once it is done

---

### Tutorial flow

The tutorial flow should be a dynamic tutorial that shows the user how to use the application.
Some steps of the tutorial should happen during the setup flow, while others should happen after the setup is completed.
It should be accessible from the settings page of the application and should be possible to restart at any time.
It should use the application's UI and pages with an overlay presenting the various features of the application.

The tutorial should be composed of various steps:

1. **Welcome** step:

- Should present the application quickly and tell the user this is the tutorial phase
- Should create a `history` entry in the `history` table of the IndexedDb (through DexieJS) with the `action` field set to `tutorialStarted` and the `date` field set to the current date
- Allow to start the tutorial process
- Should explain the home page and its features
- Should explain how the navigation works for the user to know their way around the application

2. **User management** step:

- Should happen during the `caregiver` accounts creation step
- Should explain how to create, edit and delete `caregiver` accounts
- Should explain how to manage personal settings for `caregiver` accounts
- Should explain how to create, edit and delete `user` accounts
- Should explain how to manage personal settings for `user` accounts

3. **Binder management** step:

- Should happen during the binders creation step
- Should explain how to create, edit and delete binders
- Should explain how to assign binders to `users` accounts
- Should explain how to manage pictograms and categories in binders

4. **Finalization** step:

- Should explain how to manage global settings for the application
- Should explain how to restart the setup process if needed
- Should explain how to finish the setup process and go to the application home page
- Should create a `history` entry in the `history` table of the IndexedDb (through DexieJS) with the `action` field set to `tutorialEnded` and the `date` field set to the current date
- Should set the `tutorial` field in the `settings` table of the IndexedDb (through DexieJS) to `false` to end the tutorial flow
