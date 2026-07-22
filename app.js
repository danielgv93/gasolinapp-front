const API_URL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvinciaProducto";
const ROUTE_API_URL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProducto";
const ROUTE_CORRIDOR_KM = 15;
const VEHICLE_DATA_URL = "./public/eea-vehicles.json";

const provincias = [
  [2,"Albacete"],[3,"Alicante"],[4,"Almería"],[1,"Araba/Álava"],[33,"Asturias"],[5,"Ávila"],
  [6,"Badajoz"],[7,"Baleares"],[8,"Barcelona"],[48,"Bizkaia"],[9,"Burgos"],[10,"Cáceres"],
  [11,"Cádiz"],[39,"Cantabria"],[12,"Castellón / Castelló"],[51,"Ceuta"],[13,"Ciudad Real"],
  [14,"Córdoba"],[15,"A Coruña"],[16,"Cuenca"],[20,"Gipuzkoa"],[17,"Girona"],[18,"Granada"],
  [19,"Guadalajara"],[21,"Huelva"],[22,"Huesca"],[23,"Jaén"],[24,"León"],[25,"Lleida"],
  [27,"Lugo"],[28,"Madrid"],[29,"Málaga"],[52,"Melilla"],[30,"Murcia"],[31,"Navarra"],
  [32,"Ourense"],[34,"Palencia"],[35,"Las Palmas"],[36,"Pontevedra"],[26,"La Rioja"],
  [37,"Salamanca"],[38,"Santa Cruz de Tenerife"],[40,"Segovia"],[41,"Sevilla"],[42,"Soria"],
  [43,"Tarragona"],[44,"Teruel"],[45,"Toledo"],[46,"Valencia / València"],[47,"Valladolid"],
  [49,"Zamora"],[50,"Zaragoza"]
];

const fuelNames = { "1": "Gasolina 95", "3": "Gasolina 98", "4": "Diésel A" };
const state = {
  provincia: "", producto: "1", precio: null, controller: null,
  distanceMode: "manual", routeDistance: null, routeDuration: null, routeCoordinates: [], places: { origin: null, destination: null },
  map: null, markers: {}, routeLayer: null, routeController: null,
  placeSearchControllers: {}, placeSearchTimers: {}, placeResults: {}, activePlaceResult: {},
  vehicleCatalog: [], vehicleOptions: [], selectedVehicle: null
};

const elements = {
  provincia: document.querySelector("#provincia"),
  fuelOptions: document.querySelector("#fuel-options"),
  kilometros: document.querySelector("#kilometros"),
  kilometrosRange: document.querySelector("#kilometros-range"),
  consumo: document.querySelector("#consumo"),
  consumoRange: document.querySelector("#consumo-range"),
  velocidad: document.querySelector("#velocidad"),
  velocidadRange: document.querySelector("#velocidad-range"),
  consumptionEstimate: document.querySelector("#consumption-estimate"),
  consumptionSummary: document.querySelector("#consumption-summary"),
  status: document.querySelector("#status"),
  totalPrice: document.querySelector("#total-price"),
  fuelPrice: document.querySelector("#fuel-price"),
  litres: document.querySelector("#litres"),
  distanceSummary: document.querySelector("#distance-summary"),
  totalSummary: document.querySelector("#total-summary"),
  resultSummary: document.querySelector("#result-summary"),
  updateNote: document.querySelector("#update-note"),
  retry: document.querySelector("#retry")
};

Object.assign(elements, {
  distanceModes: document.querySelector(".distance-modes"),
  manualDistancePanel: document.querySelector("#manual-distance-panel"),
  routeDistancePanel: document.querySelector("#route-distance-panel"),
  roundTrip: document.querySelector("#round-trip"),
  origin: document.querySelector("#origin"),
  destination: document.querySelector("#destination"),
  originResults: document.querySelector("#origin-results"),
  destinationResults: document.querySelector("#destination-results"),
  routeStatus: document.querySelector("#route-status")
});

