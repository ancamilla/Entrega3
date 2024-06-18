//Variables globales
var g_id_tipo_gestion ="";

function agregarTipoGestion(){

var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
if (!validarCampos(nombre_tipo_gestion)) {
  return;
}
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraTipogestion = obtenerFechaHoraTipogestion();

const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
  "fecha_registro": fechaHoraTipogestion
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
  .then((response) => {
    if(response.status == 200){
      alert('Tipo de gestión agregada con éxito.');
      location.href="listar.html";
    }else {
      alert('Error al crear el tipo de gestión.');
  }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function listarTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_tipo_gestion').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML  +=
  `<tr>
  <td>${element.id_tipo_gestion}</td>
  <td>${element.nombre_tipo_gestion}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);

}
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);

}
function obtenerDatosEliminar(p_id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr) {
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este tipo de gestión? <b>"+ nombre_tipo_gestion +"</b>";
}
function completarFormulario(element,index,arr) {
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('txt_nombre_tipo_gestion').value = nombre_tipo_gestion;

}
function actualizarTipoGestion(){
  var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
  if (!validarCampos(nombre_tipo_gestion)) {  //si nombre_tipo_gestion es vacio (false), al aplicar ! lo convierte en (true) llegando al return
    return;
}
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion 
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
  .then((response) => {
    if(response.status == 200){
      alert('Tipo de gestión actualizada con éxito.');
      location.href="listar.html";
    }else {
      alert('Error al actualizar el tipo gestión.');
  }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}
function eliminarTipoGestion(){

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
  .then((response) => {
    if(response.status == 200){
      alert('El tipo de gestión fue eliminado con éxito.');
      location.href="listar.html";
    }else {
      alert('Error al eliminar el tipo gestion.');
}
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}

function obtenerFechaHoraTipogestion(){
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
function validarCampos(nombre_tipo_gestion) {
  if (!nombre_tipo_gestion) {
      alert('El campo es obligatorio.');
      return false;
  }
  return true;
}