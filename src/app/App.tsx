import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function App() {
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0e1a2b, 1);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 8;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const light = new THREE.DirectionalLight(0x7eb8e8, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    const geometry = new THREE.IcosahedronGeometry(1.5, 2);

    const material = new THREE.MeshStandardMaterial({
      color: 0x7eb8e8,
      metalness: 0.8,
      roughness: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bg-[#0E1A2B] text-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-screen flex items-center px-6 lg:px-24">
        <canvas
          ref={heroCanvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm text-sky-200 mb-8">
            Premium Pet Grooming Since 2018
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Luxury Grooming
            <span className="block text-sky-300">
              For Your Pets
            </span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Professional pet spa, grooming, bathing, and daycare services
            with premium care for dogs and cats.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-xl bg-sky-400 hover:bg-sky-300 px-8 py-4 font-semibold text-slate-900 transition">
              Book Now
            </button>

            <button className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 font-semibold backdrop-blur">
              View Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}