Object.assign(elements, {
  vehicleYear: document.querySelector("#vehicle-year"),
  vehicleMake: document.querySelector("#vehicle-make"),
  vehicleModel: document.querySelector("#vehicle-model"),
  vehicleVersion: document.querySelector("#vehicle-version"),
  vehicleDataStatus: document.querySelector("#vehicle-data-status"),
  priceReferenceStep: document.querySelector("#price-reference-step"),
  fuelPriceLabel: document.querySelector("#fuel-price-label")
});

const money = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const decimal = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const distanceNumber = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 });

function init() {
  loadVehicleCatalog();
  provincias.forEach(([id, nombre]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = nombre;
    elements.provincia.append(option);
  });

  elements.provincia.addEventListener("change", () => {
    state.provincia = elements.provincia.value;
    requestPrice();
  });

  elements.fuelOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-product]");
    if (!button) return;
    state.producto = button.dataset.product;
    document.querySelectorAll(".fuel-option").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", selected);
    });
    if (state.distanceMode === "route" ? state.routeCoordinates.length : state.provincia) requestPrice();
  });

  bindRange(elements.kilometros, elements.kilometrosRange);
  bindRange(elements.consumo, elements.consumoRange);
  bindRange(elements.velocidad, elements.velocidadRange);
  elements.vehicleYear.addEventListener("change", populateVehicleMakes);
  elements.vehicleMake.addEventListener("change", populateVehicleModels);
  elements.vehicleModel.addEventListener("change", populateVehicleVersions);
  elements.vehicleVersion.addEventListener("change", selectVehicleVersion);
  elements.distanceModes.addEventListener("click", handleDistanceMode);
  elements.roundTrip.addEventListener("change", updateCalculation);
  ["origin", "destination"].forEach((kind) => {
    elements[kind].addEventListener("input", () => {
      clearTimeout(state.placeSearchTimers[kind]);
      state.placeSearchControllers[kind]?.abort();
      state.places[kind] = null;
      state.placeResults[kind] = [];
      state.routeDistance = null;
      state.routeDuration = null;
      state.routeCoordinates = [];
      state.precio = null;
      if (state.markers[kind]) {
        state.markers[kind].remove();
        delete state.markers[kind];
      }
      clearRoute();
      hidePlaceResults(kind);
      const query = elements[kind].value.trim();
      if (query.length < 3) {
        setRouteStatus("Escribe al menos 3 caracteres para buscar.");
      } else {
        state.placeSearchTimers[kind] = setTimeout(() => searchPlace(kind, query), 300);
        setRouteStatus(`Buscando ${kind === "origin" ? "el origen" : "el destino"}…`);
      }
      requestPrice();
    });
    elements[kind].addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        movePlaceResult(kind, event.key === "ArrowDown" ? 1 : -1);
      } else if (event.key === "Enter" && state.activePlaceResult[kind] >= 0) {
        event.preventDefault();
        selectPlace(kind, state.placeResults[kind][state.activePlaceResult[kind]]);
      } else if (event.key === "Escape") {
        hidePlaceResults(kind);
      }
    });
  });
  elements.retry.addEventListener("click", requestPrice);
  updateCalculation();
}

async function loadVehicleCatalog() {
  try {
    const response = await fetch(VEHICLE_DATA_URL);
    if (!response.ok) throw new Error(`Respuesta ${response.status}`);
    const data = await response.json();
    state.vehicleCatalog = Array.isArray(data.vehicles) ? data.vehicles : [];
    if (!state.vehicleCatalog.length) throw new Error("Catálogo vacío");

    const years = [...new Set(state.vehicleCatalog.map((vehicle) => vehicle.y))].sort((a, b) => b - a);
    setSelectOptions(elements.vehicleYear, years.map((year) => [year, year]), "Selecciona un año");
    elements.vehicleYear.disabled = false;
    elements.vehicleYear.value = String(years[0]);
    elements.vehicleDataStatus.textContent = `${state.vehicleCatalog.length.toLocaleString("es-ES")} motorizaciones registradas en España · Fuente: EEA.`;
    populateVehicleMakes();
  } catch (error) {
    elements.vehicleYear.replaceChildren(new Option("Datos no disponibles", ""));
    elements.vehicleDataStatus.textContent = "No se ha podido cargar el catálogo EEA. Puedes introducir el consumo manualmente.";
    elements.vehicleDataStatus.classList.add("error");
  }
}

