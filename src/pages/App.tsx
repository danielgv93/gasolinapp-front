import React from 'react';
import {Autocomplete} from "@mantine/core";

function App() {
    const mock = [
        {
            "id": 2,
            "nombre": "ALBACETE",
            "ccaa": {
                "id": 7,
                "nombre": "Castilla la Mancha"
            }
        },
        {
            "id": 3,
            "nombre": "ALICANTE",
            "ccaa": {
                "id": 10,
                "nombre": "Comunidad Valenciana"
            }
        },
        {
            "id": 4,
            "nombre": "ALMERÍA",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 1,
            "nombre": "ARABA/ÁLAVA",
            "ccaa": {
                "id": 16,
                "nombre": "País Vasco"
            }
        },
        {
            "id": 33,
            "nombre": "ASTURIAS",
            "ccaa": {
                "id": 3,
                "nombre": "Asturias"
            }
        },
        {
            "id": 5,
            "nombre": "ÁVILA",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 6,
            "nombre": "BADAJOZ",
            "ccaa": {
                "id": 11,
                "nombre": "Extremadura"
            }
        },
        {
            "id": 7,
            "nombre": "BALEARS (ILLES)",
            "ccaa": {
                "id": 4,
                "nombre": "Baleares"
            }
        },
        {
            "id": 8,
            "nombre": "BARCELONA",
            "ccaa": {
                "id": 9,
                "nombre": "Cataluña"
            }
        },
        {
            "id": 48,
            "nombre": "BIZKAIA",
            "ccaa": {
                "id": 16,
                "nombre": "País Vasco"
            }
        },
        {
            "id": 9,
            "nombre": "BURGOS",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 10,
            "nombre": "CÁCERES",
            "ccaa": {
                "id": 11,
                "nombre": "Extremadura"
            }
        },
        {
            "id": 11,
            "nombre": "CÁDIZ",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 39,
            "nombre": "CANTABRIA",
            "ccaa": {
                "id": 6,
                "nombre": "Cantabria"
            }
        },
        {
            "id": 12,
            "nombre": "CASTELLÓN / CASTELLÓ",
            "ccaa": {
                "id": 10,
                "nombre": "Comunidad Valenciana"
            }
        },
        {
            "id": 51,
            "nombre": "CEUTA",
            "ccaa": {
                "id": 18,
                "nombre": "Ceuta"
            }
        },
        {
            "id": 13,
            "nombre": "CIUDAD REAL",
            "ccaa": {
                "id": 7,
                "nombre": "Castilla la Mancha"
            }
        },
        {
            "id": 14,
            "nombre": "CÓRDOBA",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 15,
            "nombre": "CORUÑA (A)",
            "ccaa": {
                "id": 12,
                "nombre": "Galicia"
            }
        },
        {
            "id": 16,
            "nombre": "CUENCA",
            "ccaa": {
                "id": 7,
                "nombre": "Castilla la Mancha"
            }
        },
        {
            "id": 20,
            "nombre": "GIPUZKOA",
            "ccaa": {
                "id": 16,
                "nombre": "País Vasco"
            }
        },
        {
            "id": 17,
            "nombre": "GIRONA",
            "ccaa": {
                "id": 9,
                "nombre": "Cataluña"
            }
        },
        {
            "id": 18,
            "nombre": "GRANADA",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 19,
            "nombre": "GUADALAJARA",
            "ccaa": {
                "id": 7,
                "nombre": "Castilla la Mancha"
            }
        },
        {
            "id": 21,
            "nombre": "HUELVA",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 22,
            "nombre": "HUESCA",
            "ccaa": {
                "id": 2,
                "nombre": "Aragón"
            }
        },
        {
            "id": 23,
            "nombre": "JAÉN",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 24,
            "nombre": "LEÓN",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 25,
            "nombre": "LLEIDA",
            "ccaa": {
                "id": 9,
                "nombre": "Cataluña"
            }
        },
        {
            "id": 27,
            "nombre": "LUGO",
            "ccaa": {
                "id": 12,
                "nombre": "Galicia"
            }
        },
        {
            "id": 28,
            "nombre": "MADRID",
            "ccaa": {
                "id": 13,
                "nombre": "Madrid"
            }
        },
        {
            "id": 29,
            "nombre": "MÁLAGA",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 52,
            "nombre": "MELILLA",
            "ccaa": {
                "id": 19,
                "nombre": "Melilla"
            }
        },
        {
            "id": 30,
            "nombre": "MURCIA",
            "ccaa": {
                "id": 14,
                "nombre": "Murcia"
            }
        },
        {
            "id": 31,
            "nombre": "NAVARRA",
            "ccaa": {
                "id": 15,
                "nombre": "Navarra"
            }
        },
        {
            "id": 32,
            "nombre": "OURENSE",
            "ccaa": {
                "id": 12,
                "nombre": "Galicia"
            }
        },
        {
            "id": 34,
            "nombre": "PALENCIA",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 35,
            "nombre": "PALMAS (LAS)",
            "ccaa": {
                "id": 5,
                "nombre": "Canarias"
            }
        },
        {
            "id": 36,
            "nombre": "PONTEVEDRA",
            "ccaa": {
                "id": 12,
                "nombre": "Galicia"
            }
        },
        {
            "id": 26,
            "nombre": "RIOJA (LA)",
            "ccaa": {
                "id": 17,
                "nombre": "Rioja (La)"
            }
        },
        {
            "id": 37,
            "nombre": "SALAMANCA",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 38,
            "nombre": "SANTA CRUZ DE TENERIFE",
            "ccaa": {
                "id": 5,
                "nombre": "Canarias"
            }
        },
        {
            "id": 40,
            "nombre": "SEGOVIA",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 41,
            "nombre": "SEVILLA",
            "ccaa": {
                "id": 1,
                "nombre": "Andalucia"
            }
        },
        {
            "id": 42,
            "nombre": "SORIA",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 43,
            "nombre": "TARRAGONA",
            "ccaa": {
                "id": 9,
                "nombre": "Cataluña"
            }
        },
        {
            "id": 44,
            "nombre": "TERUEL",
            "ccaa": {
                "id": 2,
                "nombre": "Aragón"
            }
        },
        {
            "id": 45,
            "nombre": "TOLEDO",
            "ccaa": {
                "id": 7,
                "nombre": "Castilla la Mancha"
            }
        },
        {
            "id": 46,
            "nombre": "VALENCIA / VALÈNCIA",
            "ccaa": {
                "id": 10,
                "nombre": "Comunidad Valenciana"
            }
        },
        {
            "id": 47,
            "nombre": "VALLADOLID",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 49,
            "nombre": "ZAMORA",
            "ccaa": {
                "id": 8,
                "nombre": "Castilla y León"
            }
        },
        {
            "id": 50,
            "nombre": "ZARAGOZA",
            "ccaa": {
                "id": 2,
                "nombre": "Aragón"
            }
        }
    ].map(provincia => provincia.nombre)

    return (
        <section className={'flex'}>
            <Autocomplete
                label="Provincia"
                placeholder="Selecciona una provincia"
                data={mock}
                onChange={console.log}
            />
        </section>
    );
}

export default App;
