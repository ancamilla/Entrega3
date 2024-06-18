var g_id_usuario ="";
function agregarUsuario(){
  //Variables con datos de formulario

var txt_id_usuario = document.getElementById("txt_id_usuario").value;
var txt_dv = document.getElementById("txt_dv").value;
var txt_nombres = document.getElementById("txt_nombres").value;
var txt_apellidos = document.getElementById("txt_apellidos").value;
var txt_email = document.getElementById("txt_email").value;
var txt_celular = document.getElementById("txt_celular").value;
var txt_username = document.getElementById("txt_username").value;
var txt_password = document.getElementById("txt_password").value;
var fechaHoraUsuario = obtenerFechaHoraUsuario();
if (!validarCampos(txt_id_usuario, txt_dv, txt_nombres, txt_apellidos, txt_email, txt_celular, txt_username, txt_password)) {
  return;
}
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"id_usuario": txt_id_usuario,
"dv": txt_dv,
"nombres": txt_nombres,
"apellidos": txt_apellidos,
"email": txt_email,
"celular": txt_celular,
"username": txt_username,
"password": txt_password,
"fecha_registro": fechaHoraUsuario
});

const requestOptions = {
method: "POST",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
.then((response) => {
  if(response.status == 200){
    alert('Usuario agregado con éxito.');
    location.href="listar.html";
  }else {
    alert('Error al crear usuario');
}
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}
function listarUsuario(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        json.forEach(completarFila);
        $('#tbl_usuario').DataTable();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  function completarFila(element,index,arr) {
    arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML  +=
    `<tr>
    <td>${element.id_usuario}</td>
    <td>${element.dv}</td>
    <td>${element.nombres}</td>
    <td>${element.apellidos}</td>
    <td>${element.email}</td>
    <td>${element.celular}</td>
    <td>${element.username}</td>
    <td>${element.password}</td>
    <td>${element.fecha_registro}</td>
    <td>
    <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
    <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
    </td>
    </tr>`
  }
  function obtenerFechaHoraUsuario(){
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
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;
    obtenerDatosEliminar(p_id_usuario);
  
  }
  function obtenerDatosEliminar(p_id_usuario) {  //obtener datos para confirmar eliminacion 
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiqueta))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  
  }
  function completarEtiqueta(element,index,arr) {
    var id_usuario = element.id_usuario;
    var dv = element.dv;
    var nombres = element.nombres;
    var apellidos = element.apellidos;
    document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este usuario? <b>"+ id_usuario+"-"+dv+" "+nombres+" "+apellidos+"</b>";
  }
  function eliminarUsuario(){


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
  
   fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        alert('Usuario eliminado con éxito.');
        location.href="listar.html";
      }else {
        alert('Error al eliminar usuario.');
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
  }
  function obtenerIdActualizar(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;
    obtenerDatosActualizar(p_id_usuario);
  }
  function obtenerDatosActualizar(p_id_usuario) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarFormulario))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  
  }
  function completarFormulario(element,index,arr) {
    var id_usuario = element.id_usuario;
    var dv = element.dv;
    var nombres = element.nombres;
    var apellidos = element.apellidos;
    var email = element.email;
    var celular = element.celular;
    var username = element.username;
    var password = element.password;
    document.getElementById('txt_id_usuario').value = id_usuario;
    document.getElementById('txt_dv').value = dv;
    document.getElementById('txt_nombres').value = nombres;
    document.getElementById('txt_apellidos').value = apellidos;
    document.getElementById('txt_email').value = email;
    document.getElementById('txt_celular').value = celular;
    document.getElementById('txt_username').value = username;
    document.getElementById('txt_password').value = password;
  
  }
  function actualizarUsuario(){
    var id_usuario =  document.getElementById('txt_id_usuario').value;
    var dv = document.getElementById('txt_dv').value;
    var nombres = document.getElementById('txt_nombres').value;
    var apellidos = document.getElementById('txt_apellidos').value;
    var email = document.getElementById('txt_email').value;
    var celular = document.getElementById('txt_celular').value;
    var username = document.getElementById('txt_username').value;
    var password = document.getElementById('txt_password').value;
    if (!validarCampos(id_usuario, dv, nombres, apellidos, email, celular, username, password)) {
      return;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv" : dv,
    "nombres" : nombres,
    "apellidos" : apellidos,
    "email": email,
    "celular" : celular,
    "username": username,
    "password": password
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        alert('Usuario actualizado con éxito.');
        location.href="listar.html";
      }else {
        alert('Error al actualizar usuario.');
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
  }

function validarCampos(id_usuario, dv, nombres, apellidos, email, celular, username, password) {
  if (!id_usuario || !dv || !nombres || !apellidos || !email || !celular || !username || !password) {
      alert('Todos los campos son obligatorios.');
      return false;
  }
  return true;
}
