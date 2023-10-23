// Seleção de elementos
// o oldInputValue é a forma de guardar o titulo antigo da tarefa ou "todo" caso tenha alteração ou não
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções

//a saveTodo está esperando o texto ou titulo da tarefa
// isso tudo aqui é responsavel por criar em tela a parte visual da tarefa
// todoInput.value = "" é para melhora da qualidade de vida do usuario, para que quando ele adicione uma tarefa a área de input esteja limpa para ele usar novamente
//a parte do focus é so um metodo para "incentivar" o uso novamente adicionando tarefa por tarefa facilitadamente
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

// alternancia de esconder ou mostrar um formulario e o caso de esconder a lista é so pra facilitar pro usuario nao ter tanta informação em tela sem necessidade
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

// explicando basicamente aguarda o texto do usuario
// a variavel seleciona todos os todo's, um array de todo's
// pq nao selecioanr todos no começo? pq eles podem ter sofrido alteração
// aqui basicamente vai pegar o titulo do tudo e fazer uma checagem
// primeiro seleciona o elemento e dps a propriedade
// verifica se o titulo é igual o oldInputValue...
// se o valor atual for igual o oldInputValue ele fica igual
// se nao for ele atualiza com o novo
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};

// Eventos

// o preventDefault(); vai fazer com que o formulario nao seja enviado pq o foco é front-end
//inputValue pega o valor do input pra criar a tarefa nova e a const é pra armazenar ele numa variavel
//o if ta fazendo a verificação garantindo que o usuario nao crie uma tarefa sem titulo
// a todoForm aguarda o click no botão de submit e cria uma nova tarefa - explicação rapida
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    }
});

// esse evento é no documento todo, resumidamente eu tou definindo globalmente evento para os elementos que eu quero
// o targetEl = e.target é pra mim saber qual elemento foi pego
//o parentEl é usado pq as coisas usadas nesse evento são aplicadas no elemento pai, logo vc ta selencionando o elemento pai mais proximo, no caso a div
// as validações serve para mapear qual botão foi clicado
// a segunda, terceira e quarta validação se trata dos botões... nesse caso se o elemento que foi targetado tem a classe de "finish-todo" ele defini a classe da tarefa como done
    //se o elemento targetado tem a classe de "remove-todo" ele remove a classe pai, ou seja a div inteira da tarefa que foi criada
    //se o elemento targetado tem a calsse de "edit-todo" acontece um ecosistema inteiro, segue ele
        // primeiramente ocorre a toggleForms() -> basicamente oq ela faz é esconder um formulario e mostrar outro... significa que a tela de edição ela está hide naturalmente
        // então quando voce clica em editar ele deixa em hide tanto a lista como o formulario de adicionar tarefa
        //  na edição a gente precisa mapear o titulo do input e o valor que foi colocado na edição do titulo depois
        //  dito isso criamos a variavel com let pois ela pode ser alterada como todoTitle -> resumidamente é o titulo da sua to do
        // ok, nem todo elemento possui um titulo, então a gente faz uma verificação com o if novamente
        // a checagem é o seguinte> existencia do elemento pai com o parentEl e se ele tem um h3, esses são nossos requisitos para ele ter um titulo
        // se tudo isso passar pela verificação eu posso passar a informação de que o todoTitle é o titulo de uma tarefa ou todo
        // como a genente precisa guardar a informação do titulo criamos uma nova variavel la em cima, e ta explicado la melhor tbm
        // sabendo disso podemos passar para o final do bloco
    //o editInput existe ali pra receber o novo valor do titulo da tarefa, logo .value pq ele recebe o valor e ele precisa ja estar pre setado então ele recebe o todoTitle como valor orignal 
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

});

// o cancelEditBtn aguarda o evento de click para executar a função "e"...
// primeiramente ela recebe um preventDefault() para nao enviar formulario
// e logo depois ela executa tbm a toggleForms() para que seja escondido o formulario de edição e a lista seja liberada novamente voltando assim ao layout padrão
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
  });


// aqui o editForm aguarda o evento de submite, msm esquema pra nao enviar formulario pro backend ate pq nao eh esse o intuito e executa a função "e" como o novo falor da edição do input e atualiza com o novo
// a chacagem é o seguinte, se tiver alteração por parte do usuario no valor ele atualiza e volta pro layout padrão
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});