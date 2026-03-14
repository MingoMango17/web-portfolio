export async function revalidateSite() {
  await fetch("/api/revalidate", { method: "POST" });
}
