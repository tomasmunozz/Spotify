// Music.js

import { useEffect, useState } from "react";
import "./Music.css";
import { pedirCanciones } from "../Services/spotify.service";

function Music() {
  const [canciones, setCanciones] = useState(null);
  const [carga, setCarga] = useState(true);
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);
  const [token, setToken] = useState(null);

  const selectArtist = [
    { id: '4SsVbpTthjScTS7U2hmr1X', name: 'Arcangel' },
    { id: '5bWUlnPx9OYKsLiUJrhCA1', name: 'Jhon Z' },
    { id: '3SUT1jjM5hzZj9TLfLZGIP', name: 'Tego Calderon' },
    { id: '6P6GTRTigHBp8ZesNtpCKH', name: 'Almighty' },
    { id: '3ygJTpJJIK7eEeC2EFRl9D', name: 'Alcolirycoz' },

  ];

  const handleChange = (event) => {
    const selectedArtistId = event.target.value;
    const selectedArtist = selectArtist.find((artista) => artista.id === selectedArtistId);
    setArtistaSeleccionado(selectedArtist);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await pedirCanciones();
        setToken(token);
      } catch (error) {
        console.error("Error al obtener el token de Spotify", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (artistaSeleccionado && token) {
      const fetchCanciones = async () => {
        try {
          const canciones = await pedirCanciones(artistaSeleccionado.id, token);
          setCanciones(canciones);
          setCarga(false);
        } catch (error) {
          console.error("Error al obtener las canciones", error);
        }
      };
      fetchCanciones();
    }
  }, [artistaSeleccionado, token]);

  if (carga) {
    return( 
    <div>
      <select
      className="selectArtist"
        id="artistas"
        onChange={handleChange}
        value={artistaSeleccionado ? artistaSeleccionado.id : ''}
      >
        <option className="optionsStyle" value="" disabled>
          Selecciona un artista
        </option>
        {selectArtist.map((artista) => (
          <option className="optionsStyle" key={artista.id} value={artista.id}>
            {artista.name}
          </option>
        ))}
      </select>
    </div>
)
    
  } else {
    return (
      <>
        <div>
      <select
      className="selectArtist"
        id="artistas"
        onChange={handleChange}
        value={artistaSeleccionado ? artistaSeleccionado.id : ''}
      >
        <option className="optionsStyle" value="" disabled>
          Selecciona un artista
        </option>
        {selectArtist.map((artista) => (
          <option className="optionsStyle" key={artista.id} value={artista.id}>
            {artista.name}
          </option>
        ))}
      </select>
    </div>

        <div className="container">
          <div className="row row-col-1 row-cols-md-3 g-5 mt-1">
            {canciones.tracks.map(function (cancion) {
              return (
                <div className="col" key={cancion.id}>
                  <div className="card h-80 shadow">
                    <h5 className="fuente fuente-tamaño">{cancion.name}</h5>
                    <img
                      src={cancion.album.images[0].url}
                      alt=""
                      className="img-fluid w-100"
                    />
                    <audio
                      src={cancion.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Music;
