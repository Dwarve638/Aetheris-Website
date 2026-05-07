import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function terrainY(x, z) {
  return (
    Math.sin(x * 0.5) * Math.cos(z * 0.4) * 1.8 +
    Math.sin(x * 1.1 + 0.8) * Math.cos(z * 0.85) * 0.9 +
    Math.sin(x * 0.3 - 1.2) * Math.sin(z * 0.65) * 1.3 +
    Math.cos(x * 0.7 + z * 0.6) * 0.55
  );
}

function buildDrone(mat) {
  const group = new THREE.Group();
  const rotors = [];
  const geos = [];

  const addWireframe = (geo, parent = group) => {
    geos.push(geo);
    const wgeo = new THREE.WireframeGeometry(geo);
    geos.push(wgeo);
    const mesh = new THREE.LineSegments(wgeo, mat);
    parent.add(mesh);
    return mesh;
  };

  // Central body
  addWireframe(new THREE.BoxGeometry(0.65, 0.15, 0.45));

  const ARM_DIST = 0.85;

  // 4 arms + rotors at 45° diagonals
  [45, 135, 225, 315].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const sx = Math.sin(rad);
    const cz = Math.cos(rad);

    // Arm: cylinder laid flat, rotated to point outward
    const armGeo = new THREE.CylinderGeometry(0.022, 0.022, ARM_DIST, 5);
    armGeo.rotateZ(Math.PI / 2);
    armGeo.rotateY(rad - Math.PI / 2);
    const arm = addWireframe(armGeo);
    arm.position.set(sx * ARM_DIST * 0.5, 0, cz * ARM_DIST * 0.5);

    // Rotor: 4-segment flat cylinder looks like an X of blades from above
    const rotorGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.025, 4);
    const rotor = addWireframe(rotorGeo);
    rotor.position.set(sx * ARM_DIST, 0.06, cz * ARM_DIST);
    rotors.push(rotor);
  });

  // Camera gimbal beneath the body
  const gimbalGeo = new THREE.OctahedronGeometry(0.09, 0);
  const gimbal = addWireframe(gimbalGeo);
  gimbal.position.set(0, -0.18, 0.06);

  return { group, rotors, geos };
}

export default function TerrainCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 1000);
    camera.position.set(0, 13, 20);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Terrain ---
    const geo = new THREE.PlaneGeometry(22, 22, 80, 80);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, terrainY(pos.getX(i), pos.getZ(i)));
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const wireGeo = new THREE.WireframeGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x1e90ff, opacity: 0.38, transparent: true });
    const terrain = new THREE.LineSegments(wireGeo, wireMat);

    // Subtle second layer for depth
    const geo2 = geo.clone();
    const pos2 = geo2.attributes.position;
    for (let i = 0; i < pos2.count; i++) pos2.setY(i, pos2.getY(i) + 0.04);
    pos2.needsUpdate = true;
    const wireGeo2 = new THREE.WireframeGeometry(geo2);
    const wireMat2 = new THREE.LineBasicMaterial({ color: 0x4facfe, opacity: 0.12, transparent: true });
    const terrain2 = new THREE.LineSegments(wireGeo2, wireMat2);

    // Point cloud (simulated lidar returns)
    const ptCount = 320;
    const ptBuf = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      const px = (Math.random() - 0.5) * 20;
      const pz = (Math.random() - 0.5) * 20;
      ptBuf[i * 3] = px;
      ptBuf[i * 3 + 1] = terrainY(px, pz) + Math.random() * 0.12;
      ptBuf[i * 3 + 2] = pz;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptBuf, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0x7dcfff, size: 0.09, opacity: 0.75, transparent: true, sizeAttenuation: true });
    const points = new THREE.Points(ptGeo, ptMat);

    const pivot = new THREE.Group();
    pivot.add(terrain, terrain2, points);
    scene.add(pivot);

    // --- Drone ---
    const droneMat = new THREE.LineBasicMaterial({ color: 0xc0e8ff, opacity: 0.95, transparent: true });
    const { group: droneGroup, rotors, geos: droneGeos } = buildDrone(droneMat);
    scene.add(droneGroup);

    // --- Animate ---
    let t = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.004;

      pivot.rotation.y += 0.0018;

      // Drone orbits terrain in world space
      const ox = Math.sin(t) * 3.2;
      const oz = Math.cos(t) * 3.2;
      const oy = 5.2 + Math.sin(t * 1.4) * 0.3;
      droneGroup.position.set(ox, oy, oz);

      // Face direction of travel, lean slightly forward
      droneGroup.rotation.y = -(t + Math.PI / 2);
      droneGroup.rotation.x = 0.09;

      // Spin rotors — alternate CW / CCW
      rotors.forEach((r, i) => {
        r.rotation.y += i % 2 === 0 ? 0.2 : -0.2;
      });

      renderer.render(scene, camera);
    };
    animate();

    const observer = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(nw, nh);
    });
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      [geo, geo2, wireGeo, wireGeo2, ptGeo, ...droneGeos].forEach((g) => g.dispose());
      [wireMat, wireMat2, ptMat, droneMat].forEach((m) => m.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', minHeight: 'clamp(260px, 45vw, 420px)', height: '100%' }} />
  );
}