function setSelectOptions(select, options, placeholder) {
  select.replaceChildren(new Option(placeholder, ""));
  options.forEach(([value, label]) => select.add(new Option(label, value)));
}

function populateVehicleMakes() {
  state.selectedVehicle = null;
  const year = Number(elements.vehicleYear.value);
  const makes = [...new Set(state.vehicleCatalog.filter((vehicle) => vehicle.y === year).map((vehicle) => vehicle.b))]
    .sort((a, b) => a.localeCompare(b, "es"));
  setSelectOptions(elements.vehicleMake, makes.map((make) => [make, formatVehicleName(make)]), "Selecciona una marca");
  elements.vehicleMake.disabled = !year;
  setSelectOptions(elements.vehicleModel, [], "Selecciona un modelo");
  setSelectOptions(elements.vehicleVersion, [], "Selecciona una motorización");
  elements.vehicleModel.disabled = true;
  elements.vehicleVersion.disabled = true;
}

function populateVehicleModels() {
  state.selectedVehicle = null;
  const year = Number(elements.vehicleYear.value);
  const make = elements.vehicleMake.value;
  const models = [...new Set(state.vehicleCatalog
    .filter((vehicle) => vehicle.y === year && vehicle.b === make)
    .map((vehicle) => vehicle.m))]
    .sort((a, b) => a.localeCompare(b, "es"));
  setSelectOptions(elements.vehicleModel, models.map((model) => [model, formatVehicleName(model)]), "Selecciona un modelo");
  elements.vehicleModel.disabled = !make;
  setSelectOptions(elements.vehicleVersion, [], "Selecciona una motorización");
  elements.vehicleVersion.disabled = true;
}

function populateVehicleVersions() {
  state.selectedVehicle = null;
  const year = Number(elements.vehicleYear.value);
  const make = elements.vehicleMake.value;
  const model = elements.vehicleModel.value;
  state.vehicleOptions = state.vehicleCatalog
    .filter((vehicle) => vehicle.y === year && vehicle.b === make && vehicle.m === model)
    .sort((a, b) => (a.e || 0) - (b.e || 0) || (a.p || 0) - (b.p || 0));
  setSelectOptions(elements.vehicleVersion, state.vehicleOptions.map((vehicle, index) => [index, formatVehicleVersion(vehicle)]), "Selecciona una motorización");
  elements.vehicleVersion.disabled = !model;
}

function selectVehicleVersion() {
  const index = Number(elements.vehicleVersion.value);
  const vehicle = state.vehicleOptions[index];
  if (!vehicle || elements.vehicleVersion.value === "") return;
  state.selectedVehicle = vehicle;
  setRangeValue(elements.consumo, elements.consumoRange, vehicle.c);
  selectFuelProduct(vehicle.f.startsWith("diesel") ? "4" : "1");
  const registrations = Number(vehicle.n) || 0;
  elements.vehicleDataStatus.textContent = `Consumo EEA: ${decimal.format(vehicle.c)} L/100 km${registrations ? ` · ${registrations.toLocaleString("es-ES")} matriculaciones de referencia` : ""}. Puedes modificarlo manualmente.`;
  updateCalculation();
}

function formatVehicleName(value) {
  return value.toLocaleLowerCase("es").replace(/(^|[\s\-/])\p{L}/gu, (letter) => letter.toLocaleUpperCase("es"));
}

function formatVehicleVersion(vehicle) {
  const fuel = vehicle.f === "diesel" ? "Diésel" : vehicle.f === "petrol" ? "Gasolina" : vehicle.f.startsWith("diesel") ? "Híbrido diésel" : "Híbrido gasolina";
  const details = [];
  if (vehicle.e) details.push(`${(vehicle.e / 1000).toLocaleString("es-ES", { maximumFractionDigits: 1 })} L`);
  if (vehicle.p) details.push(`${vehicle.p} kW / ${Math.round(vehicle.p * 1.35962)} CV`);
  details.push(fuel, `${decimal.format(vehicle.c)} L/100 km`);
  return details.join(" · ");
}

