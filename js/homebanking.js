//Declaración de variables
var nombreUsuario = "Cecilia";
var saldoCuenta = 8000;
var limiteExtraccion = 2500;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var cta1 = "123456";
var cta2 = "654321";
var codigo = "1234";

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
   // iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function invalidar (_invalido){
    if(isNaN(_invalido) == false){
        return false;
    } else {
        alert("No has ingresado ningún número");
    }
}
function sumarDinero(_sumaDeDinero) {
    saldoCuenta += _sumaDeDinero;
}
function restarDinero(_restaDeDinero) {
    saldoCuenta -= _restaDeDinero;
}
function hayDinero (_montoAPagar) {
    if(_montoAPagar <= saldoCuenta){
        saldoCuenta -= _montoAPagar;
        actualizarSaldoEnPantalla();
        // Usé 'hayDinero = true' porque 'return true' no me lo tomaba. Pero me tira error si quiero pagar un segundo servicio.
        // ¿Cómo debería usarse?
        return true;
    } else {
        alert("No tenes suficiente dinero en la cuenta");
        return false;
    }
}
function cambiarLimiteDeExtraccion(_nuevoLimite) {
    var _nuevoLimite = parseInt(prompt("¿Qué límite desea estipular?"));
    var esNumero = invalidar(_nuevoLimite);
    if(esNumero == false){
        limiteExtraccion = _nuevoLimite;
        actualizarLimiteEnPantalla();
        alert("Su límite se ha actualizado");
    }
}

function extraerDinero(_dineroAExtraer){
    var _saldoAnterior = saldoCuenta;
    var _dineroAExtraer = parseInt(prompt("¿Cuánto dinero desea extraer?"));
    var esNumero = invalidar(_dineroAExtraer);
    if(esNumero == false){
        if(_dineroAExtraer <= saldoCuenta && _dineroAExtraer <= limiteExtraccion && _dineroAExtraer % 100 === 0){
            restarDinero(_dineroAExtraer);
            actualizarSaldoEnPantalla();
            alert("Has retirado: $" + _dineroAExtraer + 
            "\nSaldo anterior: $" + _saldoAnterior + 
            "\nSaldo actual: $" + saldoCuenta);
        } else if((_dineroAExtraer % 100 === 0) === false){
            alert("Solo puedes extraer billetes de 100");
        } else if (_dineroAExtraer <= limiteExtraccion === false){
            alert("Esta extracción excede tu límite");
        } else {
            alert("No tenés suficiente dinero en la cuenta");
        }
    }
}

function depositarDinero(_dineroADepositar) {
    var _saldoAnterior = saldoCuenta;
    var _dineroADepositar = parseInt(prompt("¿Cuánto dinero desea depositar?"));
    var esNumero = invalidar(_dineroADepositar);
    if(esNumero == false){
        sumarDinero(_dineroADepositar);  
        alert("Has depositado: $" + _dineroADepositar + 
        "\nSaldo anterior: $" + _saldoAnterior + 
        "\nSaldo actual: $" + saldoCuenta);
        actualizarSaldoEnPantalla();
    }
}

function pagarServicio(_servicio) {
    var _saldoAnterior = saldoCuenta;
    var _servicio = prompt("Elija el número del servicio que quiere pagar:\n" +
        "1 - Agua\n" +
        "2 - Luz\n" +
        "3 - Internet\n" +
        "4 - Teléfono\n");
    switch (_servicio) {
        case "1":
            var verdadero = hayDinero(agua);
            var servicio = "Agua";
            var _montoAPagar = agua;
            break;       
        case "2":
            var verdadero = hayDinero(luz);
            var servicio = "Luz";
            var _montoAPagar = luz;
            break;       
        case "3":            
            var verdadero = hayDinero(internet);
            var servicio = "Internet";
            var _montoAPagar = internet;
            break;       
        case "4":
            var verdadero = hayDinero(telefono);
            var servicio = "Teléfono";
            var _montoAPagar = telefono;
            break;       
        default:
            alert("Error")
            break;      
    }
    if (verdadero === true){
        alert("Has pagado el servicio de " + servicio +
            "\nSaldo anterior: $" + _saldoAnterior +
            "\nDinero descontado: $" + _montoAPagar +
            "\nSaldo actual: $" + (saldoCuenta));
    } else {
        alert("No ingresaste un servicio válido");
    }
}

function transferirDinero(_montoATransferir) {
    var _montoATransferir = parseInt(prompt("Ingrese el monto a transferir:"));
    var esNumero = invalidar(_montoATransferir);
    if (esNumero == false){
        if (_montoATransferir > saldoCuenta && _montoATransferir !== null){
            alert("No tenés suficiente dinero en la cuenta para transferir ese monto"); 
        } else {
            var _ctaAmiga = prompt("¿A qué cuenta desea transferir?");
            if (_ctaAmiga == cta1 || _ctaAmiga == cta2){
                restarDinero(_montoATransferir);
                actualizarSaldoEnPantalla();
                alert("Se han transferido $" + _montoATransferir + "\n" + "Cuenta destino: " + _ctaAmiga);           
        } else {
            alert("Sólo podés transferir a cuentas amigas");
            }
        }
    }
}

function iniciarSesion(_codigo) {
    var _codigo = prompt("Ingrese su código de cuenta:")
    if(_codigo==codigo){
        alert("Bienvenido/a Cecilia ya puedes comenzar a realizar operaciones");
    } else {
        restarDinero(saldoCuenta);
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
