/**
 * BiciStore — Tienda de Bicicletas
 * Catálogo con carrito de compras, filtros, búsqueda y ordenamiento
 * Autora: Allison Guerrero — @alinge20
 */

// ===== Datos de productos =====
const productos = [
    // Bicicletas
    { id: 1,  nombre: "Bicicleta de Montaña Pro",     precio: 1899000, precioOriginal: 2299000, categoria: "bicicletas", emoji: "🚵", stock: 8  },
    { id: 2,  nombre: "Bicicleta de Ruta Carbon",     precio: 3450000, precioOriginal: null,    categoria: "bicicletas", emoji: "🚴", stock: 4  },
    { id: 3,  nombre: "Bicicleta Urbana Classic",      precio: 890000,  precioOriginal: 1100000, categoria: "bicicletas", emoji: "🚲", stock: 12 },
    { id: 4,  nombre: "BMX Freestyle 20\"",            precio: 750000,  precioOriginal: null,    categoria: "bicicletas", emoji: "🚲", stock: 6  },
    { id: 5,  nombre: "Bicicleta Eléctrica City",      precio: 4200000, precioOriginal: 4800000, categoria: "bicicletas", emoji: "⚡", stock: 3  },
    { id: 6,  nombre: "Bicicleta Plegable Compact",    precio: 980000,  precioOriginal: null,    categoria: "bicicletas", emoji: "🚲", stock: 7  },

    // Repuestos
    { id: 7,  nombre: "Llanta Montaña 29\"",           precio: 89000,   precioOriginal: null,    categoria: "repuestos",  emoji: "⭕", stock: 25 },
    { id: 8,  nombre: "Cadena Shimano 11V",            precio: 65000,   precioOriginal: 82000,   categoria: "repuestos",  emoji: "⛓️", stock: 30 },
    { id: 9,  nombre: "Kit de Frenos Disco",           precio: 145000,  precioOriginal: 180000,  categoria: "repuestos",  emoji: "🔧", stock: 15 },
    { id: 10, nombre: "Pedales Aluminio MTB",          precio: 78000,   precioOriginal: null,    categoria: "repuestos",  emoji: "🦶", stock: 20 },
    { id: 11, nombre: "Manubrio Riser 31.8mm",         precio: 95000,   precioOriginal: null,    categoria: "repuestos",  emoji: "🔩", stock: 18 },
    { id: 12, nombre: "Sillín Gel Comfort",            precio: 72000,   precioOriginal: 95000,   categoria: "repuestos",  emoji: "💺", stock: 22 },

    // Cascos
    { id: 13, nombre: "Casco MTB Ventilado",           precio: 125000,  precioOriginal: 159000,  categoria: "cascos",     emoji: "⛑️", stock: 14 },
    { id: 14, nombre: "Casco Ruta Aerodinámico",       precio: 189000,  precioOriginal: null,    categoria: "cascos",     emoji: "⛑️", stock: 9  },
    { id: 15, nombre: "Casco Urbano LED",              precio: 145000,  precioOriginal: 175000,  categoria: "cascos",     emoji: "⛑️", stock: 11 },
    { id: 16, nombre: "Casco Niño Dinosaurio",         precio: 69000,   precioOriginal: null,    categoria: "cascos",     emoji: "🦕", stock: 16 },

    // Accesorios
    { id: 17, nombre: "Luces LED Recargables",         precio: 45000,   precioOriginal: 59000,   categoria: "accesorios", emoji: "💡", stock: 35 },
    { id: 18, nombre: "Candado Cable Seguridad",       precio: 38000,   precioOriginal: null,    categoria: "accesorios", emoji: "🔒", stock: 28 },
    { id: 19, nombre: "Botella Térmica 750ml",         precio: 32000,   precioOriginal: null,    categoria: "accesorios", emoji: "🧴", stock: 40 },
    { id: 20, nombre: "Guantes Ciclismo Gel",          precio: 54000,   precioOriginal: 69000,   categoria: "accesorios", emoji: "🧤", stock: 20 },
    { id: 21, nombre: "Bomba de Aire Portátil",        precio: 28000,   precioOriginal: null,    categoria: "accesorios", emoji: "🌬️", stock: 30 },
    { id: 22, nombre: "Portacelular Bicicleta",        precio: 35000,   precioOriginal: 45000,   categoria: "accesorios", emoji: "📱", stock: 25 },
    { id: 23, nombre: "Kit Herramientas Multiuso",     precio: 42000,   precioOriginal: null,    categoria: "accesorios", emoji: "🔧", stock: 18 },
    { id: 24, nombre: "Mochila Ciclista 20L",          precio: 98000,   precioOriginal: 125000,  categoria: "accesorios", emoji: "🎒", stock: 10 },
];

