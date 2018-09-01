# MeshEdit

<p class="description">Computer Graphics</p>

<img src="/static/images/geometry/geometry.jpg" width="100%" height="100%" />

This details my approach to building a tool that allows you to load and edit basic COLLADA mesh files that are now used by many major modeling packages and real time graphics engines. A COLLADA file describes a scene graph (much like SVG) that is a hierarchical representation of all objects in the scene (meshes, cameras, lights, etc.), as well as their coordinate transformations. Here I built Bezier curves and surfaces using de Casteljau's algorithm, manipulated half-edge meshes, and implemented Loop subdivision.

## Bezier Curves and Surfaces

#### Bezier Curves with 1D de Casteljau Subdivision

A Bezier curve is a parametric curve defined by a single parameter, t, which ranges between 0 and 1. A Bezier curve of degree n is defined by (n+1) control points. Using de Casteljau's algorithm, we can evaluate these parametric curves for any given set of parameters. As an example to illustrate de Casteljau's algorithm, say we have three line segments. Following the algorithm, we use linear interpolation along with the parameter, t, to find a point on each of the line segments, giving a 3-point polygon. We can then find a new point on each of the line segments using linear interpolation, and the same t value, giving a 2-point polygon, or a line. We find a point on this line using linear interpolation again. As we vary the parameter t between 0 and 1, this final point traces out our smooth curve. These are the kind of curves Pixar typically uses to control the motion of their animated characters. 

The following animation provides a visualization for de Casteljau's algorithm applied to bezier curves: 

<script src="http://vjs.zencdn.net/4.0/video.js"></script>
<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="100%" height="100%">
<source src="/static/images/geometry/bezier_curves.mp4" type='video/mp4'>
</video>

Source: <a href="https://acko.net/files/fullfrontal/fullfrontal/wdcode/online.html" target="_blank">Steven Wittens, Making Things with Maths</a>

Below I created my own Bezier curve with six control points using MeshEdit. Each screenshot shows a step of the evaluation from the original control points down to the final evaluated point.

<img src="/static/images/geometry/0.png" width="33%" height="33%" />
<img src="/static/images/geometry/1.png" width="33%" height="33%" />
<img src="/static/images/geometry/2.png" width="33%" height="33%" />
<img src="/static/images/geometry/3.png" width="50%" height="50%" /><img src="/static/images/geometry/4.png" width="50%" height="50%" />
<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="100%" height="100%">
<source src="/static/images/geometry/curve.mp4" type='video/mp4'>
</video>

The above video shows how scrolling on the program gives us a slightly different Bezier curve by modifying the value of t. The points can also be moved around to alter the curve.

<br>

#### Bezier Surfaces with Separable 1D de Casteljau Subdivision

After creating a bezier curve across one dimension, we can use those curves to create a bezier surface along two dimensions. A Bezier surface is a parametric surface defined by two parameters, u and v. A Bezier surface of degree (n,m) is defined by (n+1)(m+1) control points. Using de Casteljau's algorithm, we can evaluate these parametric surfaces for any given set of parameters. The control points serve as indicators for the overall shape such that a Bezier surface is created via interpolation of Bezier curves based on a parameter v.

The following animation provides a visualization for de Casteljau's algorithm applied to bezier surfaces: 

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="100%" height="100%">
<source src="/static/images/geometry/bezier_surfaces.mp4" type='video/mp4'>
</video>

Source: <a href="https://acko.net/files/fullfrontal/fullfrontal/wdcode/online.html" target="_blank">Steven Wittens, Making Things with Maths</a>

Below are several screenshots of a rendering (using this method) of a teapot:

<img src="/static/images/geometry/teapot0.png" width="33%" height="33%" />
<img src="/static/images/geometry/teapot1.png" width="33%" height="33%" />
<img src="/static/images/geometry/teapot2.png" width="33%" height="33%" />
<img src="/static/images/geometry/teapot3.png" width="100%" height="100%" />

<br>

## Loop Subdivision of General Triangle Meshes

#### Average Normals for Half-Edge Meshes

Here I approximate the actual geometry of the underlying shape of the object by averaging the normals across adjacent faces. The result is a smoother shading effect that is accomplished by traversing the half-edge data structure pictured below:

<img src="/static/images/geometry/halfedge.jpg" width="30%" height="30%" />
<img src="/static/images/geometry/edges.jpg" width="55%" height="55%" />

By traversing vertex faces in the half-edge, I was able to compute the normal for each face by taking the half-edge twin and next half-edge, effectively calculating the vectors those edges represent, and crossing them together to compute the normal of that face. By looping over the whole structure, I was able to do this for every face. Having kept track of the original half-edge, I finish the loop by returning the re-normalized unit vector.

The following mesh renderings of dae/teapot.dae show the default OpenGL shading with and without smoothed normals.