function selectFuelProduct(product) {
  const button = elements.fuelOptions.querySelector(`[data-product="${product}"]`);
  if (button) button.click();
}

function setRangeValue(numberInput, rangeInput, value) {
  numberInput.value = value;
  rangeInput.value = Math.max(Number(rangeInput.min), Math.min(Number(rangeInput.max), value));
  paintRange(rangeInput);
}

function handleDistanceMode(event) {
  const button = event.target.closest("[data-distance-mode]");
  if (!button || button.dataset.distanceMode === state.distanceMode) return;
  state.distanceMode = button.dataset.distanceMode;
  document.querySelectorAll("[data-distance-mode]").forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", active);
  });
  elements.manualDistancePanel.hidden = state.distanceMode !== "manual";
  elements.routeDistancePanel.hidden = state.distanceMode !== "route";
  elements.priceReferenceStep.hidden = state.distanceMode === "route";
  elements.fuelPriceLabel.textContent = state.distanceMode === "route" ? "Precio en ruta" : "Precio medio";
  state.precio = null;
  elements.updateNote.textContent = "El precio se obtiene de la fuente oficial del Ministerio.";
  if (state.distanceMode === "route") {
    initMap();
    setTimeout(() => state.map?.invalidateSize(), 0);
  }
  requestPrice();
  updateCalculation();
}

function initMap() {
  if (state.map || typeof L === "undefined") {
    if (typeof L === "undefined") setRouteStatus("No se ha podido cargar el mapa. Revisa tu conexión.", "error");
    return;
  }
  state.map = L.map("route-map", { scrollWheelZoom: false, zoomControl: false }).setView([40.25, -3.7], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(state.map);
}

function hidePlaceResults(kind) {
  elements[`${kind}Results`].hidden = true;
  elements[kind].setAttribute("aria-expanded", "false");
  elements[kind].removeAttribute("aria-activedescendant");
  state.activePlaceResult[kind] = -1;
}

function movePlaceResult(kind, direction) {
  const results = state.placeResults[kind] || [];
  if (!results.length) return;
  const current = state.activePlaceResult[kind] ?? -1;
  const next = (current + direction + results.length) % results.length;
  state.activePlaceResult[kind] = next;
  const optionId = `${kind}-result-${next}`;
  elements[kind].setAttribute("aria-activedescendant", optionId);
  elements[`${kind}Results`].querySelectorAll(".place-result").forEach((button, index) => {
    button.classList.toggle("active", index === next);
    button.setAttribute("aria-selected", String(index === next));
  });
}

async function searchPlace(kind, query = elements[kind].value.trim()) {
  const input = elements[kind];
  if (query.length < 3) {
    hidePlaceResults(kind);
    return;
  }

  const controller = new AbortController();
  state.placeSearchControllers[kind] = controller;
  try {
    const params = new URLSearchParams({ q: query, limit: "5" });
    const response = await fetch(`https://photon.komoot.io/api/?${params}`, {
      headers: { Accept: "application/json" }, signal: controller.signal
    });
    if (!response.ok) throw new Error(`Respuesta ${response.status}`);
    const data = await response.json();
    const results = data.features.map((feature) => ({
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
      label: formatPlaceLabel(feature.properties)
    }));
    if (input.value.trim() !== query || state.placeSearchControllers[kind] !== controller) return;
    renderPlaceResults(kind, results);
    setRouteStatus(results.length ? "Selecciona uno de los resultados." : "No hemos encontrado ese lugar. Prueba con otra búsqueda.", results.length ? "" : "error");
  } catch (error) {
    if (error.name === "AbortError") return;
    setRouteStatus("No hemos podido buscar el lugar. Inténtalo de nuevo.", "error");
  } finally {
    if (state.placeSearchControllers[kind] === controller) delete state.placeSearchControllers[kind];
  }
}

function formatPlaceLabel(properties) {
  const parts = [
    properties.name,
    [properties.street, properties.housenumber].filter(Boolean).join(" "),
    properties.district,
    properties.city || properties.town || properties.village,
    properties.county,
    properties.state,
    properties.country
  ];
  return [...new Set(parts.filter(Boolean))].join(", ");
}

function renderPlaceResults(kind, results) {
  const container = elements[`${kind}Results`];
  container.replaceChildren();
  state.placeResults[kind] = results;
  state.activePlaceResult[kind] = -1;
  results.forEach((result) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "place-result";
    button.id = `${kind}-result-${container.childElementCount}`;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", "false");
    button.textContent = result.label;
    button.addEventListener("click", () => selectPlace(kind, result));
    container.append(button);
  });
  container.hidden = !results.length;
  elements[kind].setAttribute("aria-expanded", String(results.length > 0));
}

