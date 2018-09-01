# Rasterization & Sampling

<p class="description">Computer Graphics</p>

<img src="/static/images/graphics/lion.jpg" width="100%" height="100%" />

In a display, images are represented by thousands of colored pixels that come together to form a cohesive picture. This details my approach to rasterization, a core function in the graphics pipeline to convert input points, lines, and polygons into framebuffer pixel values. One way graphics is related to my interests in deep learning for computer vision is as a rendering step internal to the training step of a neural network.

Here I include features like supersampling, hierarchical transforms, and texture mapping with antialiasing. The result is a functional vector graphics renderer that can take in modified SVG (Scalable Vector Graphics) files, which are widely used on the internet.

## Rasterization

#### Rasterizing Single-Color Triangles

Since triangles form the basic building blocks of most 3D models, we use a special coordinate system to locate points within a traingle relative to its vertices. The first step in mapping a texture onto a triangle is to convert the screen pixel to barycentric coordinates. These coordinates `(α, β, γ)` can be thought of as the weights being assigned to each vertex such that the weighted average of the vertices forms a screen-space coordinate. That is, `(x,y) = αA + βB + γC`. If the point is within the bounding box of the triangle, we fill the pixel in our framebuffer.

```
calculate min_x and max_x among veritces
calculate min_y and max_y among vertices

for every y from min_y to max_y; do
	for every x from min_x to max_x; do
		if insideTriangle(x, y):
			fill_pixel at (x, y)
		end if
	end for
end for
```
I supplement the above pseudocode for basic triangle rasterization by testing if the barycentric coordinates are inside the triangle. We can derive a point `L(x, y)` proportional to the distance from line `L` as `L(x, y) = -(x-x0)(y1-y0)+(y-y0)(x1-x0)`. We can compute the barycentric coordinates as proportional distances.

<img src="/static/images/graphics/slide_021.jpg" width="41.5%" height="41.5%" /><img src="/static/images/graphics/slide_022.jpg" width="50%" height="50%" style="padding-left:1%;" />

We find a point is inside a triangle if `α >= 0 && β >= 0 && γ >= 0`, where `α + β + γ = 1`.

<img src="/static/images/graphics/screenshot_1-31_10-33-46.png" width="100%" height="100%" />

With basic triangle rasterization complete, we can see a png screenshot of `basic/test4.svg` with the default viewing parameters and with the pixel inspector centered on an interesting part of the scene. The grid in the top right shows a type of aliasing known as an artifact that results from when the signal reconstructed from samples is different from the original continuous signal. We can use supersampling to antialias the triangles.


#### Antialiasing Triangles

Supersampling and averaging the sample values allows us to smooth out the pixels shown in the image above. By representing each pixel as a square, and sampling over the subpixels in steps of `1/(sqrt(sample_rate) + 1)`, the triangle edges become noticeably smoother with larger sample rates. I store these samples in a samplebuffer vector, where I look at all of the instance's subpixels and average their colors together to calculate a final color for the pixel. This involves calculating a `pixel_color` by coloring subpixels over `samples_per_side` and averaging. Necessary modifications included averaging for the pixel color and nesting two iterations over `sqrt(sample_rate)` to ultimately fill the proper pixel colors.

Below are png screenshots of `basic/test4.svg` with the default viewing parameters and sample rates 1, 4, and 16.

<img src="/static/images/graphics/screenshot_2-2_13-14-43.png" width="100%" height="100%" />

With sample rate 1.

<img src="/static/images/graphics/screenshot_2-2_13-14-48.png" width="100%" height="100%" />

With sample rate 4.

<img src="/static/images/graphics/screenshot_2-2_13-15-4.png" width="100%" height="100%" />

With sample rate 16.


#### Transforms

Next I implemented three transforms according to the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform" target="_blank">SVG Spec</a>. I created an updated version of `svg/transforms/robot.svg` with cubeman doing something more interesting on the right (dabbing).

<img src="/static/images/graphics/robot.png" width="30%" height="30%" /><img src="/static/images/graphics/my_robot.png" width="30%" height="30%" /><img src="/static/images/graphics/dabbing.jpg" width="30%" height="30%" />

This included the ability to:
- translate
- scale
- rotate

## Sampling

#### Barycentric Coordinates

As mentioned above, barycentric coordinates provide an efficient way of determining whether or not a point `P` lies within a triangle `(A, B, C)`. Note: the following mathematical derivations are equivalent to those explained above, but with different variables. We find the coordinates of point `P` can be expressed with weights and values at vertices that will indicate whether the point falls within the bounding box of a triangle; that is:

`P = A + w1(B - A) + w2(C - A)`

Isolating the weights with respect to `P_x` and `P_y` yields the following:

<img src="/static/images/graphics/derivation.png" width="60%" height="60%" />

We can conclude that point `P` is inside triangle `(A, B, C)` if:
- w1 >= 0, and
- w2 >= 0, and
- (w1 + w2) <= 1

