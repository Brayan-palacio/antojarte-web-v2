import React, { useState, useMemo, useEffect } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  UtensilsCrossed,
  X,
  ZoomIn,
  Check,
  User,
  MapPin,
  MessageSquare,
  Hash
} from "lucide-react";

// --- SVG OFICIAL DE WHATSAPP (para usar como ícono) ---
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- ESTRUCTURA DE DATOS DE ANTOJARTE ---
const MENU_DATA = [
  {
    id: "crepas",
    categoria: "Crepas",
    icono: "🥞",
    descripcion: "Deliciosas crepas dulces o saladas preparadas al instante",
    productos: [
      {
        id: "c1",
        nombre: "Crepa con Nutella + Banano",
        precio: 8000,
        tipo: "dulce",
        descripcion: "Sabor clásico de Nutella cremosa combinada con rodajas de banano fresco.",
        imagenThumb: "/images/crepa-nutella-banano-thumb.jpg",
        imagenFull: "/images/crepa-nutella-banano-full.jpg"
      },
      {
        id: "c2",
        nombre: "Crepa con Nutella + Fresas",
        precio: 8000,
        tipo: "dulce",
        descripcion: "Irresistible combinación de Nutella y fresas seleccionadas.",
        imagenThumb: "/images/crepa-nutella-fresas-thumb.jpg",
        imagenFull: "/images/crepa-nutella-fresas-full.jpg"
      },
      {
        id: "c3",
        nombre: "Crepa Tentación",
        precio: 12000,
        tipo: "dulce",
        badge: "Más vendida",
        descripcion: "Nutella + fresas + banano + galleta Oreo triturada.",
        imagenThumb: "/images/crepa-tentacion.jpg",
        imagenFull: "/images/crepa-tentacion.jpg"
      },
      {
        id: "c4",
        nombre: "Crepa Especial",
        precio: 15000,
        tipo: "dulce",
        descripcion: "Nutella + fresas + selección premium de ingredientes de la casa.",
        imagenThumb: "/images/crepa-especial.jpg",
        imagenFull: "/images/crepa-especial.jpg"
      },
      {
        id: "c5",
        nombre: "Crepa de Pollo",
        precio: 13000,
        tipo: "salado",
        descripcion: "Pollo desmechado bañado en salsa especial de la casa con queso derretido.",
        imagenThumb: "/images/crepa-pollo-thumb.jpg",
        imagenFull: "/images/crepa-pollo-full.jpg"
      }
    ]
  },
  {
    id: "waffles",
    categoria: "Waffles",
    icono: "🧇",
    descripcion: "Waffles doraditos y crocantes por fuera, suaves por dentro",
    productos: [
      {
        id: "w1",
        nombre: "Waffle Fresa",
        precio: 10000,
        tipo: "dulce",
        descripcion: "Waffle crocante cubierto de Nutella abundante y fresas frescas.",
        imagenThumb: "/images/waffle-fresa.jpg",
        imagenFull: "/images/waffle-fresa.jpg"
      },
      {
        id: "w2",
        nombre: "Waffle Frutal",
        precio: 12000,
        tipo: "dulce",
        descripcion: "Combinación de fresas, banano, duraznos en almíbar y baño de chocolate.",
        imagenThumb: "/images/waffle-frutal.jpg",
        imagenFull: "/images/waffle-frutal.jpg"
      },
      {
        id: "w3",
        nombre: "Waffle Especial",
        precio: 15000,
        tipo: "dulce",
        descripcion: "Nutella + mezcla frutal abundante + detalles artesanales de la casa.",
        imagenThumb: "/images/waffle-especial.jpg",
        imagenFull: "/images/waffle-especial.jpg"
      },
      {
        id: "w4",
        nombre: "Waffle Ranchero",
        precio: 18000,
        tipo: "salado",
        badge: "Recomendado",
        descripcion: "Irresistible combinación salada con ingredientes seleccionados de la casa.",
        imagenThumb: "/images/waffle-ranchero.jpg",
        imagenFull: "/images/waffle-ranchero.jpg"
      }
    ]
  },
  {
    id: "sandwich",
    categoria: "Sándwiches",
    icono: "🥪",
    descripcion: "Pan tostado con ingredientes frescos y salsas artesanales",
    productos: [
      {
        id: "s1",
        nombre: "Sándwich Clásico",
        precio: 7000,
        tipo: "salado",
        descripcion: "Jamón superior, queso gratinado y la tradicional salsa especial Antojarte.",
        imagenThumb: "/images/sandwich-clasico.jpg",
        imagenFull: "/images/sandwich-clasico.jpg"
      },
      {
        id: "s2",
        nombre: "Sándwich de Pollo",
        precio: 12500,
        tipo: "salado",
        descripcion: "Pollo desmechado jugoso, queso derretido, maíz tierno y salsa especial.",
        imagenThumb: "/images/sandwich-pollo.jpg",
        imagenFull: "/images/sandwich-pollo.jpg"
      }
    ]
  },
  {
    id: "bebidas",
    categoria: "Bebidas",
    icono: "🥤",
    descripcion: "Refrescos y bebidas frías para acompañar tus antojos",
    productos: [
      {
        id: "b1",
        nombre: "Milo Frío",
        precio: 7000,
        tipo: "dulce",
        descripcion: "Bebida espumosa y fría de Milo tradicional.",
        imagenThumb: "/images/milo-frio.jpg",
        imagenFull: "/images/milo-frio.jpg"
      },
      {
        id: "b2",
        nombre: "Malteada de Fresa",
        precio: 10000,
        tipo: "dulce",
        descripcion: "Cremosa malteada preparada con helado y fresas naturales.",
        imagenThumb: "/images/malteada-fresa.jpg",
        imagenFull: "/images/malteada-fresa.jpg"
      },
      {
        id: "b3",
        nombre: "Sodas Saborizadas",
        precio: 12000,
        tipo: "dulce",
        descripcion: "Soda refrescante. Elige tu sabor preferido: Frutos rojos o Lulo.",
        esSoda: true,
        saboresSoda: ["Frutos rojos", "Lulo"],
        imagenThumb: "/images/sodas-saborizadas.jpg",
        imagenFull: "/images/sodas-saborizadas.jpg"
      },
      {
        id: "b4",
        nombre: "Coca-Cola",
        precio: 4000,
        tipo: "otro",
        descripcion: "Lata / Botella personal fría.",
        imagenThumb: "/images/coca-cola.jpg",
        imagenFull: "/images/coca-cola.jpg"
      }
    ]
  }
];