function selectPlace(kind, result) {
  const place = { lat: Number(result.lat), lon: Number(result.lon), label: result.label };
  state.places[kind] = place;
  elements[kind].value = result.label;
  hidePlaceResults(kind);
  initMap();
  if (state.map) {
    if (state.markers[kind]) state.markers[kind].remove();
    state.markers[kind] = L.circleMarker([place.lat, place.lon], {
      radius: 7,
      color: "#fff",
      weight: 3,
      fillColor: kind === "origin" ? "#18a667" : "#ee8b4b",
      fillOpacity: 1
    }).addTo(state.map).bindPopup(kind === "origin" ? "Origen" : "Destino");
    state.map.setView([place.lat, place.lon], 11);
  }
  if (state.places.origin && state.places.destination) calculateRoute();
  else setRouteStatus(`${kind === "origin" ? "Origen" : "Destino"} seleccionado. Ahora busca ${kind === "origin" ? "el destino" : "el origen"}.`);
}

async function calculateRoute() {
  const { origin, destination } = state.places;
  if (state.routeController) state.routeController.abort();
  if (state.controller) state.controller.abort();
  state.routeController = new AbortController();
  state.routeDistance = null;
  state.routeCoordinates = [];
  state.precio = null;
  setStatus("idle", "Calculando ruta");
  setRouteStatus("Calculando la ruta por carretera…");
  updateCalculation();
  try {
    const coordinates = `${origin.lon},${origin.lat};${destination.lon},${destination.lat}`;
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`, { signal: state.routeController.signal });
    if (!response.ok) throw new Error(`Respuesta ${response.status}`);
    const data = await response.json();
    if (data.code !== "Ok" || !data.routes?.length) throw new Error("Sin ruta");
    const route = data.routes[0];
    state.routeDistance = route.distance / 1000;
    state.routeDuration = route.duration;
    state.routeCoordinates = route.geometry.coordinates;
    const averageSpeed = route.duration > 0 ? Math.round(state.routeDistance / (route.duration / 3600)) : null;
    if (averageSpeed) setRangeValue(elements.velocidad, elements.velocidadRange, Math.max(20, Math.min(160, averageSpeed)));
    drawRoute(route.geometry);
    setRouteStatus(`Ruta calculada: ${distanceNumber.format(state.routeDistance)} km de ida${averageSpeed ? ` · ${averageSpeed} km/h de media estimada` : ""}.`, "success");
    requestPrice();
  } catch (error) {
    if (error.name === "AbortError") return;
    state.routeDistance = null;
    state.routeDuration = null;
    state.routeCoordinates = [];
    state.precio = null;
    clearRoute();
    setRouteStatus("No hemos podido calcular una ruta por carretera entre esos lugares.", "error");
    updateCalculation();
  }
}

function drawRoute(geometry) {
  if (!state.map) return;
  if (state.routeLayer) state.routeLayer.remove();
  state.routeLayer = L.geoJSON(geometry, { style: { color: "#18a667", weight: 5, opacity: .85 } }).addTo(state.map);
  state.map.fitBounds(state.routeLayer.getBounds(), { padding: [24, 24] });
}

function clearRoute() {
  if (state.routeLayer) {
    state.routeLayer.remove();
    state.routeLayer = null;
  }
}

function setRouteStatus(message, type = "") {
  elements.routeStatus.textContent = message;
  elements.routeStatus.className = `route-status ${type}`.trim();
}

function bindRange(numberInput, rangeInput) {
  const sync = (source, target) => {
    const value = Math.max(Number(source.min), Math.min(Number(source.max), Number(source.value) || 0));
    target.value = value;
    paintRange(rangeInput);
    updateCalculation();
  };
  numberInput.addEventListener("input", () => sync(numberInput, rangeInput));
  rangeInput.addEventListener("input", () => sync(rangeInput, numberInput));
  paintRange(rangeInput);
}

function paintRange(input) {
  const progress = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
  input.style.setProperty("--value", `${progress}%`);
}

async function requestPrice() {
  if (state.controller) state.controller.abort();
  const isRoutePrice = state.distanceMode === "route";
  if (isRoutePrice && !state.routeCoordinates.length) {
    state.precio = null;
    setStatus("idle", "Calcula la ruta");
    updateCalculation();
    return;
  }
  if (!isRoutePrice && !state.provincia) {
    state.precio = null;
    setStatus("idle", "Elige provincia");
    updateCalculation();
    return;
  }

  state.controller = new AbortController();
  setStatus("loading", "Consultando…");
  elements.retry.hidden = true;
  elements.resultSummary.textContent = isRoutePrice
    ? "Buscando estaciones cercanas al recorrido…"
    : "Consultando las estaciones de servicio de la provincia…";

  try {
    const url = isRoutePrice
      ? `${ROUTE_API_URL}/${state.producto}`
      : `${API_URL}/${state.provincia}/${state.producto}`;
    const response = await fetch(url, {
      signal: state.controller.signal,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Respuesta ${response.status}`);

    const data = await response.json();
    if (data.ResultadoConsulta !== "OK") throw new Error(data.ResultadoConsulta || "Sin resultados");

    const stations = isRoutePrice
      ? filterStationsNearRoute(data.ListaEESSPrecio || [], state.routeCoordinates)
      : data.ListaEESSPrecio || [];
    const prices = stations.map((station) => parseSpanishNumber(station.PrecioProducto))
      .filter((price) => Number.isFinite(price) && price > 0);
    if (!prices.length) throw new Error("No hay precios disponibles");

    state.precio = prices.reduce((total, price) => total + price, 0) / prices.length;
    setStatus("success", "Precio actualizado");
    elements.updateNote.textContent = isRoutePrice
      ? `${prices.length} estaciones a menos de ${ROUTE_CORRIDOR_KM} km de la ruta · Fuente: Ministerio para la Transición Ecológica.`
      : `${prices.length} estaciones incluidas · Fuente: Ministerio para la Transición Ecológica.`;
    updateCalculation();
  } catch (error) {
    if (error.name === "AbortError") return;
    state.precio = null;
    setStatus("error", "No disponible");
    const noStationsOnRoute = isRoutePrice && error.message === "No hay precios disponibles";
    elements.resultSummary.textContent = noStationsOnRoute
      ? `No hay estaciones con precio publicado a menos de ${ROUTE_CORRIDOR_KM} km de esta ruta.`
      : "No hemos podido obtener el precio ahora mismo. Comprueba tu conexión e inténtalo de nuevo.";
    elements.updateNote.textContent = noStationsOnRoute
      ? "Prueba con otra ruta o vuelve al modo manual para usar la media de una provincia."
      : "La estimación necesita conexión para consultar los precios oficiales.";
    elements.retry.hidden = false;
    updateCalculation(false);
  }
}

