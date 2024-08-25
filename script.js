const textAreaEntrada = document.getElementById('textoEntrada'); 
const textAreaSaida = document.getElementById('textoModificado'); 
const botaoCopiar = document.getElementById('btnCopiar');
const botaoEncriptar = document.getElementById('btnEncriptar');
const botaoDesencriptar = document.getElementById('btnDesencriptar');
const tituloMensagem = document.querySelector('#tituloMensagem');
const textoMensagem = document.querySelector('#textoMensagem');

const corFundo = getComputedStyle(document.documentElement).getPropertyValue('--cor-dois');
const corLetra = getComputedStyle(document.documentElement).getPropertyValue('--cor-fundo-dois');
const corAviso = getComputedStyle(document.documentElement).getPropertyValue('--cor-tres');
const corFundoP = getComputedStyle(document.documentElement).getPropertyValue('--cor-um');

botaoEncriptar.addEventListener('click', btnEncriptar); 
botaoDesencriptar.addEventListener('click', btnDesencriptar);
botaoCopiar.addEventListener('click', Copiar);

function encriptar(stringEncriptada) {

    let matrizCodigo = [["e" , "enter"] , ["i" , "imes"] , ["a", "ai"] , ["o" , "ober"] , ["u" , "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++) {
        if(stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }

    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {

    let matrizCodigo = [["e" , "enter"] , ["i" , "imes"] , ["a", "ai"] , ["o" , "ober"] , ["u" , "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++) {
        if(stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }

    return stringDesencriptada;
}

function btnEncriptar() {
    botaoEncriptar.style.backgroundColor = corFundo;
    botaoEncriptar.style.color = corLetra;
    botaoDesencriptar.style.backgroundColor = corFundoP;
    botaoDesencriptar.style.color = corFundo;

    let textoDigitado = textAreaEntrada.value; 
    if (textoDigitado.trim() === "") {
        textAreaSaida.value = "";
        textAreaSaida.style.backgroundImage = "none";
        document.querySelector('#textoModificado').style.backgroundImage = "url('./assets/html2.png')";
        document.querySelector('#tituloMensagem').style.display = "block";
        document.querySelector('#textoMensagem').style.display = "block";
        document.querySelector('#btnCopiar').style.display = "none";
        document.querySelector('.aviso__notificacao').style.color = 'red';
        return;
    }

    if (textoDigitado.match(/^[a-z\s\n]+$/)) {
        let textoCriptografado = encriptar(textoDigitado); 
        textAreaSaida.value = textoCriptografado;
        textAreaSaida.style.backgroundImage = "none";
        document.querySelector('#tituloMensagem').style.display = "none";
        document.querySelector('#textoMensagem').style.display = "none";
        document.querySelector('#btnCopiar').style.display = "block";
        document.querySelector('.aviso__notificacao').style.color = corAviso;
    } else {
        document.querySelector('.aviso__notificacao').style.color = 'red';
    }
}


function btnDesencriptar() {
    botaoDesencriptar.style.backgroundColor = corFundo;
    botaoDesencriptar.style.color = corLetra;
    botaoEncriptar.style.backgroundColor = corFundoP;
    botaoEncriptar.style.color = corFundo;

    let textoDigitado = textAreaEntrada.value;
    if (textoDigitado.trim() === "") {
        textAreaSaida.value = "";
        textAreaSaida.style.backgroundImage = "none";
        document.querySelector('#textoModificado').style.backgroundImage = "url('./assets/html2.png')";
        document.querySelector('#tituloMensagem').style.display = "block";
        document.querySelector('#textoMensagem').style.display = "block";
        document.querySelector('#btnCopiar').style.display = "none";
        document.querySelector('.aviso__notificacao').style.color = 'red';
        return;
    }

    if (textoDigitado.match(/^[a-z\s\n]+$/)) {
        let textoDescriptografado = desencriptar(textoDigitado);
        textAreaSaida.value = textoDescriptografado;
        textAreaSaida.style.backgroundImage = "none";
        document.querySelector('#tituloMensagem').style.display = "none";
        document.querySelector('#textoMensagem').style.display = "none";
        document.querySelector('#btnCopiar').style.display = "block";
        document.querySelector('.aviso__notificacao').style.color = corAviso;
    } else {
        document.querySelector('.aviso__notificacao').style.color = 'red';
    }
}

botaoCopiar.textContent = 'Copiar'; 

function Copiar() {
    navigator.clipboard.writeText(textAreaSaida.value)
    .then(() => {
        botaoCopiar.value = "Copiado!";
        botaoCopiar.style.backgroundColor = corFundo;
        botaoCopiar.style.color = corLetra;
        botaoCopiar.innerHTML = "Copiado!";
        setTimeout(() => {
            botaoCopiar.value = "Copiar";
            botaoCopiar.style.backgroundColor = "";
            botaoCopiar.style.color = "";
        }, 1000);
    });
}

textAreaSaida.addEventListener('focus', function() {
    textAreaSaida.style.backgroundImage = "none";
    document.querySelector('#tituloMensagem').style.display = "none";
    document.querySelector('#textoMensagem').style.display = "none";
    document.querySelector('#btnCopiar').style.display = "block";
});

textAreaSaida.addEventListener('blur', function() {
    if (textAreaSaida.value.trim() === "") {
        textAreaSaida.style.backgroundImage = "none";
        document.querySelector('#textoModificado').style.backgroundImage = "url('./assets/html2.png')";
        document.querySelector('#tituloMensagem').style.display = "block";
        document.querySelector('#textoMensagem').style.display = "block";
        document.querySelector('#btnCopiar').style.display = "none";
    }
});