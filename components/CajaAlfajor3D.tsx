"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { Suspense, useEffect, useRef } from "react"
import * as THREE from "three"

function Modelo() {
  const { scene } = useGLTF("/assets/Cajas12.glb")
  const ref = useRef<THREE.Group>(null)

  // el .glb puede venir en cualquier escala/origen: centramos el modelo y lo
  // reescalamos para que siempre llene el frame, sin importar cómo fue exportado
  useEffect(() => {
    const group = ref.current
    if (!group) return

    // medimos siempre desde una transformación neutra: en dev, Strict Mode
    // vuelve a ejecutar este efecto, y si midiéramos sobre el grupo ya
    // escalado, la segunda pasada "corrige" la escala de vuelta a 1
    group.scale.setScalar(1)
    group.position.set(0, 0, 0)

    const box = new THREE.Box3().setFromObject(group)
    const center = box.getCenter(new THREE.Vector3())

    // usamos la esfera envolvente (no el ancho/alto frontal) para el fit:
    // su radio cubre la diagonal completa de la caja, así que por más que
    // gire nunca se sale del frustum de la cámara, sin necesidad de
    // achicarla "a ojo" y perder tamaño en la vista de reposo
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    if (sphere.radius <= 0) return

    // 1.42 es el radio que garantiza que la caja entra en cámara SIN
    // IMPORTAR el ángulo (ni inclinación ni giro horizontal): agrandarlo
    // rompe esa garantía y la caja termina saliéndose del cuadro en
    // algún ángulo de giro tarde o temprano. Para que se vea más grande
    // sin ese riesgo, agrandá el contenedor del visor en la página, no
    // este número.
    const scaleFactor = 1.42 / sphere.radius
    group.scale.setScalar(scaleFactor)
    group.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor)
  }, [scene])

  return <primitive ref={ref} object={scene} />
}

export default function CajaAlfajor3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Modelo />
        <Environment preset="city" />
        <ContactShadows position={[0, -1, 0]} opacity={0.4} blur={2} />
      </Suspense>

      {/* 360 interactivo: el usuario arrastra para girar */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.7}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.95 /* tope de inclinación: hasta acá se alcanza a ver el interior */}
      />
    </Canvas>
  )
}

useGLTF.preload("/assets/Cajas12.glb")