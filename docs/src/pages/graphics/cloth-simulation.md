# Clothsim

<img src="/static/images/cloth/collision-5000.png" width="49%" height="49%" />
<img src="/static/images/cloth/collision-5000.gif" width="49%" height="49%" />

>This details my implementation of a real-time simulation of cloth using a mass and spring based system. This involved building data structures to discretely represent the cloth, which consisted of equally spaced point masses connected by springs. To simulate the way cloth moves over time, I calculate point mass positions every time step based on external forces as well as structural, shearing, and bending constraints. With these physical contraints, I compute the total force and use Verlet integration to calculate the new position for each point mass in the cloth data structure. I also implemented collisions with other objects (spheres and planes) as well as self-collisions to prevent cloth clipping.

## Masses and Springs

Here I built a grid of point masses and connecting springs. Springs can be of type structural, shearing, and bending. Below are some screenshots of scene/pinned2.json from a viewing angle where you can clearly see the cloth wireframe.

<img src="/static/images/cloth/1.png" width="49%" height="49%" />
<img src="/static/images/cloth/2.png" width="49%" height="49%" />

> These images show the fireframe with all constraints: structural, shearing, and bending.

<img src="/static/images/cloth/3.png" width="100%" height="100%" />

Shown below: what the wireframe looks like (1) without any shearing constriants, (2) with only shearing constriants, and (3) with all constraints.

<img src="/static/images/cloth/4.png" width="100%" height="100%" />

<img src="/static/images/cloth/5.png" width="100%" height="100%" />

<img src="/static/images/cloth/6.png" width="100%" height="100%" />


## Simulation via Numerical Integration

Below I experiment with some parameters in the simulation, exploring the effects of changing the spring constant ks, and values for density, and damping.

### Spring Constant ks

The constant ks controls the stretchiness of the cloth material. For a very low ks, the cloth becomes stretched from start to rest as the point masses are pulled apart; for a high ks, the cloth does not give as much from start to rest, and the point masses become less likely to spread apart. The first image below (ks = 2500 N/m) shows the cloth collapses more in the center, especially compared to the final image (ks = 100000 N/m), which becomes tighter and certainly doesn't collapse as easily under its own weight. The following images are taken at the final resting state for various spring constant ks values.

<img src="/static/images/cloth/ks-1000.png" width="49%" height="49%" />
<img src="/static/images/cloth/ks-2500.png" width="49%" height="49%" />

> ks = 1000 N/m (left), ks = 2500 N/m (right)

<img src="/static/images/cloth/ks-5000.png" width="49%" height="49%" />
<img src="/static/images/cloth/ks-10000.png" width="49%" height="49%" />

> ks = 5000 N/m (left), ks = 10000 N/m (right)

### Density

As we increase density, the cloth gets pulled down more; the force of gravity exerted on the cloth is affected by its density. Below we can clearly observe point mass positions are affected by external forces and gravity, and that the cloth is pulled down more with higher density values. The following images are taken at the final resting state for various density values.

<img src="/static/images/cloth/d-5.png" width="49%" height="49%" />
<img src="/static/images/cloth/d-10.png" width="49%" height="49%" />

> density = 5 g/cm^2 (left), density = 10 g/cm^2 (right)

<img src="/static/images/cloth/d-15.png" width="49%" height="49%" />
<img src="/static/images/cloth/d-30.png" width="49%" height="49%" />

> density = 15 g/cm^2 (left), density = 30 g/cm^2 (right)

<img src="/static/images/cloth/d-50.png" width="49%" height="49%" />
<img src="/static/images/cloth/d-100.png" width="49%" height="49%" />

> density = 50 g/cm^2 (left), density = 100 g/cm^2 (right)

### Damping

Damping controls the oscillation of the spring force. The smaller the coefficient, the more the cloth continues to oscillate and move. Higher damping constants result in energy dissipating faster, causing less movement over time, as the damping force brings the system to a resting state. Below, we can observe that with no damping, the cloth continues to move, seemingly without resistance, with many ripples across the material. As the damping increases, the springs oscillate less, and the material comes to a final resting state sooner, with noticeably less ripples.

