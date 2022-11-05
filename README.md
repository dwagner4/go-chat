This is an OOP template for Three.js web applications. It was generated from @open-wc targeting plain vanilla Javascript, roll-up and jest. The dependencies are;

- Three.js, 3D rendering
- Gsap, variable animation (not strictly required)
- xState, finite state machine (not strictly required)
- cannon-es.js, (required for physics, could use Ammo.js)

The "module" structure of a generic OOP Three.js application is below.
![This is an image](/designGraphics/simpleVR2.png)

Index.html contains minimal html and possible grphics to display during the initial download and/or overlay the Three.js scene.

main.js sets up html dynamic elements, subcribes to the finite state machine, establishes connections to backend services if needed, and loads the scene instances. It may also load html animations.

An scene inherits boilerplate from SceneThree.js which is loaded through npm. The scene will load models from their own class objects in the actors folder. Models are added to the scene, position and rotate them, and possibly add them to the physics world. Dynamic actors are added to the objectsToUpdate[] array so that each model's update() function will be called each frame. The scene FSM will call model animations, or scene animations as needed by the scene logic. SceneThree.js has an overlay plane attached to the camera to use for fading to black.

Dynamic objects all inherit from the Actor.js class. Actors have init(), update() and dispose() functions. The init() function is used for asychronous actions such as loading a model. The dispose function must remove all child objects and materials to avoid memory leaks. variables or animation functions which need to be controlled by scene logic, have to be exposed in the constructor as properties of the actor.

## Quick Start

1. creat a new repository from the template by clicking "Use this template" on the main github page
2. Clone the new repository to your local machine and cd to it
3. git merge "<branch>" that is appropriate to your project
4. from root `npm install`
5. `npm run start`
6. start to modify

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors
