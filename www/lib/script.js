window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const id = document.querySelector("#id");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");

  cadastrar.addEventListener("click", function(){
    let formdata = new FormData();
    formdata.append('nome', `${nome.value}`);
    formdata.append('curso', `${curso.value}`);

    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
    {
     body: formdata,
     method: "post",
     mode:'cors',
     cache:'default' 
    }).then(()=>{
      
alert("Registro foi efetuado com Sucesso");
      LimparCampos();
    }

    );
  });

  buscar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value }`, {
    method: "get",
     mode:'cors',
     cache:'default' 
  }).then(response=>{
    response.json().then(data => {
      nome.value = data['nome'];
      curso.value = data['curso'];
      /*if(checkConnection()){

}else{
  alert('Sem Conexão com a Internet, tente novamente mais tarde!!!');
  
}*/
      })
    })
  })

  qrcode.addEventListener("click", function(){
           cordova.plugins.barcodeScanner.scan(
      function (result) {
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${result.text }`, {
    method: "get",
     mode:'cors',
     cache:'default' 
  }).then(response=>{
    response.json().then(data => {
      nome.value = data['nome'];
      curso.value = data['curso'];
            
      },
      function (error) {
          alert("fALHA AO SCANEAR: " + error);
      },
      {
          preferFrontCamera : false,
          showFlipCameraButton : true, 
          showTorchButton : true, 
          torchOn: true, 
          saveHistory: true,
          prompt : "Coloque a Camera no Código para Scanear", 
          resultDisplayDuration: 500, 
          formats : "QR_CODE,PDF_417,CODE_39",
          orientation : "landscape", 
          disableAnimations : true, 
          disableSuccessBeep: false 
      }
   );
      })
    })


});

  alterar.addEventListener("click", function(){
  fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value }`, {
    method: "put",
    mode:'cors',
    cache:'default', 
    headers:{
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      'nome' : `${nome.value}`,
      'curso' : `${curso.value}`,
    })
  }).then(()=>{
    alert("O Registro foi Alterado com Sucesso!!!")
    LimparCampos();
  });
});

deletar.addEventListener("click", function(){
fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value }`, {
    method: "delete",
     mode:'cors',
     cache:'default' 
  }).then(()=> {
    alert("O Registro foi Deletado Com Sucesso!!!")
    LimparCampos();
    });
});

  function LimparCampos(){
    nome.value = "";
    curso.value = "";
}

limpar.addEventListener("click", function(){
  id.value = "";
  LimparCampos();
})

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(states[networkState] == 'No network connection'){
       return false;
    }else{
      return true;
    }
}

/*if(checkConnection()){
  alert('Tem Internet')
}else{
  alert('Sem Internet');
}*/
buscar, qrcode, cadastrar, alterar, deletar, limpar.addEventListener("offline", onOffline, false);

  function confirma(buttonIndex){
    if(buttonIndex == 1){
      navigator.app.exitApp();
    }
  }
  
  function onOffline(){
    navigator.notification.confirm("Sem Internet, tente Novamente mais tarde!!!",confirma,"Ops!!!",['Sair','Ok']);
  }

  }
  