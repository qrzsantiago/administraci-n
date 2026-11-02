# Finanzas & Stock

App web local de administración financiera e inventario, pensada para usarse en **iPhone** como app de pantalla de inicio desde Safari. Todos los datos se guardan en el propio dispositivo (LocalStorage); no hay servidor ni cuentas.

## Secciones

- **Dashboard**: balance, por cobrar, por pagar, stock total, tarjetas/cuentas digitales, métricas de ventas e inventario.
- **Inventario y ventas**: productos con nombre libre, stock editable, ventas que descuentan unidades automáticamente (contado o a crédito).
- **Préstamos y deudas**: préstamos otorgados, ventas a crédito y deudas propias; estatus Pendiente/Abonado/Pagado, interés automático sobre saldo insoluto en cada corte (editable) e historial de abonos.
- **Gastos**: vistas semanal, quincenal, mensual o personalizada, con historial continuo.
- **Reporte histórico**: todas las transacciones con filtros; cualquier registro se puede editar o eliminar.
- **Configuración**: moneda, saldo inicial, exportar/importar copia de seguridad (JSON).

## Publicarla y usarla en el iPhone

1. En GitHub abre **Settings → Pages**.
2. En *Build and deployment* elige **Deploy from a branch**, selecciona la rama (por ejemplo `main`) y la carpeta **/ (root)**, y guarda.
3. En un par de minutos estará disponible en `https://qrzsantiago.github.io/administraci-n/`.
4. Abre ese enlace en **Safari** en el iPhone, toca **Compartir** → **Agregar a pantalla de inicio** → **Agregar**.
5. Abre la app desde el ícono: se ejecuta a pantalla completa y funciona sin conexión después de la primera apertura.

> En iOS, la app instalada y Safari guardan sus datos **por separado**. Usa *Configuración → Exportar copia de seguridad* con regularidad (se guarda en Archivos / iCloud Drive) y *Importar datos* para moverlos.

## Archivos

- `index.html`: la aplicación completa (HTML/CSS/JS, Tailwind CSS y Lucide desde CDN).
- `manifest.webmanifest`, `icons/`, `splash/`: ícono y pantallas de inicio para iOS.
- `sw.js`: service worker para el modo sin conexión.
