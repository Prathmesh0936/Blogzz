export const validatePost = (data: { title: string; content: string; imageURL?: string }) => {
  const errors: Record<string, string> = {};
  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }
  if (data.title && data.title.length > 120) {
    errors.title = 'Title must be under 120 characters';
  }
  if (!data.content || data.content.trim().length < 50) {
    errors.content = 'Content must be at least 50 characters';
  }
  if (data.imageURL) {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i;
    if (!urlPattern.test(data.imageURL)) {
      errors.imageURL = 'Image URL must be valid';
    }
  }
  return errors;
};

