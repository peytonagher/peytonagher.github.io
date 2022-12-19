clc
close all

im = imread("image.jpg"); % read image file
size(im); % diplay its image size (pixel numbers)
figure; imshow(im); % display image

im = im2gray(im); % convert image to grayscale
figure; imshow(im);

colorval = uint8(255);

% get coordinates of selected points and display them
[x1, y1] = ginput(1);
[x2, y2] = ginput(1);

text(x1, y1, "point 1 selected");
disp([x1, y1])
text(x2, y2, "point 2 selected");
disp([x2, y2])


% get subimage of points and display the reversed subimage
x1 = uint16(x1);
x2 = uint16(x2);
y1 = uint16(y1);
y2 = uint16(y2);

subimage = im(min(y1, y2) : max(y1, y2), ...
            min(x1, x2) : max(x1, x2));

figure; imshow(colorval - subimage);