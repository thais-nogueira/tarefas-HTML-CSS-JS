const inputTarefa = document.querySelector('.input-tarefas');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

//adiciona o evento de pressionar o enter no teclado e cria a tarefa na tela
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
     criaTarefa(inputTarefa.value);
  }
});


//função para limpar o preenchimento do input e manter o cursor nele para nova escrita
function limpaInput() {
  inputTarefa.value ='';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  //cria um atributo(como uma classe, chamada apagar)
  botaoApagar.setAttribute('class', 'apagar');
  //quando passar o mouse sobre o botao apagar, a msg será exibida
  botaoApagar.setAttribute('title', 'Apagar tarefa');
  li.appendChild(botaoApagar);
}


function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText =  textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function(){ 
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});


//recebe o evento de clique no botao apagar e executa a remoção do "pai" do apagar
//que no caso é "li" com a tarefa
document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim();
    console.log(tarefaTexto);
    listaDeTarefas.push(tarefaTexto);
  }
  

  //para transformar de array em string, assim podendo ser salvo em outro local
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
  console.log(tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  //convertendo abaixo o json para um elemento js (array)
  const listaDeTarefas = JSON.parse(tarefas);


  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

adicionaTarefasSalvas();