w1 and w2 can be interchanged with α and β, as shown before, where `γ = 1 - α - β` such that we test for `α >= 0 && β >= 0 && γ >= 0`. One problem I encountered here on was that this triangle test works for counterclockwise winding order, but the points provided may not necessarily fit this criterion. In order to handle clockwise winding order, we can test for `α < 0 && β < 0 && γ < 0`, where `α + β + γ = -1`.

<img src="/static/images/graphics/screenshot_2-3_9-27-14.png" width="100%" height="100%" />

At this point we can interpolate the colors at barycentric coordinates, as seen with the png screenshot of `svg/basic/test7.svg` with default viewing parameters and sample rate 1.


#### "Pixel Sampling" for Texture Mapping

By sampling a pixel from the screen space, and finding the corresponding color in the texture space, we can calculate values for texture mapping. Every pixel has a texture coordinate `(u, v)`, which we can use to find the color at the nearest texture point with respect to width and height using nearest sampling. Alternatively, bilinear sampling allows us to interpolate between the four pixels surrounding `(u, v)` to calculate a final texture color. Bilinear sampling is great for smoothing out values in a continous environment, but when the color or texture is discrete, nearest sampling is a preffered approach.

Here is a good example of where bilinear sampling clearly defeats nearest sampling. Shown below on the left is nearest sampling with 1 sample per pixel, and on the right is bilinear sampling with 1 sample per pixel. It is clear to see the continuous lines for longitude and latitude under bilinear sampling.

<img src="/static/images/graphics/screenshot_2-3_14-35-21.png" width="50%" height="50%" /><img src="/static/images/graphics/screenshot_2-3_14-35-23.png" width="50%" height="50%" />

When the texels are spread apart (i.e. the image is low-resolution or magnified), nearest sampling will choose a value that is not as accurate; whereas if the texels are packed together (i.e. the image is high-resolution or minified), there should not be a noticeable difference between the two sampling methods. This is shown below at 1 sample per pixel and 16 samples per pixel.

<img src="/static/images/graphics/screenshot_2-3_14-54-58.png" width="50%" height="50%" /><img src="/static/images/graphics/screenshot_2-3_14-55-0.png" width="50%" height="50%" />

Left: nearest sampling with sampling rate 1. Right: bilinear sampling with sampling rate 1. While nearest sampling here is not as accurate (as shown by the inspector tool in the upper right hand corner), differences between the two sampling methods are only significant up close. A more drastic difference between nearest and bilinear sampling was shown in the previous two images with longitutde and latitude lines.

<img src="/static/images/graphics/screenshot_2-3_14-56-1.png" width="50%" height="50%" /><img src="/static/images/graphics/screenshot_2-3_14-56-11.png" width="50%" height="50%" />

Left: nearest sampling with sampling rate 16. Right: bilinear sampling with sampling rate 16. In this case, we end up with a similar image for both sampling methods. Because we supersample with sampling rate 16, the small averaging on the texture with bilinear pixel interpolation makes little difference compared to averaging with supersamples.


#### "Level Sampling" with Mipmaps for Texture Mapping

In order to texture objects that are distant and close, we need a mipmap as a way to store these textures. Using barycentric coordinates of (x, y), (x + 1, y), and (x, y + 1), we can calculate the mipmap level from texels in texture space. This level sampling allows us to texture objects of varying distances more effectively without having to sample every point. For bilinear levels, I use adjacent levels for linear interpolation. Further, to simplify the amount of code, I modified the trilinear sampling function to take in a level (intead of du, dv) and get two bilinear samples from adjacent levels to compute a weighted sum. 

There was a tradeoff in resolution for trilinear sampling as images appeared blurry when rendered at sampling rate 1. While there was increasing antialiasing power at high sampling rates (e.g. at sampling rate 16), there was a higher demand for memory usage as these processes were computationally expensive. There is also a dropoff in speed for supersampling for zero, nearest, and linear levels. At sampling rate 1, switching between these levels and pixel sampling methods was quick, however, tradeoffs between speed, memory usage, and antialiasing power were particularly noticeable at higher sampling rates. Across the board, linear sampling was the most computationally intensive task, but produced the best results.

The effects of these levels are illustrated below:

<img src="/static/images/graphics/screenshot_2-3_20-46-3.png" width="100%" height="100%" />

Level zero, nearest sampling.

<img src="/static/images/graphics/screenshot_2-3_20-46-4.png" width="100%" height="100%" />

Level zero, linear sampling. This gave the best results in eliminating jaggies.

<img src="/static/images/graphics/screenshot_2-3_20-46-7.png" width="100%" height="100%" />

Nearest level, nearest sampling.

<img src="/static/images/graphics/screenshot_2-3_20-46-8.png" width="100%" height="100%" />

Nearest level, linear sampling.

The image:

<img src="/static/images/graphics/glade.png" width="100%" height="100%" />


#### Acknowledgements

- CS 184 Course Staff at UC Berkeley
- Professor Ren Ng