const PRECIO_HELADO = 3000;
const ALTURA_BARRA_CATEGORIAS = 46;

// --- HORARIO OFICIAL COLOMBIA ---
function obtenerEstadoHorario() {
  const ahora = new Date();
  const opciones = { timeZone: "America/Bogota", hour12: false };
  const formatter = new Intl.DateTimeFormat("en-US", {
    ...opciones,
    weekday: "short",
    hour: "numeric",
    minute: "numeric"
  });

  const partes = formatter.formatToParts(ahora);
  let diaSemana = "";
  let hora = 0;
  let minuto = 0;

  partes.forEach((p) => {
    if (p.type === "weekday") diaSemana = p.value;
    if (p.type === "hour") hora = parseInt(p.value, 10) % 24;
    if (p.type === "minute") minuto = parseInt(p.value, 10);
  });

  const minutosActuales = hora * 60 + minuto;

  let inicioMinutos = 570;
  let proximaApertura = "Abre hoy 9:30 a. m.";

  if (diaSemana === "Sat") {
    inicioMinutos = 1020;
    proximaApertura = "Abre hoy 5:00 p. m.";
  } else if (diaSemana === "Sun") {
    inicioMinutos = 840;
    proximaApertura = "Abre hoy 2:00 p. m.";
  }

  const finMinutos = 1380;
  const estaAbierto = minutosActuales >= inicioMinutos && minutosActuales < finMinutos;

  if (estaAbierto) {
    return {
      abierto: true,
      texto: "Abierto",
      colorBadge: "bg-emerald-400"
    };
  } else {
    let mensajeApertura = proximaApertura;
    if (minutosActuales >= finMinutos) {
      if (diaSemana === "Fri") mensajeApertura = "Abre mañana 5:00 p. m.";
      else if (diaSemana === "Sat") mensajeApertura = "Abre mañana 2:00 p. m.";
      else mensajeApertura = "Abre mañana 9:30 a. m.";
    }
    return {
      abierto: false,
      texto: mensajeApertura,
      colorBadge: "bg-red-500"
    };
  }
}

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [tipoServicio, setTipoServicio] = useState("mesa");
  const [categoriaActiva, setCategoriaActiva] = useState("crepas");
  const [esQRDirecto, setEsQRDirecto] = useState(false);

  const [productoImagenModal, setProductoImagenModal] = useState(null);
  const [modalSoda, setModalSoda] = useState(null);
  const [modalCarritoAbierto, setModalCarritoAbierto] = useState(false);
  const [toast, setToast] = useState(null);

  const [numeroMesa, setNumeroMesa] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [observacionesGenerales, setObservacionesGenerales] = useState("");

  const [saborSodaSeleccionado, setSaborSodaSeleccionado] = useState("Frutos rojos");
  const [estadoHorario, setEstadoHorario] = useState(obtenerEstadoHorario());

  useEffect(() => {
    const timer = setInterval(() => {
      setEstadoHorario(obtenerEstadoHorario());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const mesaParam = searchParams.get("mesa");
    if (mesaParam) {
      setNumeroMesa(mesaParam);
      setTipoServicio("mesa");
      setEsQRDirecto(true);
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 1800);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const mostrarToast = (texto) => {
    setToast({ id: Date.now(), texto });
  };

  const calcularPrecioItem = (item) => {
    return item.precioBase * item.cantidad + (item.cantidadHelados || 0) * PRECIO_HELADO;
  };

  const agregarAlCarritoDirecto = (producto, categoriaId, saborCustom = null) => {
    if (producto.esSoda && !saborCustom) {
      setModalSoda(producto);
      setSaborSodaSeleccionado("Frutos rojos");
      return;
    }

    const esPermiteHelado = categoriaId === "crepas" || categoriaId === "waffles";
    const nombreFinal = saborCustom ? `Soda (${saborCustom})` : producto.nombre;

    setCarrito((prev) => {
      const itemExistente = prev.find(
        (item) => item.id === producto.id && item.nombre === nombreFinal
      );

      if (itemExistente) {
        return prev.map((item) =>
          item.idCart === itemExistente.idCart
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        const nuevoItem = {
          idCart: `${producto.id}-${Date.now()}`,
          id: producto.id,
          nombre: nombreFinal,
          precioBase: producto.precio,
          cantidad: 1,
          permiteHelado: esPermiteHelado,
          cantidadHelados: 0
        };
        return [...prev, nuevoItem];
      }
    });

    mostrarToast(`✓ ${nombreFinal} agregado`);
  };

  const cambiarCantidadHelados = (idCart, delta) => {
    setCarrito((prev) =>
      prev.map((item) => {
        if (item.idCart === idCart) {
          const actuales = item.cantidadHelados || 0;
          const nueva = Math.max(0, Math.min(item.cantidad, actuales + delta));
          return { ...item, cantidadHelados: nueva };
        }
        return item;
      })
    );
  };

  const actualizarCantidadCart = (idCart, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.idCart === idCart) {
            const nuevaCantidad = item.cantidad + delta;
            if (nuevaCantidad <= 0) return null;
            const heladosAjustados = Math.min(item.cantidadHelados || 0, nuevaCantidad);
            return {
              ...item,
              cantidad: nuevaCantidad,
              cantidadHelados: heladosAjustados
            };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalProductosCount = useMemo(() => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }, [carrito]);

  const totalPrecio = useMemo(() => {
    return carrito.reduce((acc, item) => {
      return acc + item.precioBase * item.cantidad + (item.cantidadHelados || 0) * PRECIO_HELADO;
    }, 0);
  }, [carrito]);

  const esFormularioValido = useMemo(() => {
    if (tipoServicio === "domicilio") {
      return nombreCliente.trim() !== "" && direccionEnvio.trim() !== "";
    }
    return true;
  }, [tipoServicio, nombreCliente, direccionEnvio]);

  const scrollToCategory = (catId) => {
    setCategoriaActiva(catId);
    const element = document.getElementById(`cat-${catId}`);
    if (element) {
      const yOffset = -(ALTURA_BARRA_CATEGORIAS + 8);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;
    if (!esFormularioValido) return;

    let mensaje = `*¡NUEVO PEDIDO - ANTOJARTE!* 🥞✨\n`;
    mensaje += `----------------------------------------\n`;

    if (tipoServicio === "mesa") {
      mensaje += `📍 *Modalidad:* EN MESA ${numeroMesa ? `#${numeroMesa}` : "(No especificada)"}\n`;
    } else if (tipoServicio === "domicilio") {
      mensaje += `🛵 *Modalidad:* DOMICILIO\n`;
      mensaje += `🏠 *Dirección:* ${direccionEnvio}\n`;
    } else {
      mensaje += `🛍️ *Modalidad:* PARA LLEVAR\n`;
    }

    if (nombreCliente) mensaje += `👤 *Cliente:* ${nombreCliente}\n`;
    mensaje += `----------------------------------------\n\n`;
    mensaje += `*DETALLE DEL PEDIDO:*\n`;

    carrito.forEach((item) => {
      const subtotalItem = calcularPrecioItem(item);
      mensaje += `\n*${item.cantidad}x ${item.nombre}* - $${subtotalItem.toLocaleString("es-CO")}\n`;

      if (item.cantidadHelados > 0) {
        const totalHelado = item.cantidadHelados * PRECIO_HELADO;
        const textoBola = item.cantidadHelados === 1 ? "bola" : "bolas";
        mensaje += `   └ ${item.cantidadHelados} ${textoBola} de helado (+$${totalHelado.toLocaleString("es-CO")})\n`;
      }
    });

    if (observacionesGenerales) {
      mensaje += `\n📝 *Observaciones:* ${observacionesGenerales}\n`;
    }

    mensaje += `\n----------------------------------------\n`;
    mensaje += `💰 *TOTAL A PAGAR:* *$${totalPrecio.toLocaleString("es-CO")}*\n`;
    mensaje += `----------------------------------------\n`;
    mensaje += `¡Muchas gracias! Quedo atento a la confirmación.`;

    const telefonoWhatsApp = "573226102915";
    const url = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-amber-50/40 text-stone-800 font-sans pb-32">

      {/* HEADER PRINCIPAL */}
      <header className="bg-[#7B1832] text-white shadow-md h-[52px]">
        <div className="max-w-md mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center text-[#7B1832] font-black text-lg shadow-inner ring-1 ring-amber-100/40">
              A
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide leading-tight">Antojarte</h1>
              <div className="flex items-center">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  estadoHorario.abierto
                    ? "bg-emerald-500/20 text-emerald-100"
                    : "bg-red-500/20 text-red-100"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${estadoHorario.colorBadge} ${estadoHorario.abierto ? "animate-pulse" : ""}`}></span>
                  {estadoHorario.texto}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#601226] p-1 rounded-xl flex text-xs font-semibold border border-red-900/40">
            <button
              onClick={() => setTipoServicio("mesa")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tipoServicio === "mesa"
                  ? "bg-amber-400 text-[#7B1832] font-extrabold shadow"
                  : "text-amber-100/80"
              }`}
            >
              Mesa
            </button>
            <button
              onClick={() => setTipoServicio("domicilio")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tipoServicio === "domicilio"
                  ? "bg-amber-400 text-[#7B1832] font-extrabold shadow"
                  : "text-amber-100/80"
              }`}
            >
              Domicilio
            </button>
            <button
              onClick={() => setTipoServicio("llevar")}
              className={`px-2 py-1 rounded-lg transition-all ${
                tipoServicio === "llevar"
                  ? "bg-amber-400 text-[#7B1832] font-extrabold shadow"
                  : "text-amber-100/80"
              }`}
            >
              Llevar
            </button>
          </div>
        </div>
      </header>

      {/* BARRA DE CATEGORÍAS STICKY */}
      <div className="sticky top-0 z-20 bg-[#6A142B] shadow-sm border-b border-red-900/30">
        <div className="relative max-w-md mx-auto">
          <nav className="h-[46px] px-3 overflow-x-auto no-scrollbar flex items-center gap-2 scroll-smooth">
            {MENU_DATA.map((cat) => {
              const esActiva = categoriaActiva === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`whitespace-nowrap pl-1 pr-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 flex-shrink-0 ${
                    esActiva
                      ? "bg-white text-[#7B1832] shadow-sm font-bold"
                      : "bg-[#550F22] text-amber-100/90 hover:bg-[#601226]"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    esActiva ? "bg-amber-100" : "bg-[#3D0A18]"
                  }`}>
                    {cat.icono}
                  </span>
                  <span>{cat.categoria}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#6A142B] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-md mx-auto px-4 pt-3 space-y-6">

        {/* BANNER DE MESA */}
        {tipoServicio === "mesa" && (
          <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-950 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#7B1832] flex items-center justify-center">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-100" />
              </div>
              {esQRDirecto ? (
                <span>Atendiendo en <strong>Mesa #{numeroMesa}</strong></span>
              ) : (
                <span>Pedido para consumir en <strong>Mesa</strong></span>
              )}
            </div>
            {!esQRDirecto && (
              <input
                type="number"
                placeholder="N°"
                value={numeroMesa}
                onChange={(e) => setNumeroMesa(e.target.value)}
                className="w-14 px-1.5 py-1 bg-white border border-amber-300 rounded-lg font-black text-center text-[#7B1832] focus:outline-none"
              />
            )}
          </div>
        )}

        {MENU_DATA.map((seccion) => (
          <section key={seccion.id} id={`cat-${seccion.id}`} className="space-y-3">
            {/* Encabezado de categoría con emoji en círculo */}
            <div className="flex items-center justify-between bg-gradient-to-r from-amber-100 to-transparent rounded-xl px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-lg ring-1 ring-amber-200">
                  {seccion.icono}
                </span>
                <h2 className="text-base font-extrabold text-[#7B1832]">{seccion.categoria}</h2>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                {seccion.productos.length} opciones
              </span>
            </div>

            {/* Grid de productos tipo Rappi */}
            <div className="grid grid-cols-2 gap-2.5">
              {seccion.productos.map((prod) => {
                const cantidadEnCarrito = carrito
                  .filter((item) => item.id === prod.id)
                  .reduce((acc, item) => acc + item.cantidad, 0);

                return (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_-4px_rgba(123,24,50,0.15)] border border-stone-200/60 flex flex-col"
                  >
                    <div
                      onClick={() => setProductoImagenModal({ ...prod, categoriaPertenece: seccion.id })}
                      className="relative w-full h-28 bg-gradient-to-br from-amber-100 to-amber-200 cursor-pointer group overflow-hidden"
                    >
                      <img
                        src={prod.imagenThumb}
                        alt={prod.nombre}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {prod.badge && (
                        <span className="absolute top-1.5 left-1.5 bg-amber-400 text-[#7B1832] text-[9px] font-black px-1.5 py-0.5 rounded-md shadow">
                          {prod.badge}
                        </span>
                      )}
                      {cantidadEnCarrito > 0 && (
                        <span className="absolute top-1.5 right-1.5 bg-emerald-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                          {cantidadEnCarrito}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full w-7 h-7 flex items-center justify-center shadow">
                          <ZoomIn className="w-3.5 h-3.5 text-[#7B1832]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 flex flex-col flex-1">
                      <h3 className="font-bold text-stone-800 text-xs leading-tight line-clamp-2 min-h-[28px]">
                        {prod.nombre}
                      </h3>
                      <p className="text-[10px] text-stone-500 line-clamp-2 mt-1 leading-tight flex-1">
                        {prod.descripcion}
                      </p>

                      <div className="flex items-center justify-between mt-2 gap-1">
                        <span className="bg-[#7B1832]/10 text-[#7B1832] font-black px-2 py-0.5 rounded-lg text-xs">
                          ${prod.precio.toLocaleString("es-CO")}
                        </span>

                        <button
                          onClick={() => agregarAlCarritoDirecto(prod, seccion.id)}
                          aria-label={`Agregar ${prod.nombre} al carrito`}
                          className={`${
                            cantidadEnCarrito > 0
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-[#7B1832] hover:bg-[#601226]"
                          } active:scale-90 text-white font-bold p-1.5 rounded-xl shadow-sm flex items-center justify-center transition-all w-8 h-8`}
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* CARRITO FLOTANTE */}
      {totalProductosCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              onClick={() => setModalCarritoAbierto(true)}
              className="w-full bg-[#7B1832] active:scale-98 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-red-900/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-[#7B1832]">
                    <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#7B1832] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#7B1832]">
                    {totalProductosCount}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-amber-200 uppercase tracking-wider font-semibold">
                    {totalProductosCount} {totalProductosCount === 1 ? "producto" : "productos"}
                  </p>
                  <p className="text-lg font-black leading-tight">
                    ${totalPrecio.toLocaleString("es-CO")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-400 text-[#7B1832] font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-sm">
                <span>Ver pedido</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-20 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
          <div
            key={toast.id}
            className="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200 max-w-md"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span className="truncate">{toast.texto}</span>
          </div>
        </div>
      )}

      {/* MODAL LIGHTBOX HD */}
      {productoImagenModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="relative h-64 bg-stone-900">
              <img
                src={productoImagenModal.imagenFull}
                alt={productoImagenModal.nombre}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setProductoImagenModal(null)}
                aria-label="Cerrar vista previa"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">
                    {productoImagenModal.nombre}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {productoImagenModal.descripcion}
                  </p>
                </div>
                <span className="text-base font-black text-[#7B1832]">
                  ${productoImagenModal.precio.toLocaleString("es-CO")}
                </span>
              </div>

              <button
                onClick={() => {
                  const prodTemp = productoImagenModal;
                  setProductoImagenModal(null);
                  agregarAlCarritoDirecto(prodTemp, prodTemp.categoriaPertenece);
                }}
                className="w-full bg-[#7B1832] active:scale-95 text-white font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>
                  {productoImagenModal.esSoda ? "Seleccionar sabor" : "Agregar al pedido"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SODA */}
      {modalSoda && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2.5">
              <div>
                <h3 className="font-bold text-[#7B1832] text-sm">Soda Saborizada</h3>
                <p className="text-[11px] text-stone-500">Selecciona tu sabor preferido</p>
              </div>
              <button
                onClick={() => setModalSoda(null)}
                aria-label="Cerrar"
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {modalSoda.saboresSoda.map((sabor) => (
                <button
                  key={sabor}
                  onClick={() => setSaborSodaSeleccionado(sabor)}
                  className={`p-3.5 rounded-xl text-xs font-bold border text-center transition-all ${
                    saborSodaSeleccionado === sabor
                      ? "bg-amber-100 border-[#7B1832] text-[#7B1832] shadow-sm"
                      : "bg-stone-50 border-stone-200 text-stone-600"
                  }`}
                >
                  {sabor}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const prodTemp = modalSoda;
                const saborTemp = saborSodaSeleccionado;
                setModalSoda(null);
                agregarAlCarritoDirecto(prodTemp, "bebidas", saborTemp);
              }}
              className="w-full bg-[#7B1832] text-white font-bold py-3.5 rounded-xl shadow text-xs"
            >
              Confirmar sabor
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT - HEADER Y FOOTER FIJOS */}
      {modalCarritoAbierto && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-200">

            {/* HEADER FIJO */}
            <div className="flex-shrink-0 flex justify-between items-center border-b border-stone-100 px-5 py-3 bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#7B1832]" />
                <h3 className="font-bold text-[#7B1832] text-base">Tu Pedido</h3>
                <span className="bg-[#7B1832]/10 text-[#7B1832] text-[10px] font-black px-2 py-0.5 rounded-full">
                  {totalProductosCount}
                </span>
              </div>
              <button
                onClick={() => setModalCarritoAbierto(false)}
                aria-label="Cerrar carrito"
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CUERPO SCROLLEABLE */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">

              {carrito.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="text-sm font-bold text-stone-700">Tu carrito está vacío</p>
                  <p className="text-xs text-stone-400 mt-1">Agrega algo rico del menú 🥞</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5">
                    {carrito.map((item) => (
                      <div
                        key={item.idCart}
                        className="bg-stone-50 p-3 rounded-xl border border-stone-200/70 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-stone-800 truncate">{item.nombre}</p>
                            <p className="text-xs font-bold text-[#7B1832] mt-0.5">
                              ${calcularPrecioItem(item).toLocaleString("es-CO")}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-1">
                            <button
                              onClick={() => actualizarCantidadCart(item.idCart, -1)}
                              aria-label="Disminuir cantidad"
                              className="w-6 h-6 flex items-center justify-center text-stone-600 font-bold hover:bg-stone-100 rounded"
                            >
                              {item.cantidad === 1 ? (
                                <Trash2 className="w-3 h-3 text-red-500" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                            </button>
                            <span className="text-xs font-extrabold w-4 text-center">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => actualizarCantidadCart(item.idCart, 1)}
                              aria-label="Aumentar cantidad"
                              className="w-6 h-6 flex items-center justify-center text-[#7B1832] font-bold hover:bg-amber-100 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {item.permiteHelado && (
                          <div className="pt-1.5 border-t border-stone-200/60 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-semibold text-stone-600 flex items-center gap-1.5">
                                <span>🍦</span>
                                <span>Bolas de helado</span>
                              </span>
                              <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-1">
                                <button
                                  onClick={() => cambiarCantidadHelados(item.idCart, -1)}
                                  disabled={(item.cantidadHelados || 0) === 0}
                                  aria-label="Quitar bola de helado"
                                  className="w-6 h-6 flex items-center justify-center text-stone-600 font-bold hover:bg-stone-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-extrabold w-4 text-center">
                                  {item.cantidadHelados || 0}
                                </span>
                                <button
                                  onClick={() => cambiarCantidadHelados(item.idCart, 1)}
                                  disabled={(item.cantidadHelados || 0) >= item.cantidad}
                                  aria-label="Agregar bola de helado"
                                  className="w-6 h-6 flex items-center justify-center text-[#7B1832] font-bold hover:bg-amber-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-stone-500">
                              <span>Máx. {item.cantidad} (una por unidad)</span>
                              {(item.cantidadHelados || 0) > 0 && (
                                <span className="font-bold text-[#7B1832]">
                                  +${((item.cantidadHelados || 0) * PRECIO_HELADO).toLocaleString("es-CO")}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* FORMULARIO DE CHECKOUT CON ÍCONOS */}
                  <div className="border-t border-stone-200 pt-3 space-y-3">
                    <p className="text-xs font-bold text-stone-700">Datos de la entrega</p>

                    <div className="space-y-2">
                      {tipoServicio === "mesa" && (
                        <div>
                          {numeroMesa ? (
                            <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-xl font-bold text-xs text-[#7B1832] text-center mb-2 flex items-center justify-center gap-1.5">
                              <Hash className="w-3.5 h-3.5" />
                              Atendiendo en Mesa {numeroMesa}
                            </div>
                          ) : null}
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Tu nombre (opcional)"
                              value={nombreCliente}
                              onChange={(e) => setNombreCliente(e.target.value)}
                              className="w-full text-xs p-2.5 pl-9 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1832]"
                            />
                          </div>
                        </div>
                      )}

                      {tipoServicio === "domicilio" && (
                        <div className="space-y-2">
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Tu nombre *"
                              value={nombreCliente}
                              onChange={(e) => setNombreCliente(e.target.value)}
                              className={`w-full text-xs p-2.5 pl-9 bg-stone-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1832] ${
                                !nombreCliente.trim() ? "border-amber-300" : "border-stone-200"
                              }`}
                            />
                          </div>
                          <div className="relative">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Dirección exacta de entrega *"
                              value={direccionEnvio}
                              onChange={(e) => setDireccionEnvio(e.target.value)}
                              className={`w-full text-xs p-2.5 pl-9 bg-stone-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1832] ${
                                !direccionEnvio.trim() ? "border-amber-300" : "border-stone-200"
                              }`}
                            />
                          </div>
                        </div>
                      )}

                      {tipoServicio === "llevar" && (
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="Tu nombre para llamar el pedido (opcional)"
                            value={nombreCliente}
                            onChange={(e) => setNombreCliente(e.target.value)}
                            className="w-full text-xs p-2.5 pl-9 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1832]"
                          />
                        </div>
                      )}

                      <div className="relative">
                        <MessageSquare className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                        <textarea
                          placeholder="Observaciones adicionales (opcional)..."
                          value={observacionesGenerales}
                          onChange={(e) => setObservacionesGenerales(e.target.value)}
                          rows={2}
                          className="w-full text-xs p-2.5 pl-9 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1832] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* FOOTER FIJO */}
            {carrito.length > 0 && (
              <div className="flex-shrink-0 border-t border-stone-200 px-5 py-3 space-y-2 bg-white shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center text-sm font-black text-stone-800">
                  <span>Total a pagar:</span>
                  <span className="text-lg text-[#7B1832]">
                    ${totalPrecio.toLocaleString("es-CO")}
                  </span>
                </div>

                <button
                  onClick={enviarPedidoWhatsApp}
                  disabled={!esFormularioValido}
                  className={`w-full font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all ${
                    esFormularioValido
                      ? "bg-emerald-600 active:scale-98 text-white"
                      : "bg-stone-300 text-stone-500 cursor-not-allowed opacity-80"
                  }`}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Enviar pedido por WhatsApp</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}