<img src="/static/images/geometry/shading1.png" width="49.9%" height="49.9%" />
<img src="/static/images/geometry/shading2.png" width="49.9%" height="49.9%" />

<video id="pelican-installation" class="video-js vjs-default-skin" controls
preload="auto" width="100%" height="100%">
<source src="/static/images/geometry/pot.mp4" type='video/mp4'>
</video>

The above animation shows normalization for half-edge meshes in real time.

<br>

#### Half-Edge Flip

<img src="/static/images/geometry/flip.jpg" width="100%" height="100%" />

Shown above is a visualization of an edge flip.

Here I implemented the ability to flip edges in the mesh, which is represented with half-edge data structures. Each half-edge consists of vertices, edges, faces, and half-edge pointers to its face, twin half-edge, next half-edge, and the edge it shares with an adjacent half-edge. Overall, this part consisted of saving and reassigning many pointers for all the elements involving the edge flip. This required drawing out on paper which pointers needed to be modified to ensure any edge cases (pun intended) were ironed out.

<img src="/static/images/geometry/pre-flip.png" width="49.5%" height="49.5%" />
<img src="/static/images/geometry/post-flip.png" width="49.5%" height="49.5%" />

Above are screenshots of a mesh before and after some edge flips on the side of the teapot.

<br>

#### Half-Edge Split

<img src="/static/images/geometry/split.jpg" width="100%" height="100%" />

Shown above is a visualization of an edge split.

Similar to edge flips, this required modifying many pointers. At first, performing an edge split with my program either caused faces to disappear entirely or dents to form in the mesh. These two bugs simultaneously haunted me. After carefully sketching out the half-edge data structure, I discovered 1) I needed to reassign a second half-edge, and 2) instead of calculating a new vertex position at the midpoint of the original edge, I was adding a new vertex at the origin which caused dents to form in the mesh. Once these bugs were dealt with, the half-edge split operation worked as intended.


<img src="/static/images/geometry/pre-split.png" width="100%" height="100%" />

Shown above is a screenshot of a mesh before edge splits.

<img src="/static/images/geometry/post-split.png" width="100%" height="100%" />

Shown above is a screenshot of a mesh after some edge splits.

<img src="/static/images/geometry/flip-split.png" width="100%" height="100%" />

Show above is a screenshot of a mesh before and after a combination of both edge splits and edge flips.


<br>

#### Loop Subdivision for Mesh Upsampling

Loop subdivision allows us to smooth our meshes and works by breaking down triangles into smaller ones. After many runs, sharp corners and edges become more rounded.

The process I implemented:
- Mark each vertex as being a vertex of the original mesh, and compute new positions for all vertices in the input mesh. This is calculated as: `(1 - n * u) * original_position + u * neighbor_position_sum`, where `n = vertex degree; u = (3/16) if n = 3, 3/(8n) otherwise`.
- Next, compute the updated vertex positions associated with edges. This is calculated as: `3/8 * (A + B) + 1/8 * (C + D)`.
- Then, split every edge in the mesh.
- Flip any new edge that connects an old and new vertex.
- Finally, copy the new vertex positions.

One noteworthy observation is that upsampling without pre-splitting edges resulted in some irregularities. This can be observed in the following screenshots:

<img src="/static/images/geometry/p1.png" width="100%" height="100%" />

Cube mesh before upsampling.

<img src="/static/images/geometry/p2.png" width="49.5%" height="49.5%" />
<img src="/static/images/geometry/p3.png" width="49.5%" height="49.5%" />

Cube mesh after upsampling.

<img src="/static/images/geometry/p5.png" width="100%" height="100%" />

Notice the slight asymmetry after repeated subdivision steps above.

<img src="/static/images/geometry/pp1.png" width="100%" height="100%" />

Cube mesh with each face split before upsampling (pre-processing).

<img src="/static/images/geometry/pp2.png" width="49.5%" height="49.5%" />
<img src="/static/images/geometry/pp3.png" width="49.5%" height="49.5%" />

<img src="/static/images/geometry/pp5.png" width="100%" height="100%" />

Cube with pre-processing after upsampling. That's smooth!

By splitting prior to upsampling, the mesh takes on a more symmetrical structure, resulting in a symmetric result through upsampling. Because sharp corners and edges get smoothed out, however, we also lose a lot of volume with loop subdivision for mesh upsampling. Below are some more screenshots of a torus with pre-processing for loop subdivision.

<img src="/static/images/geometry/p21.png" width="49.5%" height="49.5%" />
<img src="/static/images/geometry/p22.png" width="49.5%" height="49.5%" />

<img src="/static/images/geometry/p23.png" width="49.5%" height="49.5%" />
<img src="/static/images/geometry/p24.png" width="49.5%" height="49.5%" />

<img src="/static/images/geometry/p25.png" width="100%" height="100%" />

<br>

#### Acknowledgements

- CS 184 Course Staff at UC Berkeley
- Professor Ren Ng

