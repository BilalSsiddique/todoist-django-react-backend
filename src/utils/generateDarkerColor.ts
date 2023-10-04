const generateDarkerColor = (color: string) => {
  const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (match) {
    const [, hue, saturation, lightness] = match.map(Number);
    const darkerLightness = Math.max(lightness - 40, 0);
    return `hsl(${hue}, ${saturation}%, ${darkerLightness}%)`;
  }
  return "hsl(0, 0%, 50%)"; // Default to gray color
};

export default generateDarkerColor;
