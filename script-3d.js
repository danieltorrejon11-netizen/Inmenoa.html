// Inicialización de AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Configuración de Vanilla Tilt
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
    scale: 1.05,
    transition: true
});

// Loader 3D
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Cerrar menú hamburguesa si está abierto
            const hamburger = document.getElementById('hamburger');
            const menu = document.querySelector('.menu-3d');
            if (window.innerWidth <= 768 && menu && menu.style.display === 'flex') {
                menu.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Formulario de contacto ACTUALIZADO
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor complete todos los campos obligatorios');
                return;
            }
            
            const btn = this.querySelector('.btn-submit-3d');
            const loader = btn.querySelector('.btn-loader');
            
            // Mostrar loader
            loader.style.opacity = '1';
            btn.disabled = true;
            
            // Crear mensaje de WhatsApp
            const whatsappMessage = `
¡Hola! Soy ${nombre}

Tengo una consulta sobre: ${asunto}

Teléfono: ${telefono || 'No proporcionado'}

Mensaje:
${mensaje}

---
Enviado desde el formulario de contacto de Inmenoa S.A.S
            `.trim();
            
            // Codificar para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/5493875601974?text=${encodedMessage}`;
            
            // Abrir WhatsApp en nueva pestaña
            window.open(whatsappURL, '_blank');
            
            // También enviar email
            const mailtoLink = `mailto:ventasinmenoa@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`)}`;
            
            // Mostrar mensaje de confirmación
            setTimeout(() => {
                alert(`✅ ¡Gracias por contactarnos, ${nombre}!\n\nHemos recibido tu mensaje y te responderemos pronto.\n\n📧 También hemos enviado tu consulta a: ventasinmenoa@gmail.com\n📱 Y hemos abierto WhatsApp para que puedas conversar directamente.`);
                
                loader.style.opacity = '0';
                btn.disabled = false;
                contactForm.reset();
                
                // Enviar email automáticamente
                window.location.href = mailtoLink;
            }, 1500);
        });
    }
});

// Hero Canvas 3D con Three.js
const initHeroCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Partículas 3D
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
        if (i % 3 === 0) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        if (i % 3 === 1) {
            posArray[i] = (Math.random() - 0.5) * 30;
        }
        if (i % 3 === 2) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
    }
    
    for (let i = 0; i < particlesCount; i++) {
        scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        color: 0x3498db,
        transparent: true,
        opacity: 0.8,
        depthWrite: false
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Animación
    const animate = () => {
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0005;
        
        const positions = particlesMesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += 0.01;
            if (positions[i + 2] > 10) {
                positions[i + 2] = -10;
            }
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
};

// Galería 3D de proyectos
const initGallery3D = () => {
    const galleryContainer = document.getElementById('gallery3d');
    if (!galleryContainer) return;
    
    const projects = [
        {
            img: 'https://images.unsplash.com/photo-1541888946425-d81bb74d66a8?w=600',
            title: 'Puente Atirantado',
            desc: 'Infraestructura vial moderna'
        },
        {
            img: 'https://images.unsplash.com/photo-1565008993188-6e3bf1b7642c?w=600',
            title: 'Estructura Metálica',
            desc: 'Edificio corporativo'
        },
        {
            img: 'https://images.unsplash.com/photo-1504307651254-35680f35c264?w=600',
            title: 'Carretera',
            desc: 'Vía de doble calzada'
        },
        {
            img: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600',
            title: 'Planta de Tratamiento',
            desc: 'Sistema hidráulico'
        },
        {
            img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
            title: 'Centro Comercial',
            desc: 'Construcción comercial'
        },
        {
            img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
            title: 'Hospital',
            desc: 'Infraestructura de salud'
        }
    ];
    
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'gallery-3d-item';
        item.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <div class="gallery-3d-overlay">
                <h4>${project.title}</h4>
                <p>${project.desc}</p>
            </div>
        `;
        galleryContainer.appendChild(item);
    });
};

// Contador de estadísticas
const initStatsCounter = () => {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(statNumber.textContent);
                let count = 0;
                
                const increment = setInterval(() => {
                    count += Math.ceil(target / 50);
                    if (count >= target) {
                        count = target;
                        clearInterval(increment);
                    }
                    statNumber.textContent = count + (target >= 100 ? '+' : '');
                }, 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
};

// Menú hamburguesa
const initHamburgerMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu-3d');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !hamburger.contains(e.target) && 
                !menu.contains(e.target) && 
                menu.style.display === 'flex') {
                menu.style.display = 'none';
                hamburger.classList.remove('active');
            }
        });
    }
};

// Efecto de scroll para header
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-3d');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
        header.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 152, 219, 0.9))';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        header.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
    }
    
    lastScroll = currentScroll;
});

// Botón flotante de WhatsApp
const createWhatsAppButton = () => {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/5493875601974" target="_blank" style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            text-decoration: none;
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        ">
            <svg style="width: 35px; height: 35px;" viewBox="0 0 24 24">
                <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.493h-.004c-2.254-.001-4.498-.669-6.44-1.948-1.943-1.28-3.494-3.078-4.446-5.153-1.904-4.151-1.566-8.742.916-12.342 2.482-3.6 6.773-5.633 11.178-5.301 4.405.333 8.277 2.763 10.64 6.29 2.364 3.527 2.938 7.856 1.604 11.847-1.334 3.99-4.417 7.332-8.362 9.078-1.579.7-3.233 1.035-4.877 1.032zm-1.383-14.328c-.797-.001-1.442-.646-1.443-1.443-.001-.797.645-1.443 1.442-1.443.797 0 1.443.646 1.443 1.443 0 .797-.646 1.443-1.442 1.443z"/>
            </svg>
        </a>
    `;
    document.body.appendChild(whatsappBtn);
    
    // Animación pulse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .whatsapp-float a:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }
    `;
    document.head.appendChild(style);
};

// Inicialización completa
window.addEventListener('load', () => {
    initHeroCanvas();
    initGallery3D();
    initStatsCounter();
    initHamburgerMenu();
    createWhatsAppButton();
    
    // Efecto de escritura en hero
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Google Analytics (opcional)
if (typeof gtag === 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXXXXXX-X');
}