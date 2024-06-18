var g_id_cliente ="";
function agregarCliente(){
    //Variables con datos de formulario

var txt_id_cliente = document.getElementById("txt_id_cliente").value;
var txt_dv = document.getElementById("txt_dv").value;
var txt_nombres = document.getElementById("txt_nombres").value;
var txt_apellidos = document.getElementById("txt_apellidos").value;
var txt_email = document.getElementById("txt_email").value;
var txt_celular = document.getElementById("txt_celular").value;
    // Validar campos antes de enviar la solicitud
    if (!validarCampos(txt_id_cliente, txt_dv, txt_nombres, txt_apellidos, txt_email, txt_celular)) {
      return;
    }
var fechaHoraCliente = obtenerFechaHoraCliente();
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_cliente": txt_id_cliente,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "fecha_registro": fechaHoraCliente
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
.then((response) => { 
  if(response.status >= 200 && response.status < 300) {
      alert('Cliente agregado con éxito.');
      location.href = 'listar.html';
  } else {
      alert('Error al agregar el cliente.');
  }
})
.catch((error) => console.error(error));
}

function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML  +=
  `<tr>
  <td>${element.id_cliente}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}

function obtenerFechaHoraCliente(){
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
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);

}
function obtenerDatosEliminar(p_id_cliente) {  //obtener datos para confirmar eliminacion 
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr) {
  var id_cliente = element.id_cliente;
  var dv = element.dv;
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este cliente? <b>"+ id_cliente+"-"+dv+" "+nombres+" "+apellidos+"</b>";
}
function eliminarCliente(){


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  

 fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
  .then((response) => {
    if(response.status == 200){ //o 204
        alert('Cliente eliminado con éxito.');
        location.href = "listar.html";
    } else {
        alert('Error al eliminar el cliente.');
  }
})
.catch((error) => console.error(error));

}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);
}
function obtenerDatosActualizar(p_id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarFormulario(element,index,arr) {
  var id_cliente = element.id_cliente;
  var dv = element.dv;
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  var email = element.email;
  var celular = element.celular;
  document.getElementById('txt_id_cliente').value = id_cliente;
  document.getElementById('txt_dv').value = dv;
  document.getElementById('txt_nombres').value = nombres;
  document.getElementById('txt_apellidos').value = apellidos;
  document.getElementById('txt_email').value = email;
  document.getElementById('txt_celular').value = celular;

}
function actualizarCliente(){
  var id_cliente =  document.getElementById('txt_id_cliente').value;
  var dv = document.getElementById('txt_dv').value;
  var nombres = document.getElementById('txt_nombres').value;
  var apellidos = document.getElementById('txt_apellidos').value;
  var email = document.getElementById('txt_email').value;
  var celular = document.getElementById('txt_celular').value;

  if (!validarCampos(id_cliente, dv, nombres, apellidos, email, celular)) {
    return;
}
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_cliente": id_cliente,
  "dv" : dv,
  "nombres" : nombres,
  "apellidos" : apellidos,
  "email": email,
  "celular" : celular 
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
.then((response) => {
  if(response.status == 200){
      alert('Cliente actualizado con éxito.');
      location.href = "listar.html";
  } else {
      alert('Error al actualizar el cliente: ' + data.message);
  }
})
.then((result) => console.log(result))
.catch((error) => console.error(error));

}
function validarCampos(txt_id_cliente, txt_dv, txt_nombres, txt_apellidos, txt_email, txt_celular) {
  if (!txt_id_cliente || !txt_dv || !txt_nombres || !txt_apellidos || !txt_email || !txt_celular) {
      alert('Todos los campos son obligatorios');
      return false;
  }
  return true;
}