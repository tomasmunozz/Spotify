// export async function pedirCanciones() {
//   const url = "https://accounts.spotify.com/api/token";
//   const urlCanciones = `https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X/top-tracks?market=us`;
//   const grant_type = "client_credentials";
//   const client_id = "4c9ce4fd1dd749ad9e8cca551955e817";
//   const client_secret = "b93e289a98aa4fce9e28662ffec60469";
//   const datos = `grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`;

//   const peticion = {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: datos,
//   };

//   try {
//     let respuesta = await fetch(url, peticion);
//     let respuestaJSON = await respuesta.json();
//     let token = respuestaJSON.token_type + " " + respuestaJSON.access_token;
    

//     //traer canciones

//     const peticionCanciones = {
//       method: "GET",
//       headers: { Authorization: token },
//     };

//     let canciones = await fetch(urlCanciones, peticionCanciones);
//     let cancionesJSON = canciones.json();
//     return cancionesJSON;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error al obtener el token de Spotify");
//   }
  
// }


// spotify.service.js

export async function pedirCanciones(artistId) {
  const url = "https://accounts.spotify.com/api/token";
  const urlCanciones = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=us`;
  const grant_type = "client_credentials";
  const client_id = "4c9ce4fd1dd749ad9e8cca551955e817";
  const client_secret = "b93e289a98aa4fce9e28662ffec60469";
  const datos = `grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`;

  const peticion = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: datos,
  };

  try {
    let respuesta = await fetch(url, peticion);
    let respuestaJSON = await respuesta.json();
    let token = respuestaJSON.token_type + " " + respuestaJSON.access_token;

    const peticionCanciones = {
      method: "GET",
      headers: { Authorization: token },
    };
  
    try {
      let canciones = await fetch(urlCanciones, peticionCanciones);
      let cancionesJSON = await canciones.json();
      return cancionesJSON;
    } catch (error) {
      console.error("Error al obtener las canciones", error);
      throw new Error("Error al obtener las canciones");
    }
  } catch (error) {
    console.error("Error al obtener el token de Spotify", error);
    throw new Error("Error al obtener el token de Spotify");
  }

  
}

