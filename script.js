// === SISTEMA DE CADASTRO DE ALUNOS ===

// Elementos do DOM
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const studentCount = document.getElementById("studentCount");
const formFeedback = document.getElementById("formFeedback");
const clearListBtn = document.getElementById("clearListBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

// Array para armazenar alunos
let alunos = [];

// === 1️⃣ Função: Validação personalizada do formulário ===
studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const idade = parseInt(document.getElementById("studentAge").value.trim());
  const curso = document.getElementById("studentCourse").value.trim();

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  if (nome === "" || email === "" || isNaN(idade) || curso === "") {
    formFeedback.textContent = "⚠️ Todos os campos são obrigatórios.";
    formFeedback.style.color = "red";
    return;
  }

  if (!emailRegex.test(email)) {
    formFeedback.textContent = "❌ Email inválido.";
    formFeedback.style.color = "red";
    return;
  }

  if (idade < 15 || idade > 100) {
    formFeedback.textContent = "⚠️ Idade deve estar entre 15 e 100 anos.";
    formFeedback.style.color = "red";
    return;
  }

  // Se tudo estiver correto:
  formFeedback.textContent = "✅ Aluno cadastrado com sucesso!";
  formFeedback.style.color = "green";

  const novoAluno = { nome, email, idade, curso };
  alunos.push(novoAluno);

  atualizarLista();
  studentForm.reset();
});

// === 2️⃣ Função: Atualizar a lista de alunos ===
function atualizarLista() {
  studentList.innerHTML = ""; // Limpa a lista
  alunos.forEach((aluno, index) => {
    const li = document.createElement("li");
    li.textContent = `${aluno.nome} (${aluno.curso}, ${aluno.idade} anos)`;
    // Adicionar botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => removerAluno(index));
    li.appendChild(removeBtn);
    studentList.appendChild(li);
  });
  studentCount.textContent = alunos.length;
}

// === 3️⃣ Função: Remover aluno individualmente ===
function removerAluno(index) {
  alunos.splice(index, 1);
  atualizarLista();
}

// === 4️⃣ Função: Limpar toda a lista ===
clearListBtn.addEventListener("click", () => {
  alunos = [];
  atualizarLista();
  formFeedback.textContent = "🗑️ Lista de alunos apagada.";
  formFeedback.style.color = "orange";
});

// === 5️⃣ Função Extra: Alternar entre modo claro e escuro ===
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleThemeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";
});
