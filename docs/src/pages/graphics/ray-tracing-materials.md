# Ray Tracing Materials

<p class="description">Computer Graphics</p>

<img src="/static/images/ray-tracing-materials/mockup.jpg" width="100%" height="100%" />

>This details my implementation of more complicated materials, environment lights, and depth of field to my ray tracer.

<img src="/static/images/ray-tracing-materials/final.png" width="100%" height="100%" />

>This stunning gold dragon was rendered with my program, which traced 7.775 billion rays through a thin lens, with ~11.14 intersection tests per ray.

## Mirror and Glass Materials

With reflection and refraction, we can render mirror and glass materials. Below, I show a sequence of six images of scene CBspheres.dae, rendered with max_ray_depth set to 0, 1, 2, 3, 4, 5, and 100. The other settings for each image are 64 samples per pixel and 4 samples per light. As we increase max_ray_depth, we increase the number of times a ray can be reflected or refracted. Note these images are a bit noisy due to the low sampling rate of 64 samples per pixel. The left sphere is a mirror-like material and the right sphere is a glass material.

<img src="/static/images/ray-tracing-materials/1-0.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/1-1.png" width="49%" height="49%" />

With max_ray_depth = 0 (left), this is equivalent to sampling the emitted light. With max_ray_depth = 1 (right), no ray can be reflected or refracted, so the mirror and glass spheres appear dark.

<img src="/static/images/ray-tracing-materials/1-2.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/1-3.png" width="49%" height="49%" />

With max_ray_depth = 2 (left), rays get reflected once on the mirror surface, and the glass surface appears dark. We can even see a small dark glass sphere on the mirror surface, a reflection of the glass surface with max_ray_depth = 2. With max_ray_depth = 3 (right), the glass sphere appears clear as rays get reflected off the mirror sphere. Notably, the glass sphere still appears dark in a reflection on the mirror sphere. There is also more noise in the image since we are only sampling 64 samples per pixel.

<img src="/static/images/ray-tracing-materials/1-4.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/1-5.png" width="49%" height="49%" />

With max_ray_depth = 4 (left), the reflected sphere seen on the mirror surface is now a blue color, as it begins to resemble the clear sphere on the right of the image. With max_ray_depth = 5 (right), we can now see rays from the right sphere get reflected onto the right wall, and a small bright spot appears in the lower right of the image.

<img src="/static/images/ray-tracing-materials/1-100.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/2048.png" width="49%" height="49%" />

With max_ray_depth = 100 (left), we have a much brighter image. I also rendered the image (right) with 2048 samples per pixel, 4 samples per light, and max ray depth equal to 7.


## Microfacet Material

In microfacet materials, we use an alpha value to represent the roughness of the material, which corresponds to how it will reflect light. The higher the alpha value, the rougher the material, which will correspond to more light getting scattered (reflected) in multiple directions. Meanwhile, lower alpha values correspond to a smoother surface. 

Below I show a sequence of 4 images of scene CBdragon_microface_au.dae rendered with alpha (α) set to 0.005, 0.05, 0.25 and 0.5. The other settings are 128 samples per pixel, 1 sample per light, and a max ray depth of 7. 

<img src="/static/images/ray-tracing-materials/0p005.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/0p05.png" width="49%" height="49%" />

<img src="/static/images/ray-tracing-materials/0p25.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/0p5.png" width="49%" height="49%" />

Top left: α = 0.005, top right: α = 0.05, bottom left: α = 0.25, bottom right: α = 0.5.

The lower alpha value of 0.05 in the top right image gives a smoother surface that almost appears mirror-like in the rendering. Given these parameters, it's clear more light gets reflected off the surface and into the scene, contributing to a noisier image.

<img src="/static/images/ray-tracing-materials/CBbunny-hemisphere.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/CBbunny-importance.png" width="49%" height="49%" />

Shown above are two images of scene CBbunny_microfacet_cu.dae rendered using cosine hemisphere sampling (left) and importance sampling (right). The sampling rate is fixed at 64 samples per pixel and 1 sample per light, and the number of bounces is 5. The cosine hemisphere sampling gives a much noisier image compared to importance sampling because it samples some flat angles and results in a spread out sampling, whereas importance sampling distributes samples where light is expected to have a greater effect.