// ===== Estado =====
let carrito = [];
let filtroActual = "todos";
let busquedaActual = "";

// ===== Elementos DOM =====
const productsGrid  = document.getElementById("productsGrid");
const cartToggle    = document.getElementById("cartToggle");
const cartBadge     = document.getElementById("cartBadge");
const cartPanel     = document.getElementById("cartPanel");
const cartBackdrop  = document.getElementById("cartBackdrop");
const cartClose     = document.getElementById("cartClose");
const cartBody      = document.getElementById("cartBody");
const cartBottom    = document.getElementById("cartBottom");
const totalAmount   = document.getElementById("totalAmount");
const buyBtn        = document.getElementById("buyBtn");
const modalBg       = document.getElementById("modalBg");
const modalDone     = document.getElementById("modalDone");
const searchInput   = document.getElementById("searchInput");
const searchBtn     = document.getElementById("searchBtn");
const sortSelect    = document.getElementById("sortSelect");
const menuToggle    = document.getElementById("menuToggle");
const mainNav       = document.getElementById("mainNav");
const contactForm   = document.getElementById("contactForm");

// ===== Formatear precio colombiano =====
function formatPrecio(precio) {
    return "$" + precio.toLocaleString("es-CO");
}

// ===== Obtener productos filtrados y buscados =====
function getProductosFiltrados() {
    let lista = [...productos];

    // Filtro por categoría
    if (filtroActual !== "todos") {
        lista = lista.filter(p => p.categoria === filtroActual);
    }

    // Filtro por búsqueda
    if (busquedaActual.trim()) {
        const termino = busquedaActual.toLowerCase().trim();
        lista = lista.filter(p =>
            p.nombre.toLowerCase().includes(termino) ||
            p.categoria.toLowerCase().includes(termino)
        );
    }

    // Ordenar
    const orden = sortSelect.value;
    if (orden === "precio-asc") {
        lista.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
        lista.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nombre") {
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return lista;
}

// ===== Renderizar productos =====
function renderProductos() {
    const filtrados = getProductosFiltrados();

    if (filtrados.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--muted);">
                <p style="font-size:2rem; margin-bottom:8px;">🔍</p>
                <p>No se encontraron productos</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filtrados.map(p => {
        const descuento = p.precioOriginal
            ? Math.round((1 - p.precio / p.precioOriginal) * 100)
            : 0;
        return `
        <div class="product-card" data-id="${p.id}">
            <div class="product-img">
                ${descuento > 0 ? `<span style="position:absolute;top:12px;left:12px;background:var(--danger);color:#fff;padding:3px 10px;border-radius:12px;font-size:0.72rem;font-weight:700;">-${descuento}%</span>` : ""}
                <span style="position:relative;">${p.emoji}</span>
            </div>
            <div class="product-body">
                <div class="product-cat">${p.categoria}</div>
                <div class="product-name">${p.nombre}</div>
                <div class="product-price">
                    ${formatPrecio(p.precio)}
                    ${p.precioOriginal ? `<span class="old">${formatPrecio(p.precioOriginal)}</span>` : ""}
                </div>
                <div class="product-stock">${p.stock > 5 ? "En stock" : `¡Solo quedan ${p.stock}!`}</div>
                <button class="btn-cart" data-id="${p.id}">Agregar al Carrito</button>
            </div>
        </div>
    `}).join("");

    // Hacer la imagen relativa para el badge de descuento
    document.querySelectorAll(".product-img").forEach(el => {
        el.style.position = "relative";
    });

    // Eventos
    document.querySelectorAll(".btn-cart").forEach(btn => {
        btn.addEventListener("click", () => agregarAlCarrito(Number(btn.dataset.id)));
    });
}

// ===== Carrito =====
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    abrirCarrito();

    // Animación visual
    const btn = document.querySelector(`.btn-cart[data-id="${id}"]`);
    if (btn) {
        btn.textContent = "¡Agregado! ✓";
        btn.style.background = "#2d6a4f";
        setTimeout(() => {
            btn.textContent = "Agregar al Carrito";
            btn.style.background = "";
        }, 1200);
    }
}

function actualizarCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    cartBadge.textContent = totalItems;

    if (carrito.length === 0) {
        cartBody.innerHTML = '<p class="empty-msg">No hay productos en tu carrito</p>';
        cartBottom.style.display = "none";
    } else {
        cartBody.innerHTML = carrito.map(item => `
            <div class="cart-item">
                <div class="cart-item-emoji">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">${formatPrecio(item.precio * item.cantidad)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" data-id="${item.id}" data-action="minus">−</button>
                        <span class="qty-val">${item.cantidad}</span>
                        <button class="qty-btn" data-id="${item.id}" data-action="plus">+</button>
                        <button class="btn-remove" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join("");

        cartBottom.style.display = "block";
        totalAmount.textContent = formatPrecio(totalPrecio);

        // Eventos cantidad
        document.querySelectorAll(".qty-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                cambiarCantidad(Number(btn.dataset.id), btn.dataset.action);
            });
        });

        document.querySelectorAll(".btn-remove").forEach(btn => {
            btn.addEventListener("click", () => eliminarDelCarrito(Number(btn.dataset.id)));
        });
    }
}

function cambiarCantidad(id, action) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    if (action === "plus") {
        item.cantidad++;
    } else {
        item.cantidad--;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(id);
            return;
        }
    }
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// ===== Abrir / Cerrar carrito =====
function abrirCarrito() {
    cartPanel.classList.add("open");
    cartBackdrop.classList.add("open");
}

function cerrarCarrito() {
    cartPanel.classList.remove("open");
    cartBackdrop.classList.remove("open");
}

// ===== Filtros =====
function activarFiltro(filtro) {
    filtroActual = filtro;
    document.querySelectorAll(".chip").forEach(c => {
        c.classList.toggle("active", c.dataset.filter === filtro);
    });
    renderProductos();
}

// ===== Eventos =====

// Carrito
cartToggle.addEventListener("click", abrirCarrito);
cartClose.addEventListener("click", cerrarCarrito);
cartBackdrop.addEventListener("click", cerrarCarrito);

// Comprar
buyBtn.addEventListener("click", () => {
    cerrarCarrito();
    modalBg.classList.add("open");
});
modalDone.addEventListener("click", () => {
    modalBg.classList.remove("open");
    carrito = [];
    actualizarCarrito();
});

// Filtros de chips
document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => activarFiltro(chip.dataset.filter));
});

// Filtros desde tarjetas de categoría
document.querySelectorAll(".cat-card").forEach(card => {
    card.addEventListener("click", () => {
        const cat = card.dataset.cat;
        activarFiltro(cat);
        document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
    });
});

// Búsqueda
searchInput.addEventListener("input", () => {
    busquedaActual = searchInput.value;
    renderProductos();
});
searchBtn.addEventListener("click", () => {
    busquedaActual = searchInput.value;
    renderProductos();
});

// Ordenamiento
sortSelect.addEventListener("change", renderProductos);

// Menú móvil
menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

// Links de navegación
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
    });
});

// Formulario de contacto
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.innerHTML = `
        <div style="text-align:center; padding:30px 0;">
            <p style="font-size:2rem; margin-bottom:8px;">✅</p>
            <p style="font-weight:600;">¡Mensaje enviado!</p>
            <p style="color:var(--muted); font-size:0.9rem; margin-top:4px;">Te responderemos pronto.</p>
        </div>
    `;
});

// ===== Inicializar =====
renderProductos();
