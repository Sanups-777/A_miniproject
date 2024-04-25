const fs = require('fs');
const Image = require('./models/image'); // Import the Image model

// Read the "nan.jpg" file
fs.readFile('nan.jpg', (err, data) => {
    if (err) {
        console.error('Error reading image file:', err);
        return;
    }

    // Create a new instance of the Image model with the image data and content type
    const image = new Image({
        data: data,
        contentType: 'image/jpeg' // Adjust the content type based on the actual image format
    });

    // Save the image to MongoDB
    image.save((err, savedImage) => {
        if (err) {
            console.error('Error saving image to MongoDB:', err);
            return;
        }
        console.log('Image saved to MongoDB:', savedImage);
    });
});
