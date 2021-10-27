const money = document.querySelector('.money');
const btn = document.querySelector('.btn');
const donation = document.querySelector('.donation');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

money.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!money.value) return;
    criaTarefa(money.value);
  }
});

function limpaInput() {
  money.value = '';
  money.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  donation.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvardonation();
}

btn.addEventListener('click', function() {
  if (!money.value) return;
  criaTarefa(money.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvardonation();
  }
});

function salvardonation() {
  const lidonation = donation.querySelectorAll('li');
  const listaDedonation = [];

  for (let tarefa of lidonation) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDedonation.push(tarefaTexto);
  }

  const donationJSON = JSON.stringify(listaDedonation);
  localStorage.setItem('donation', donationJSON);
}

function adicionadonationSalvas() {
  const donation = localStorage.getItem('donation');
  const listaDedonation = JSON.parse(donation);

  for(let tarefa of listaDedonation) {
    criaTarefa(tarefa);
  }
}
adicionadonationSalvas();