<script src="http://vjs.zencdn.net/4.0/video.js"></script>
<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="80%" height="80%">
<source src="/static/images/cloth/damping-1.mp4" type='video/mp4'>
</video>

> damping = 0%

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="80%" height="80%">
<source src="/static/images/cloth/damping-2.mp4" type='video/mp4'>
</video>

> damping = 0.057471%

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="80%" height="80%">
<source src="/static/images/cloth/damping-3.mp4" type='video/mp4'>
</video>

> damping = 0.103448%

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="80%" height="80%">
<source src="/static/images/cloth/damping-4.mp4" type='video/mp4'>
</video>

> damping = 0.206897%

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="80%" height="80%">
<source src="/static/images/cloth/damping-5.mp4" type='video/mp4'>
</video>

> damping = 0.505747%

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="80%" height="80%">
<source src="/static/images/cloth/damping-6.mp4" type='video/mp4'>
</video>

> damping = 1.0%

### Shaded Cloth

Below is a screenshot of the shaded cloth from scene/pinned4.json in its final resting state.

<img src="/static/images/cloth/cloth-final.png" width="100%" height="100%" />


## Handling Collisions with Other Objects

Shown below are screenshots of the shaded cloth from scene/sphere.json in its final resting state on a sphere. Each image has varying ks values, which control how much the cloth will stretch (as explored above). With the cloth in its final resting state on a sphere, we can observe how lower ks values will stretch the material more around the object, as lower ks values result in  point masses spreading apart more. This can be observed as the cloth stretches around the sphere under its own weight.

<img src="/static/images/cloth/collision-500.png" width="100%" height="100%" />

> ks = 500 N/m

<img src="/static/images/cloth/collision-5000.png" width="100%" height="100%" />

> ks = 5000 N/m

<img src="/static/images/cloth/collision-50000.png" width="100%" height="100%" />

> ks = 50000 N/m

The following image shows the shaded cloth lying peacefully at rest on the plane, another case where the program handles collisions with other objects.

<img src="/static/images/cloth/plane.png" width="100%" height="100%" />


## Handling Self-Collisions

### Self-Collisions With Default Parameters

Shown below, density = 15 g/cm^2, ks = 5000 N/m, and damping = 0.2%.

<img src="/static/images/cloth/self-1.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-2.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-3.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-4.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-5.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-6.png" width="49%" height="49%" />

### Varying Density

The following screenshots are taken with parameters density = 5 g/cm^2, ks = 5000 N/m, and damping = 0.2%. Keeping everything else constant with the default settigns, lowering the density results in less overall self-collisions. Higher density values (shown above in the default images) result in the cloth folding on itself more, since the grativational force is pulling down a heavier material, exerting a larger force through the spring system upon collision. We can observe the cloth with a lower density value in the following images.

<img src="/static/images/cloth/self-d1.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-d2.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-d3.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-d4.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-d5.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-d6.png" width="49%" height="49%" />

### Varying ks

The following screenshots are taken with parameters density = 15 g/cm^2, ks = 500 N/m, and damping = 0.2%. Keeping everything else constant with the default settings, lowering the constant ks increases the stretchiness of the cloth. This can be observed below as more ripples travel across the cloth upon its impact with the plane. In its final resting state, parts of the cloth are wrinkled, compared to the cloth with a default, higher ks value, which appears smoother upon its final resting state.

<img src="/static/images/cloth/self-ks1.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-ks2.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-ks3.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-ks4.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-ks5.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-ks6.png" width="49%" height="49%" />

<img src="/static/images/cloth/self-ks7.png" width="49%" height="49%" />
<img src="/static/images/cloth/self-ks8.png" width="49%" height="49%" />

<br>

#### Acknowledgements

- CS 184 Course Staff at UC Berkeley
- Professor Ren Ng

