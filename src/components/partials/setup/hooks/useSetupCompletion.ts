import { useAtom } from "jotai";
import { userAtom } from "@/utils/state/atoms";
import { db } from "@/db";
import type { OnboardingFormData } from "@/db/models/schemas/setup";

export function useSetupCompletion() {
  const [user, setUser] = useAtom(userAtom);

  const completeSetup = async (formData: Partial<OnboardingFormData>) => {
    if (!user) throw new Error("No user found");

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

      // Create the binder
      await db.createBinder({
        id: binderId,
        author: user.id,
        properties: {
          name: { en: formData.binderName },
          description: { en: formData.binderDescription || "" },
        },
        pictograms: pictogramIds,
        users: [user.id],
        isFavorite: false,
      });

      // Update user with the new binder
      const updatedBinders = [...user.binders, binderId];
      await db.updateUser({
        ...user,
        binders: updatedBinders,
      });

      // Update local state
      const updatedUser = {
        ...user,
        binders: updatedBinders,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return { completeSetup };
}
