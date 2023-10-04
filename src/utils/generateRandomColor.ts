const generateColorFromId = (listId: number | null): string => {
  if (!listId) return "";

  
  const hue = (listId * 50) % 360; // Adjust 20 to control the hue range

  const saturation = 80;
  const lightness = 70;

  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return hslColor;
};

export default generateColorFromId;
