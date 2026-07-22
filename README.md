# Gasolinapp

Calculadora estática del coste de combustible de un viaje. La aplicación consulta desde el navegador la API pública del Ministerio, normaliza los precios y calcula la media de la provincia seleccionada para una distancia manual, o la media de las estaciones situadas en un corredor de 15 km alrededor de una ruta calculada.

La versión estática está formada por `index.html`, `styles.css`, `app.js` y los recursos gráficos de `public/`. No necesita Node, React, variables de entorno ni un backend propio.

## Probar en local

Desde este directorio:

```bash
python3 -m http.server 8080
```

Después abre `http://localhost:8080`. Conviene usar un servidor estático en lugar de abrir el HTML mediante `file://`, para reproducir el despliegue real.

## Desplegar

Publica la raíz de este directorio en GitHub Pages, Netlify, Cloudflare Pages, S3 o cualquier servidor de ficheros estáticos. No hay comando de build.
