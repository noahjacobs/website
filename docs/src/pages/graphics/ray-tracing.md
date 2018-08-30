# Ray Tracing

<img src="/static/images/ray-tracing/mockup.jpg" width="100%" height="100%" />

This details my implementation of a physically-based renderer using a pathracing algorithm. The program generates stunning pictures, utilizing techniques such as ray-scene intersection, acceleration structures, and physically based lighting and materials.

## Ray Generation and Scene Intersection

At a high level, ray generation traces camera rays through a scene; that is, rays originating from the viewer. For this part, the image plane rendered will be constructed from rays and their object intersections. The idea is that if a ray intersects with an object, we calculate the color of points at the intersection, and map these colors to corresponding pixels on the display.

<img src="/static/images/ray-tracing/slide.jpg" width="100%" height="100%" />

The program generates `ns_aa` random rays at different positions for each pixel sample (looped over `ns_aa` samples). Each ray is taken from the origin of the viewer and can be expressed in the form:

`P = o + t * d`, where o is the origin, t is a parameter to reach point P, and d is the direction.

The program transforms the ray from the local object space - a point in the image plane - into the world space through a matrix multiplication. For each ray, we need to detect the first intersection (if there is one) with a primitive object in the scene. Supported primitive types include triangles and spheres.

For triangles, I use the <a href="https://www.wikiwand.com/en/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm" target="_blank">Möller-Trumbore algorithm</a> to test for intersections. Using barycentric coordinates, we have `P = αA + βB + γC`, where `α + β + γ = 1`. Combining this with the ray equation defined above, we can apply <a href="https://www.wikiwand.com/en/Cramer%27s_rule" target="_blank">Cramer's Rule</a> to derive the values `t, α, β, γ` to test if a ray intersects with a triangle. If an intersection does exist, we just need to confirm it is the closest intersection by checking that the value t we derived is between the minimum and maximum t values for the ray.

For spheres, I used equations provided by Professor Ren Ng, outlined here:

<img src="/static/images/ray-tracing/slide2.jpg" width="66%" height="66%" />

Shown below is the normal shading for a few small dae files.

<img src="/static/images/ray-tracing/1.png" width="100%" height="100%" />

<img src="/static/images/ray-tracing/2.png" width="100%" height="100%" />

<img src="/static/images/ray-tracing/3.png" width="100%" height="100%" />


## Bounding Volume Hierarchy

Using a bounding volume hierarchy (BVH), we can accelerate renderings by spatially partitioning primitive objects. Instead of ray tracing each individual primitive, this acceleration structure allows us to test for ray intersection against groups of primitives (axis-aligned planes).

#### BVH Construction Algorithm

The construction algorithm is defined recursively, and takes in a vector of primitives and a max leaf size. When the node is a leaf (base case), we simply return that bounding box and its list of primitives; otherwise, we split along the axis of the largest dimension, which is found by comparing x, y, and z axis values. Then, we partition the primitives into two vectors based on which axis the primitive centroids are on; this simple heuristic for finding the split point is defined as `(bbox.min + bbox.max) / 2`. With these left and right vectors, we can recursively call the construction algorithm, setting nodes accordingly. To prevent an infinite recursion case, I split the vector based on its midpoint if all the primitives are grouped together.

<img src="/static/images/ray-tracing/cow.png" width="100%" height="100%" />

The above screenshot shows a visualization of the bounding volume hierarchy with the scene `../dae/meshedit/cow.dae`. I'll perform speed experiments on this structure.


#### BVH Intersection Algorithm

Using the bounding box construction, we can test if a ray intersects the group of primitives, returning immediately if the ray misses the bounding box, or returning the closest intersection if the node is a leaf (base cases). If the node is not a leaf, we can recursively call the intersect method on the left and right children of the node, updating our structure to keep track of the closer intersection.

#### Results

Shown below are a few large dae files with normal shading that I could *not* render without the acceleration structure. I include the time to render with the BVH algorithm implemented.

