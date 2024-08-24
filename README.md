
`react-image-extractor` is a simple npm package for extracting prominent colors from an image. You can get colors in different formats such as RGB, HEX, and HSL. This is useful for generating color palettes or themes from images in web applications.

## Installation

To install `react-image-extractor`, use npm or yarn:

```bash
npm install react-image-extractor
```

or

```bash
yarn add react-image-extractor
```

## Usage

After installing, you can use `getColors` to extract colors from an image URL. Below are examples of how to use the function to get colors in RGB, HEX, and HSL formats.

### Importing the Function

```javascript
import { getColors } from 'react-image-extractor';
```

### Example Code

```javascript
const imageUrl = 'https://example.com/image.jpg';
const numberOfSwatches = 4;

// Get colors in RGB format
getColors(imageUrl, numberOfSwatches, 'rgb')
  .then((colors) => {
    console.log('RGB Colors:', colors);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Get colors in HEX format
getColors(imageUrl, numberOfSwatches, 'hex')
  .then((colors) => {
    console.log('HEX Colors:', colors);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Get colors in HSL format
getColors(imageUrl, numberOfSwatches, 'hsl')
  .then((colors) => {
    console.log('HSL Colors:', colors);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Parameters

- **`imageUrl`**: The URL of the image you want to extract colors from.
- **`numberOfSwatches`**: The number of prominent colors to extract from the image.
- **`format`**: The format of the colors to return. Options are `'rgb'`, `'hex'`, or `'hsl'`.

### Return Value

The function returns a promise that resolves to an array of color values in the specified format.

### Error Handling

In case of an error, such as an invalid URL or network issues, the promise will be rejected with an error message.

## Contributing

Contributions are welcome! Please fork the [Github](https://github.com/sreeragh-s/react-image-extractor) repository and submit a pull request for any features, bug fixes, or enhancements. Make sure to follow the code style and add relevant tests.


## License

This package is licensed under the [MIT License](https://github.com/sreeragh-s/react-image-extractor/blob/main/LICENSE).


