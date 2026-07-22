# Gasolinapp

Calculadora estática del coste de combustible de un viaje. La aplicación consulta desde el navegador la API pública del Ministerio, normaliza los precios y calcula la media de la provincia seleccionada para una distancia manual, o la media de las estaciones situadas en un corredor de 15 km alrededor de una ruta calculada.

El selector de vehículos utiliza un catálogo local generado a partir de los datos abiertos de la Agencia Europea de Medio Ambiente (EEA). Incluye 7.079 combinaciones de año, marca, modelo y motorización registradas en España entre 2022 y 2025. El consumo homologado puede editarse y se ajusta de forma orientativa según la velocidad media indicada; en las rutas se propone automáticamente la velocidad media calculada con la distancia y duración de OSRM.

La versión estática está formada por `index.html`, `styles.css`, `app.js` y los recursos de `public/`, incluido `public/eea-vehicles.json`. No necesita Node, React, variables de entorno ni un backend propio.

## Probar en local

Desde este directorio:

```bash
python3 -m http.server 8080
```

Después abre `http://localhost:8080`. Conviene usar un servidor estático en lugar de abrir el HTML mediante `file://`, para reproducir el despliegue real.

## Desplegar

Publica la raíz de este directorio en GitHub Pages, Netlify, Cloudflare Pages, S3 o cualquier servidor de ficheros estáticos. No hay comando de build.
