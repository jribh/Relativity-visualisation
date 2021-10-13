let embeddingMassDiv = document.querySelector("#embedding-mass");

let embeddingDualDiv = document.querySelector("#embedding-dual");

async function embeddingGravity() {

    let dimensions = {
            width: 450,
            height: 450,
            margin: {
            top: 100,
            right: 70,
            bottom: 100,
            left: 70,
            },
        };
        dimensions.boundedWidth =
            dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight =
            dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    embeddingMassDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.botto + "px");

    embeddingDualDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.botto + "px");

    var sliderMass = d3
        .sliderHorizontal()
        .min(1)
        .max(250000)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
            }
            return d;
        })
        .ticks(6)
        .value(1)
        .width(dimensions.width - 2*dimensions.margin.left)
        .displayValue(false)
        .handle(
            d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
        );

    var sliderRadius = d3
        .sliderHorizontal()
        .min(0)
        .max(1000000)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
            }
            return d;
        })
        .ticks(6)
        .value(696340)
        .width(dimensions.width - 2*dimensions.margin.left)
        .displayValue(false)
        .handle(
            d3
                .symbol()
                .type(d3.symbolCircle)
                .size(200)()
            );
        

    var sliderMassSvg = d3.select('#slider-mass')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', 100)
        .style("transform", 25)
        .append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top/6}px)`)
        .call(sliderMass);

    var sliderRadiusSvg = d3.select('#slider-radius')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', 100)
        .style("transform", 25)
        .append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top/6}px)`)
        .call(sliderRadius);


    // three.js scene sphere

        const sceneSphere = new THREE.Scene();

        sceneSphere.background = new THREE.Color(0xffffff);

        const cameraSphere = new THREE.PerspectiveCamera(75, dimensions.width / (dimensions.height - dimensions.margin.top - dimensions.margin.bottom), 0.1, 1000);

        const rendererSphere = new THREE.WebGLRenderer({antialias : true});

        rendererSphere.setSize(dimensions.width, dimensions.height - dimensions.margin.top - dimensions.margin.bottom);
        embeddingMassDiv.appendChild(rendererSphere.domElement);

        const lightsSphere = new THREE.HemisphereLight(0xFFFFFF, 1);
        sceneSphere.add(lightsSphere);

        const lightsDownSphere = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
        sceneSphere.add(lightsDownSphere);

        // three.js sphere object

        var sphereRadius = 100;

        const geometrySphere = new THREE.SphereGeometry(sphereRadius, 64, 32);

        const materialSphere = new THREE.MeshPhongMaterial({color : 0xcaf0f8, opacity : 0.75, transparent : true,});
        materialSphere.color.set(0xcaf0f8);
        materialSphere.flatShading = false;

        const sphere = new THREE.Mesh(geometrySphere, materialSphere);

        sceneSphere.add(sphere);

        // schwarzschild radius ring

        var radius   = 180,
            segments = 64,
            materialCircle = new THREE.LineDashedMaterial( { color: 0x8d99ae , dashSize : 10, gapSize : 10} ),
            geometryCircle = new THREE.CircleGeometry( radius, segments );

        geometryCircle.vertices.shift();

        const circleS = new THREE.LineLoop( geometryCircle, materialCircle );
        circleS.computeLineDistances();

        sceneSphere.add(circleS);

        var scale = 0.0000029477;

        circleS.scale.x = scale;
        circleS.scale.y = scale;
        circleS.scale.z = scale;


        cameraSphere.position.z = 350;

        // rendering function sphere

        function animateSphere() {
            requestAnimationFrame(animateSphere);
            rendererSphere.render(sceneSphere,cameraSphere);

        }

        animateSphere();

    // three.js scene embedding dual
        
        var clock, mixer;

        const sceneDualEmbedding = new THREE.Scene();

        sceneDualEmbedding.background = new THREE.Color(0xffffff);

        const cameraDualEmbedding = new THREE.PerspectiveCamera(10, dimensions.width / (dimensions.height - dimensions.margin.top - dimensions.margin.bottom), 0.1, 1000);

        const rendererDualEmbedding = new THREE.WebGLRenderer({antialias : true});

        //orbit controls

        const controls = new THREE.OrbitControls(cameraDualEmbedding, rendererDualEmbedding.domElement);
        controls.enableZoom = false;

        // camera position

        cameraDualEmbedding.position.set(0,0,75);
        controls.update();

        rendererDualEmbedding.setSize(dimensions.width, dimensions.height - dimensions.margin.top - dimensions.margin.bottom);
        embeddingDualDiv.appendChild(rendererDualEmbedding.domElement);

        const lightsDualEmbedding = new THREE.HemisphereLight(0xFFFFFF, 1);
        sceneDualEmbedding.add(lightsDualEmbedding);

        const lightsDownDualEmbedding = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
        sceneDualEmbedding.add(lightsDownDualEmbedding);

        
        // gltf loader

        let embedding4;
        let embeddingBlackHole;

		// geometry.morphAttributes.position = [];

        // const materialEmbedding = new THREE.MeshPhongMaterial({color : 0xcaf0f8, opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
        // materialEmbedding.color.set(0xcaf0f8);
        // materialEmbedding.flatShading = false;

        const materialEmbedding = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});


        loadEmbedding("Assets/individual gltfs/embedding 4 animated.glb");

        function loadEmbedding(embeddingType) {

            clock = new THREE.Clock();

            var loader = new THREE.GLTFLoader();

            loader.load(embeddingType, function(gltf) {
    
                embedding4 = gltf.scene;
                sceneDualEmbedding.add(embedding4);
                

                //mixer animation

                mixer = new THREE.AnimationMixer(gltf.scene);

                gltf.animations.forEach( (clip) => {
                    mixer.clipAction(clip).play();
                })

                //gltf material
    
                gltf.scene.traverse((o) => {
                     if(o.isMesh) o.material = materialEmbedding;
                })

                init();
    
            }, undefined, function(error) {
                console.log(error);
            })
            
        }

        function init() {
            embedding4.scale.x = 90;
            embedding4.scale.y = 90;
            embedding4.scale.z = 90;
        }

        // rendering function 

        timeEmbedding = 0;

        function animateDualEmbedding() {

            requestAnimationFrame(animateDualEmbedding);
            controls.update();

            // var delta = clock.getDelta();
            // if (mixer) mixer.update(delta);
            seekAnimationTime(mixer, timeEmbedding);

            rendererDualEmbedding.render(sceneDualEmbedding,cameraDualEmbedding);

        }
        
        animateDualEmbedding();

        function seekAnimationTime(animMixer, timeInSeconds) {

            if(animMixer) animMixer.time = 0;

            if(animMixer) {
            for(let i=0; i<animMixer._actions.length; i++) {
                animMixer._actions[i].time = 0;
            }
        }

            if(animMixer) animMixer.update(timeInSeconds);

        }

        


    // Mass slider onchange

    let schwarzschildRadius = 3;
    let sphereRadiusS = 696340;

    sliderMass.on('onchange', (val) => {

        // schwarzschild radius

        let mass = Math.round(val) * 1.989 * Math.pow(10, 30);

        schwarzschildRadius = Math.round((mass * 1.482 * Math.pow(10, -27)) / 1000);
        

        // schwarzschild radius scaling

        var scale = val * 0.0000029477;

        circleS.scale.x = scale;
        circleS.scale.y = scale;
        circleS.scale.z = scale;

        timeEmbedding = val/50001;

        if(sphereRadiusS < schwarzschildRadius * 1.2) {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Assets/individual gltfs/embedding black hole.glb")

        } else {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Assets/individual gltfs/embedding 4 animated.glb")

        }

    })


    // Radius slider onchange

    sliderRadius.on('onchange', (val) => {

        // sphere radius

        var scale = val / 696340;

        sphere.scale.x = scale;
        sphere.scale.y = scale;
        sphere.scale.z = scale;

        sphereRadiusS = val;

        if(sphereRadiusS < schwarzschildRadius * 1.2) {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Assets/individual gltfs/embedding black hole.glb")

        } else {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Assets/individual gltfs/embedding 4 animated.glb")

        }
        
    })    

}

embeddingGravity();