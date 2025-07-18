import { useAtom } from "jotai";
import { userAtom } from "@/utils/state/atoms";
import { db } from "@/db";
import type { OnboardingFormData } from "@/db/models/schemas/setup";

export function useSetupCompletion() {
  const [user, setUser] = useAtom(userAtom);

  const completeSetup = async (formData: Partial<OnboardingFormData>) => {
    const createdUserIds: string[] = [];

    // Create caregiver account if provided
    if (formData.caregiver) {
      const caregiverId = crypto.randomUUID();
      const caregiverUser = {
        id: caregiverId,
        name: formData.caregiver.name || "",
        email: formData.caregiver.email || "",
        hash: formData.caregiver.password || undefined,
        role: "caregiver" as const,
        settings: {
          enableNotifications: formData.enableNotifications || true,
          preferredLanguage: formData.preferredLanguage || "en",
          enableSounds: formData.enableSounds || true,
        },
        binders: [],
      };

      await db.createUser(caregiverUser);
      createdUserIds.push(caregiverId);

      // If no current user, set caregiver as the current user
      if (!user) {
        localStorage.setItem("user", JSON.stringify(caregiverUser));
        setUser(caregiverUser);
      }
    }

    // Create user accounts
    if (formData.users && formData.users.length > 0) {
      for (const userData of formData.users) {
        const userId = crypto.randomUUID();
        const newUser = {
          id: userId,
          name: userData.name || "",
          email: userData.email || "",
          hash: userData.password || undefined,
          role: "user" as const,
          settings: {
            enableNotifications: formData.enableNotifications || true,
            preferredLanguage: formData.preferredLanguage || "en",
            enableSounds: formData.enableSounds || true,
          },
          binders: [],
        };

        await db.createUser(newUser);
        createdUserIds.push(userId);
      }
    }

    // Create binder if data exists
    if (formData.binderName) {
      const binderId = crypto.randomUUID();
      const categoryIds: string[] = [];

      // Create categories first
      if (formData.binderCategories && formData.binderCategories.length > 0) {
        for (const category of formData.binderCategories) {
          const categoryId = crypto.randomUUID();
          await db.createCategory({
            id: categoryId,
            properties: {
              name: { en: category.name },
            },
            pictograms: category.pictograms || [],
          });
          categoryIds.push(categoryId);
        }
      }

      // Create pictograms
      const pictogramIds: string[] = [];
      if (formData.binderPictograms && formData.binderPictograms.length > 0) {
        for (let i = 0; i < formData.binderPictograms.length; i++) {
          const pictogramId = formData.binderPictograms[i];
          const newPictogramId = crypto.randomUUID();
          await db.createPictogram({
            id: newPictogramId,
            binder: binderId,
            isFavorite: false,
            order: i,
            properties: {
              name: { en: pictogramId },
            },
            categories: categoryIds,
          });
          pictogramIds.push(newPictogramId);
        }
      }

      // Determine which users should have access to the binder
      const binderUsers = formData.binderAssignedUsers && formData.binderAssignedUsers.length > 0
        ? formData.binderAssignedUsers
        : createdUserIds; // Default to all created users

      // Create the binder
      const currentUser = user || (formData.caregiver ? { id: createdUserIds[0] } : null);
      if (currentUser) {
        await db.createBinder({
          id: binderId,
          author: currentUser.id,
          properties: {
            name: { en: formData.binderName },
            description: { en: formData.binderDescription || "" },
          },
          pictograms: pictogramIds,
          users: binderUsers,
          isFavorite: false,
        });

        // Update all assigned users with the new binder
        for (const userId of binderUsers) {
          const existingUser = await db.getUser(userId);
          if (existingUser) {
            const updatedBinders = [...existingUser.binders, binderId];
            await db.updateUser({
              ...existingUser,
              binders: updatedBinders,
            });

            // Update local state if this is the current user
            if (user && user.id === userId) {
              const updatedUser = {
                ...user,
                binders: updatedBinders,
              };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setUser(updatedUser);
            }
          }
        }
      }
    }
  };

  return { completeSetup };
}