<img src="/static/images/ray-tracing/4.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/5.png" width="49.5%" height="49.5%" />

~1.3 seconds to render with 196,608 primitives (left) and ~1.25 seconds to render with 50,801 primitives (right).

<img src="/static/images/ray-tracing/6.png" width="100%" height="100%" />

~2.14 seconds to render with 133,796 primitives (hundreds of thousands of triangles).

<img src="/static/images/ray-tracing/7.png" width="100%" height="100%" />

I performed some rendering speed experiments on the cow scene pictured below for a comparison between running the program with and without the bounding box acceleration structures. Running these experiments on more complex files *rendered* my computer useless, as the acceleration algorithms became necessary for a larger number of primitives.

<img src="/static/images/ray-tracing/cow.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/cow2.png" width="49.5%" height="49.5%" />

Without bounding box:
```
[PathTracer] Input scene file: ../dae/meshedit/cow.dae
[PathTracer] Collecting primitives... Done! (0.0007 sec)
[PathTracer] Building BVH from 5856 primitives... Done! (0.0013 sec)
[PathTracer] Rendering... 100%! (423.8894s)
[PathTracer] BVH traced 1919311 rays.
[PathTracer] Averaged 2733.084174 intersection tests per ray.
```

With bounding box:
```
[PathTracer] Input scene file: ../dae/meshedit/cow.dae
[PathTracer] Collecting primitives... Done! (0.0006 sec)
[PathTracer] Building BVH from 5856 primitives... Done! (0.0349 sec)
[PathTracer] Rendering... 100%! (0.9779s)
[PathTracer] BVH traced 1675921 rays.
[PathTracer] Averaged 4.434365 intersection tests per ray.
```

Without the bounding box hierarchy and intersection algorithm, the program takes 423.8894 seconds to render the image with 5,856 primities; whereas with the BVH algorithm, it performs the rendering in under 1 second (0.9779s). That's a speedup of nearly 433.5! Some important observations worth noting  is that the BVH algorithm traces less rays (1,675,921 vs. 1,919,311 rays) and performs substantially less averaged intersection tests per ray (~4.4 vs. ~2,733.1 tests). This is because if a ray misses the bounding box, we can just return since missing the box means definitely missing all of the primitives inside.

## Direct Illumination

Objects are made of materials that scatter light in different ways. To more accurately capture the effects of lighting on an object's color, we can sample rays while considering incoming radiance. I use two implementations of the direct lighting function. For the first one, I estimate the lighting from an intersection coming directly from the light, and sample uniformly in a hemisphere. This method takes samples in a uniform hemisphere around the point of interest (hit_p), and for each ray that intersects a light source, computes the incoming radiance from that light source, then converts it to the outgoing radiance using the BSDF at the surface, and finally averages across all samples.

For the second method, I implemented importance / lighting sampling, sampling only from lights, not uniformly in a hemisphere. At a high level, imporance sampling sums over every light source in the scene, taking samples from the surface of each light, computing the incoming radiance from those sampled directions, then converting those to outgoing radiance using the BSDF at the surface. Namely, instead of uniformly sampling in a hemisphere, we sample each light directly.

Shown below are some images rendered with direct lighting using hemisphere sampling (left) and importance / lighting sampling (right).

<img src="/static/images/ray-tracing/hemisphere.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/importance.png" width="49.5%" height="49.5%" />

While we can render nice direct lighting effects such as area light shadows and ambient occlusion, albeit without full global illumination, our results from uniform hemisphere sampling (shown above on the left) are quite noisy! Indeed, they converge to the correct result for hemisphere sampling, but lighting sampling drastically reduces noise. Effectively, lighting sampling solves our issue with intersecting with point light sources.

Below I focus on one particular scene and compare the noise levels in soft shadows when rendering with 1, 4, 16, and 64 light rays (shown in order, left to right, top to bottom) and 1 sample per pixel using light sampling, not hemisphere sampling.

<img src="/static/images/ray-tracing/1-1.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/1-4.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/1-16.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/1-64.png" width="49.5%" height="49.5%" />