function filterStationsNearRoute(stations, coordinates) {
  const routePoints = sampleRoute(coordinates, 8);
  if (!routePoints.length) return [];
  const lons = routePoints.map(([lon]) => lon);
  const lats = routePoints.map(([, lat]) => lat);
  const latPadding = ROUTE_CORRIDOR_KM / 111;
  const averageLat = lats.reduce((total, lat) => total + lat, 0) / lats.length;
  const lonPadding = ROUTE_CORRIDOR_KM / (111 * Math.max(.2, Math.cos(averageLat * Math.PI / 180)));
  const bounds = {
    minLon: Math.min(...lons) - lonPadding,
    maxLon: Math.max(...lons) + lonPadding,
    minLat: Math.min(...lats) - latPadding,
    maxLat: Math.max(...lats) + latPadding
  };

  return stations.filter((station) => {
    const lat = parseSpanishNumber(station.Latitud);
    const lon = parseSpanishNumber(station["Longitud (WGS84)"]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
    if (lon < bounds.minLon || lon > bounds.maxLon || lat < bounds.minLat || lat > bounds.maxLat) return false;
    return routePoints.some(([routeLon, routeLat]) => haversineKm(lat, lon, routeLat, routeLon) <= ROUTE_CORRIDOR_KM);
  });
}

function sampleRoute(coordinates, spacingKm) {
  if (!coordinates.length) return [];
  const samples = [coordinates[0]];
  let distanceSinceSample = 0;
  for (let index = 1; index < coordinates.length; index += 1) {
    const [previousLon, previousLat] = coordinates[index - 1];
    const [lon, lat] = coordinates[index];
    distanceSinceSample += haversineKm(previousLat, previousLon, lat, lon);
    if (distanceSinceSample >= spacingKm) {
      samples.push(coordinates[index]);
      distanceSinceSample = 0;
    }
  }
  const last = coordinates[coordinates.length - 1];
  if (samples[samples.length - 1] !== last) samples.push(last);
  return samples;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => degrees * Math.PI / 180;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(deltaLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseSpanishNumber(value) {
  if (typeof value === "number") return value;
  return Number.parseFloat(String(value || "").replace(",", "."));
}

function setStatus(type, label) {
  elements.status.className = `result-status ${type}`;
  elements.status.querySelector("span").textContent = label;
}

function updateCalculation(updateMessage = true) {
  const oneWayKilometres = state.distanceMode === "route"
    ? Math.max(0, state.routeDistance || 0)
    : Math.max(0, Number(elements.kilometros.value) || 0);
  const kilometres = oneWayKilometres * (elements.roundTrip.checked ? 2 : 1);
  const baseConsumption = Math.max(0, Number(elements.consumo.value) || 0);
  const speed = Math.max(20, Math.min(160, Number(elements.velocidad.value) || 100));
  const consumption = estimateConsumptionAtSpeed(baseConsumption, speed);
  const litres = kilometres * consumption / 100;
  const total = state.precio === null ? null : litres * state.precio;

  elements.litres.textContent = `${decimal.format(litres)} L`;
  elements.consumptionSummary.textContent = `${decimal.format(consumption)} L/100 km`;
  elements.consumptionEstimate.textContent = `Consumo estimado a ${Math.round(speed)} km/h: ${decimal.format(consumption)} L/100 km. Ajuste orientativo sobre el dato homologado.`;
  elements.distanceSummary.textContent = `${distanceNumber.format(kilometres)} km`;
  elements.fuelPrice.textContent = state.precio === null ? "— €/L" : `${decimal.format(state.precio)} €/L`;
  elements.totalPrice.textContent = total === null ? "—" : money.format(total);
  elements.totalSummary.textContent = total === null ? "— €" : `${money.format(total)} €`;

  if (updateMessage && state.distanceMode === "route" && state.routeDistance === null) {
    elements.resultSummary.textContent = "Busca un origen y un destino para calcular la distancia y el precio en ruta.";
  } else if (updateMessage && total !== null) {
    const tripType = elements.roundTrip.checked ? "ida y vuelta" : "solo ida";
    const priceReference = state.distanceMode === "route"
      ? "el precio medio de las estaciones cercanas a la ruta"
      : `el precio medio de ${elements.provincia.selectedOptions[0]?.textContent || "tu provincia"}`;
    elements.resultSummary.textContent = `${distanceNumber.format(kilometres)} km (${tripType}) en ${fuelNames[state.producto]}, usando ${priceReference}.`;
  } else if (updateMessage && state.distanceMode === "manual" && !state.provincia) {
    elements.resultSummary.textContent = "Selecciona una provincia para consultar el precio actualizado.";
  }
}

function estimateConsumptionAtSpeed(baseConsumption, speed) {
  const optimalSpeed = 70;
  const factor = speed <= optimalSpeed
    ? 0.9 + 0.6 * ((optimalSpeed - speed) / optimalSpeed) ** 2
    : 0.9 + 0.55 * ((speed - optimalSpeed) / optimalSpeed) ** 2;
  return baseConsumption * factor;
}

init();
