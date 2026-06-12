const alunos = {
    nome: "escola Tech",
    Aluno: [],

    apresentar() {
        return ` ${this.nome} - Total: ${this.Aluno.length} alunos`;
    }
};

const alunosIniciais = [
    { id: 1, nome: "João", idade: 20, curso: "JavaScript" },
    { id: 2, nome: "maria", idade: 22, curso: "Python" },
];

escola.Aluno = [...alunosIniciais];

function exibirAlunos() {
    const alunosDiv = document.getElementById('alunosList');
    if (escola.Aluno.length === 0){
    alunosList.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
    return
}

alunosDiv.innerHTML = escola.Alunos.map(aluno => `
    <div class="aluno-item">
        <strong>Nome: ${aluno.nome}</strong>
        <strong>Idade: ${aluno.idade}</strong>
        <strong>Curso: ${aluno.curso}</strong>
    </div>
`).join('');


document.getElementById('jsonDisplay').textContent = 
JSON.stringify(escola.Alunos, null, 2);

}

function AdicionarAluno() {
    const novoId = escola.Aluno.length + 1;
    const novoAluno = {
        id: novoId,
        nome: `Aluno ${novoId}`,
        idade: Math.floor(Math.random() * 30) + 18,
        curso: ["HTML/CSS", "React", "Node.js", "SQL"][Math.floor(Math.random() * 4)]
    };
    escola.Aluno.push(novoAluno);
    exibirAlunos();
}

Function salvarJSON(){
    const jsonString = JSON.stringify(escola.Alunos, null, 2);
    localStorage.setItem('alunos', jsonString);
}