### Aluminium Material

<img src="/static/images/ray-tracing-materials/aluminium.png" width="60%" height="60%" />

Shown above is an image rendered with a different conductor material, aluminimum with α = 0.5. This material is based on wavelengths of 614 nm red (eta = 1.0573, k = 6.5070), 549 nm green (eta = 0.78599, k = 5.8414), and 466 nm blue (eta = 0.53041, k = 4.9541).


## Environment Light

Below is a .exr file converted into .jpg to show the environment map I'm using.

<img src="/static/images/ray-tracing-materials/field.jpg" width="100%" height="100%" />

This is the probability_debug.png file for the .exr file, generated using the save_probability_debug() helper function after initializing my probability distributions:

<img src="/static/images/ray-tracing-materials/probability_debug.png" width="100%" height="100%" />

Using the bunny_unlit.dae scene and my environtment map .exr file, I render two pictures below, one with uniform sampling and one with importance sampling. Each image is rendered using 4 samples per pixel and 64 samples per light.

<img src="/static/images/ray-tracing-materials/uniform1.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/importance1.png" width="49%" height="49%" />

Zooming in we can better compare the noise levels for uniform sphere sampling (left) and importance sampling (right):

<img src="/static/images/ray-tracing-materials/uniform2.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/importance2.png" width="49%" height="49%" />

It's clear that the rendering with uniform sampling introduces more noise. This is primarily because uniform sampling distributes samples equally in all directions for incoming light, while importance sampling assigns each pixel a probability in the environment map based on the flux passing through solid angles. As a result, importance sampling both increases efficiency and the number of samples in regions we are interested in.

Using the bunny_microfacet_cu_unlit.dae scene and my environment may .exr file, I render two pictures below, one with unform sampling and one with importance sampling. Similar to the previous part, each image is rendered using 4 samples per pixel and 64 samples per light.

<img src="/static/images/ray-tracing-materials/uniform3.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/importance3.png" width="49%" height="49%" />

Zooming in we can better compare the noise levels for uniform sphere sampling (left) and importance sampling (right):

<img src="/static/images/ray-tracing-materials/uniform4.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/importance4.png" width="49%" height="49%" />

For the bunny with a microfacet of copper (cu), uniform sampling produces noise around the ear and upper portion of the bunny, while importance sampling captures more light on the bunny.


## Depth of Field

Depth of field refers to the distance from the camera that remains in focus. This can be controlled by aperture and focal length. Smaller aperture diameter (that is, smaller f/stop) corresponds to more depth of field; compartivaely, a larger aperture results in a narrow field of view. Further, by changing focal length, we can either isolate/highlight an image in a scene or bring more of the background into focus. Lower focal lengths correspond to more blur in the background, while higher focal lengths result in a clearer background. Below I show a microfacest BSDF scene of a gold dragon to show off the cool out of focus effects we can achieve with depth of field!

The first sequence of rendered images below shows a "focus stack" where I focus at four visibly different depths through the scene. The aperture size remains fixed at 0.2 and I alter the focal length between 1.0, 1.5, 2.0, and 2.5.

<img src="/static/images/ray-tracing-materials/1-p2.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/1p5-p2.png" width="49%" height="49%" />

<img src="/static/images/ray-tracing-materials/2-p2.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/2p5-p2.png" width="49%" height="49%" />

As the focal length increases with fixed aperture size, we focus at a deeper plane in the scene. Above we can see how the dragon's mouth begins to come into clear view with a focal length of 1.5, and part of the dragon's body and hind leg come into focus with a focal length of 2.0.

The next sequence of four pictures shows visibly different aperture sizes, all focused at the same point in the scene. The focal length remains fixed at 1.5 and I alter the aperture size between 0.025, 0.05, 0.1, 0.2.

<img src="/static/images/ray-tracing-materials/1f.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/2f.png" width="49%" height="49%" />

<img src="/static/images/ray-tracing-materials/3f.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/4f.png" width="49%" height="49%" />

I was also able to render the following beautiful image with a focal length of 1.7, aperture size of 0.0883883, 2048 samples per pixel, 4 samples per light, and a max ray depth of 8.

