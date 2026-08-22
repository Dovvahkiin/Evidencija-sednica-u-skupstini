export const genericCatchBlock = (res, error) => {
  console.error(error);
  return res.status(500).json({ message: "Internal server error", error });
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
