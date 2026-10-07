# 🥞 Antojarte - Menú Digital v2

Aplicación web **mobile-first** para el negocio de crepas, waffles, sándwiches y bebidas **Antojarte**. Permite a los clientes explorar el menú, personalizar sus pedidos y enviarlos directamente por WhatsApp.

> **Esta es la versión 2 (v2)** — una mejora del menú original con experiencia de usuario más ágil, mejor jerarquía visual y adiciones por unidad (helado).

---

## 🚀 Demo

- **Producción v2**: [https://antojarte-v2.netlify.app](https://antojarte.netlify.app/)
- **Versión original (v1)**: [antojarte-menu.netlify.app](https://antojarte-menu.netlify.app)

---

## 📌 Características principales

### 🍽️ Catálogo
- Menú organizado por categorías: **Crepas, Waffles, Sándwiches, Bebidas**
- Barra de categorías *sticky* que permanece visible durante el scroll
- Scroll suave entre categorías con offset correcto
- Grid de productos tipo Rappi (foto grande + info)
- Lightbox con imagen en alta resolución al tocar cada producto
- Badges de "Más vendida" / "Recomendado"

### 🛒 Carrito inteligente
- Agregar / quitar productos con contador por ítem
- **Adición de helado por unidad** (solo en crepas y waffles):
  - Puedes pedir 3 crepas y solo 1 con helado
  - El total se calcula correctamente: `(precioBase × cantidad) + (helados × $3.000)`
- Persistencia visual del estado del carrito (badge de cantidad sobre la foto)
- Toast de confirmación al agregar
- Empty state cuando el carrito está vacío

### 🍹 Personalización
- Selección de sabor para **Sodas Saborizadas**
- Observaciones generales para el pedido
- Opción de servicio: **Mesa / Domicilio / Llevar**

### 📱 Flujo de pedido
- Lectura automática de mesa vía QR: `?mesa=X`
- Validación de formulario para domicilio (nombre + dirección obligatorios)
- Envío estructurado a WhatsApp con formato legible
- Horario de atención dinámico según zona horaria de Colombia (`America/Bogota`)

### 🎨 Diseño
- Enfoque *mobile-first*
- Paleta de marca: vino `#7B1832` + ámbar
- Iconografía consistente (Lucide + SVG oficial de WhatsApp)
- Animaciones sutiles y microinteracciones

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| **React 18** | UI y estado |
| **Vite** | Build tool y dev server |
| **Tailwind CSS** | Estilos utility-first |
| **Lucide React** | Iconografía |
| **WhatsApp Web API** | Envío de pedidos (`wa.me`) |
| **Netlify** | Hosting y deploy continuo |

---

## 📦 Instalación local

### Requisitos
- Node.js 18+
- npm o pnpm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Brayan-palacio/antojarte-web-v2.git
cd antojarte-web-v2

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Previsualizar el build de producción
npm run lint     # Ejecutar linter (oxlint)
```

---

## 🗂️ Estructura del proyecto

```
antojarte-web-v2/
├── public/               # Archivos estáticos (favicon, imágenes)
├── src/
│   ├── App.jsx          # Componente principal con toda la lógica
│   ├── main.jsx         # Entry point de React
│   └── index.css        # Estilos globales + Tailwind
├── index.html           # HTML base
├── package.json
├── vite.config.js
└── README.md
```

> Toda la lógica vive en `src/App.jsx` por simplicidad: menú, carrito, modales, horarios y envío a WhatsApp.

---

## ⚙️ Configuración

### Número de WhatsApp

El número destino está en `src/App.jsx`, función `enviarPedidoWhatsApp`:

```js
const telefonoWhatsApp = "573226102915"; // +57 322 610 2915
```

### Horario de atención

Definido en la función `obtenerEstadoHorario()`:

| Día | Apertura | Cierre |
|-----|----------|--------|
| Lunes a Viernes | 9:30 AM | 11:00 PM |
| Sábado | 5:00 PM | 11:00 PM |
| Domingo | 2:00 PM | 11:00 PM |

### Menú y precios

Todo el catálogo está en la constante `MENU_DATA` al inicio del archivo `App.jsx`. Modifica ahí para actualizar productos.

### Adiciones

Precio del helado adicional:

```js
const PRECIO_HELADO = 3000;
```

---

## 🔗 Sistema de QR para mesas

La app detecta automáticamente el número de mesa desde el parámetro URL:

```
https://antojarte-v2.netlify.app/?mesa=5
```

**Recomendaciones para generar QR:**
- Usa [QR Code Monkey](https://www.qrcode-monkey.com/) o [qr.io](https://qr.io/)
- Tamaño mínimo: **5×5 cm** para lectura fácil
- Material: acrílico o sticker resistente al agua
- Prueba cada QR con el celular **antes de imprimir**

---

## 🚀 Deploy

### Netlify (automático)

Este proyecto está conectado a Netlify con deploy continuo:

1. Cualquier push a `main` → deploy automático a producción
2. Cualquier push a otra rama → *branch deploy* (útil para previews)

### Manual

```bash
npm run build
# Sube la carpeta /dist a cualquier hosting estático
```

---

## 🧪 Checklist de pruebas

Antes de publicar cambios importantes, verifica:

- [ ] Carga correcta del menú en mobile y desktop
- [ ] Barra de categorías permanece sticky durante el scroll
- [ ] Scroll a categoría posiciona el título bajo la barra
- [ ] Adición de helado por unidad funciona en todas las cantidades
- [ ] Total general coincide con la suma de subtotales
- [ ] WhatsApp se abre con el formato correcto
- [ ] QR `?mesa=X` muestra la mesa correcta
- [ ] Formulario de domicilio exige nombre y dirección
- [ ] Sabores de soda se seleccionan correctamente
- [ ] Lightbox de imagen abre y cierra bien

---

## 📝 Notas de la versión v2

Mejoras respecto a la v1:

- ✅ Header estático (no sticky) con barra de categorías sticky en `top-0`
- ✅ Adición de helado **por unidad** (antes se aplicaba a todas las unidades del mismo ítem)
- ✅ Texto de WhatsApp con singular/plural correcto para helados
- ✅ Grid de productos tipo Rappi (2 columnas con foto grande)
- ✅ Toast de confirmación al agregar al carrito
- ✅ Empty state del carrito
- ✅ Modal de carrito con header/footer fijos
- ✅ SVG oficial de WhatsApp en botón de envío
- ✅ Íconos en inputs (usuario, dirección, observaciones)
- ✅ Categorías con emojis dentro de círculos ámbar
- ✅ Chip de estado "Abierto/Cerrado" en el header

---

## 👨‍💻 Autor

**Brayan Palacio**
- GitHub: [@Brayan-palacio](https://github.com/Brayan-palacio)

---

## 📄 Licencia

Este proyecto es de uso privado para el negocio **Antojarte**. No está licenciado para uso comercial por terceros.

---

## 💬 Soporte

Para reportar un bug o sugerir una mejora, abre un **issue** en el repositorio o contacta al desarrollador directamente.

---

**Hecho con ❤️ para Antojarte** 🥞🧇🥪🥤
