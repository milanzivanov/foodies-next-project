"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./lib/meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

// server action
export async function shareMeal(prevState, formData) {
  console.log(prevState);
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email")
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input."
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
