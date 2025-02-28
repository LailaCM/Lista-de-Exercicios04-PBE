const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: cadastro.nome.value,
        cpf: cadastro.cpf.value,
        email: cadastro.email.value,
    }
    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Cliente cadastrado com sucesso');
            } else {
                msg3('Erro ao cadastrar cliente');
            }
        });
});

fetch('http://localhost:3000/clientes')
    .then(response => response.json())
    .then(clientes => {
        const tabela = document.getElementById('clientes');
        clientes.forEach(cliente => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td>${cliente.id}</td>
            <td contenteditable="true">${cliente.nome}</td>
            <td contenteditable="true">${cliente.cpf}</td>
            <td contenteditable="true">${cliente.email}</td>
            <td>
                <button onclick="update(this)">Atualizar</button>
                <button onclick="deletarClientes(${cliente.id})">Deletar</button>
            </td>
        `;
            tabela.appendChild(linha);
        });
    });

function deletarClientes(id) {
    fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.status)
    .then(status => {
        if (status === 200) {
            msg3('Cliente deletado com sucesso');
        } else {
            msg3('Erro ao deletar cliente');
        }
    });
}

function update(btn) {
    let linha = btn.closest('tr'); 
    let celulas = linha.cells;
    let id = celulas[0].textContent.trim(); 

    let data = {
        nome: celulas[1].textContent.trim(),
        cpf: celulas[2].textContent.trim(),
        email: celulas[3].textContent.trim(),
    };

    if (!data.nome || !data.cpf || !data.email) {
        msg3('Erro: Todas as informações são obrigatórias!');
        return;
    }

    fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.sqlMessage === undefined) {
            celulas[1].removeAttribute('contenteditable');
            celulas[2].removeAttribute('contenteditable');
            celulas[3].removeAttribute('contenteditable');
            msg3('Cliente atualizado com sucesso');
        } else {
            console.error('Erro SQL:', res.sqlMessage);
            msg3('Erro ao atualizar cliente!');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        msg3('Erro ao conectar com o servidor!');
    });
}

function msg3(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}