<img src="/static/images/ray-tracing-materials/final.png" width="100%" height="100%" />

```
./pathtracer -t 8 -c cam.txt -b 0.0883883 -d 1.7 -s 2048 -l 4 -m 8 -f final.png ../dae/sky/CBdragon.dae
[PathTracer] Input scene file: ../dae/sky/CBdragon.dae
[Camera] Loaded settings from cam.txt
[PathTracer] Collecting primitives... Done! (0.0146 sec)
[PathTracer] Building BVH from 100012 primitives... Done! (1.1461 sec)
[PathTracer] Rendering... 100%! (17653.0717s)
[PathTracer] BVH traced 7775667584 rays.
[PathTracer] Averaged 11.136496 intersection tests per ray.
[PathTracer] Saving to file: final.png... Done!
[PathTracer] Job completed.
```

Notably, this rendering took 6 hours to complete on a 2015 MacBook Pro, even with parallelization (running this on a CPU is very time-intensive). The program traced 7.775 billion rays through the scene.


## Shading

<a href="https://cs184sp18.github.io/proj3_2-pathtracer-noahjacobs/gl/index.html" target="_blank">Please click here to view real time shading!</a>

I placed my real time shading project on another webpage to optimize loading speed.

A shader program like this one is used for the production of appropriate levels of light, darkness, and color within an image. Combining vertex and fragment shaders, we can create lighting, shadow, and material effects in 3D modeling. A vertex shader can manipulate the attributes of vertices (i.e. corner points of polygons), and fragment shaders work to take care of shading and coloring pixels between the vertices via interpolation (e.g. gradients). Here I implement the Blinn-Phong shading model, which combines ambient shading (shading that does not depend on anything, and adds constant color to account for disregarded illumination and fill in black shadows), specular shading (shading that captures reflections on surfaces facing the viewer), and diffuse shading (shading that factors in light color, power, and attenuation).

<img src="/static/images/ray-tracing-materials/ambient.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/diffuse.png" width="49%" height="49%" />

Shown above (left) is the Blinn-Phong shader with only the ambient component. I initialized `L_a = k_a*I_a = 0.0` so this image appears dark all around the light source. The image on the right is the Blinn-Phong shader outputting only the diffuse component.

<img src="/static/images/ray-tracing-materials/specular.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/blinn-phong.png" width="49%" height="49%" />

Shown above (left) is a screen shot only outputting the specular component, and a screen shot (right) using the entire Blinn-Phong model.

Below is a screenshot of my mapping shader using a custom texture from NASA:

<img src="/static/images/ray-tracing-materials/world.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/rotation.gif" width="49%" height="49%" />

<img src="/static/images/ray-tracing-materials/nasa.png" width="100%" height="100%" />

> Source: NASA

Below is a screenshot of bump mapping and displacement mapping using the same texture for both renders.

<img src="/static/images/ray-tracing-materials/bump1.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/bump2.png" width="49%" height="49%" />

Bump mapping (above) with 256 and 128 vertical and horizontal components, respectively. You can even see the rockies! Both images look like spinning globes for an intro to an old film noir movie.

<img src="/static/images/ray-tracing-materials/displacement1.png" width="49%" height="49%" />
<img src="/static/images/ray-tracing-materials/displacement2.png" width="49%" height="49%" />

Displacement mapping with 256 and 128 vertical and horizontal components, respectively. Now we're getting mountains into space! While this might work better for textured objects like a ball of yarn, when applied to a zoomed out mapping of the world, the mesh courseness does not align with reality. Nevertheless, for both bump mapping and displacement mapping, reducing the number of vertical and horizontal components resulted in a blurrier image where mesh courseness was smoothed out.

In my custom shader (shown at the bottom of the linked webpage for this section), I made a cube in three.js, and applied a purple texture to the gl_FragColor, calculated as `vec3 purple = vec3(75.0, 0.0, 130.0) / 50.0`. I adjusted the intensity of the color to match the lighting I set up in the model. Due to the light source, only half the purple cube is visible. Notably, the upper point of the cube (towards the light source) takes on a lighter and more vibrant shade of purple compared to the points further from the light.


<br>

#### Acknowledgements

- CS 184 Course Staff at UC Berkeley
- Professor Ren Ng