It's clear from these images that higher light rays correspond to softer shadows.

With 64 light rays and 16 samples per pixel, we can even render the following:

<img src="/static/images/ray-tracing/16-64-2.png" width="56%" height="56%" />
<img src="/static/images/ray-tracing/16-64.png" width="42.5%" height="42.5%" />



## Global Illumination

With direct illumination, we could not see lighting on surfaces where there wasn't a direct path to the light source. With indirect lighting, we can sample rays that bounce off surfaces, illuminating elements of the scene with color. We do this by sampling the BSDF at hit points and recursively tracing a ray in the sample direction. Using a Russian Roulette algorithm, we can terminate the recursion with a certain probability. Measuring these bounces of light colors our scene with indirect lights, which are importantly not as strong as direct light sources, and dissipate with each bounce, but nonetheless contribute to a richer rendering.

Below are some images rendered with global (direct and indirect) illumination:

<img src="/static/images/ray-tracing/global.png" width="98%" height="98%" />
<img src="/static/images/ray-tracing/dragon-global.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing/CBbunny.png" width="49%" height="49%" />

For the following scene, I compare rendered views first with only direct illumination, then with only indirect illumination:

<img src="/static/images/ray-tracing/direct_only.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing/indirect_only.png" width="49%" height="49%" />

The direct illumination image (left) shows only the first ray bounce and the light emitted from the source. It has noticeably dark shadows and the top of the spheres are brightly lit. Meanwhile, the image with indirect illumination shows all the light except for the first ray bounce. Spooky! We can see there's no light directly illuminating the top of the spheres in the image on the right.

For CBbunny.dae, I compare rendered views with max_ray_depth equal to 0, 1, 2, 3, and 100 (shown below in order, left to right, top to bottom):

<img src="/static/images/ray-tracing/m0.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing/m1.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing/m2.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing/m3.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing/m100.png" width="98%" height="98%" />

While we get much richer textures and colors with a higher max_ray_depth, once we get to an order of magnitude around 100, parts of the image become a bit washed out, as seen with the larger image above. This intuitively makes sense, since we continue to sample the dissipating light from ray bounces to a depth of 100.

For the following scene, I compare rendered views with various sample-per-pixel rates, including 1, 2, 4, 8, 16, 64, and 1024 with 4 light rays. Shown below in order, left to right, top to bottom:

<img src="/static/images/ray-tracing/spheres-1.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/spheres-2.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/spheres-4.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/spheres-8.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/spheres-16.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/spheres-64.png" width="49.5%" height="49.5%" />
<img src="/static/images/ray-tracing/spheres-1024.png" width="100%" height="100%" />

Naturally, as we increase the number of samples per pixel, our resolution and image quality increase substantially.

## Adaptive Sampling

For adaptive sampling, I check if pixels have converged, otherwise I continue sampling in the tracing-and-detecting loop. To measure a pixel's convergence, we define a variable `I = 1.96 * sigma / sqrt(n)`, where n is the samples through a pixel. The smaller the value for `I`, the more confidently we can conclude that the pixel has converged; that is, we check for `I <= maxTolerance * u`, where maxTolerance = 0.05, and u is our mean.

With this functionality, we can now show the sample rate of every pixel. Here, we use red and blue colors to represent high and low sampling rates, respectively. Sampling rates are computed as the ratio between the actual number of samples and the maximum number of samples allowed.

In the following scene, I render an image with the maximum number of samples per pixel (2048), 1 sample per light and a max_ray_depth of 5. This shows a good sampling rate image with clearly visible sampling rate difference over various regions and pixels.

<img src="/static/images/ray-tracing/bunny.png" width="100%" height="100%" />

<img src="/static/images/ray-tracing/bunny_rate.png" width="100%" height="100%" />

The sampling rate image above shows how adaptive sampling changes depending on which part of the image we are rendering.


<br>

#### Acknowledgements

- CS 184 Course Staff at UC Berkeley
- Professor Ren Ng

