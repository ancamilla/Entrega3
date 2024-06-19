var g_id_resultado ="";

function agregarResultado(){

  var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var fechaHoraResultado = obtenerFechaHoraResultado();
  if (!validarCampos(nombre_resultado)) {
    return;
}
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,
    "fecha_registro": fechaHoraResultado
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
    .then((response) => {
      if(response.status == 200){
        mensajeAlerta('Resultado agregado con éxito.').then(() => {
          location.href="listar.html";
        });
    } else {
        mensajeAlerta('Error al agregar el resultado.');
    }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }

function listarResultado(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        json.forEach(completarFila);
        $('#tbl_resultado').DataTable();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  function completarFila(element,index,arr) {
    arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML  +=
    `<tr>
    <td>${element.id_resultado}</td>
    <td>${element.nombre_resultado}</td>
    <td>${element.fecha_registro}</td>
    <td>
    <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
    <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a>
    </td>
    </tr>`
  }
  function obtenerFechaHoraResultado(){
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toLocaleString('es-ES',{
      hour12:false,
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fechaFormateada;
    
  
  }

  function obtenerIdEliminar(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;
    obtenerDatosEliminar(p_id_resultado);
  
  }
  function obtenerDatosEliminar(p_id_resultado) {  //obtener datos para confirmar eliminacion 
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiqueta))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  
  }
  function completarEtiqueta(element,index,arr) {
    var nombre_resultado = element.nombre_resultado;
    document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este resultado? <b>"+ nombre_resultado +"</b>";
  }
  function eliminarResultado(){

    const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
    .then((response) => {
      if(response.status == 200){
        mensajeAlerta('Resultado eliminado con éxito.').then(() => {
          location.href="listar.html";
        });
    } else {
        mensajeAlerta('Error al eliminar el resultado.');
  }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
  }

  function obtenerIdActualizar(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;
    obtenerDatosActualizar(p_id_resultado);
  
  }
  function obtenerDatosActualizar(p_id_resultado) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarFormulario))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  
  }
  function completarFormulario(element,index,arr) {
    var nombre_resultado = element.nombre_resultado;
    document.getElementById('txt_nombre_resultado').value = nombre_resultado;
  
  }
  function actualizarResultado(){
    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    if (!validarCampos(nombre_resultado)) {
      return;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
    .then((response) => {
      if(response.status == 200){
        mensajeAlerta('Resultado actualizado con éxito.').then(() => {
          location.href="listar.html";
        });
    } else {
        mensajeAlerta('Error al actualizar el resultado.');
    }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
  }
  function validarCampos(nombre_resultado) {
    if (!nombre_resultado) {
        alert('El campo es obligatorio');
        return false;
    }
    return true;
}
function mensajeAlerta(mensaje) {
  // Cambia el contenido del cuerpo del modal
  document.getElementById('contenidoModal').textContent = mensaje;

  // Muestrar el modal
  var myModal = new bootstrap.Modal(document.getElementById('alertaModal'), {});
  myModal.show();
  return new Promise((resolve) => {
    myModal.show();
    myModal._element.addEventListener('hidden.bs.modal', resolve, { once: true });
  });
}