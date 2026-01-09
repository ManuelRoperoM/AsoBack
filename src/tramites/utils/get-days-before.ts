export function getDaysBefore(frontera: Date): string[] {
  const days: string[] = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const limit = new Date(frontera);
  limit.setHours(0, 0, 0, 0);

  const cursor = new Date(limit);

  while (cursor < today) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
