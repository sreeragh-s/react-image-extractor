type RGBColor = [number, number, number];
type HexColor = string;
type HSLColor = [number, number, number];
type ColorFormat = 'rgb' | 'hex' | 'hsl';


const rgbToHex = ([r, g, b]: RGBColor): HexColor => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};


const rgbToHsl = ([r, g, b]: RGBColor): HSLColor => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};


export const getColors = (imageUrl: string, numberOfColors: number = 5, colorFormat: ColorFormat = 'rgb'): Promise<(RGBColor | HexColor | HSLColor)[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; 
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not create 2D context'));
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colorCount = new Map<string, number>();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgb = `${r},${g},${b}`;
        colorCount.set(rgb, (colorCount.get(rgb) || 0) + 1);
      }
      const sortedColors = Array.from(colorCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, numberOfColors) 
        .map(([color]) => color.split(',').map(Number) as RGBColor);
      const formattedColors = sortedColors.map((color) => {
        switch (colorFormat) {
          case 'hex': return rgbToHex(color);
          case 'hsl': return rgbToHsl(color);
          case 'rgb':
          default: return color;
        }
      });
      resolve(formattedColors);
    };
    img.onerror = () => {
      reject(new Error('Failed to load the image.'));
    };
  });
};