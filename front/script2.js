function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('openModal').addEventListener('click', abrirModal);

document.getElementById('closeModal').addEventListener('click', fecharModal);

const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: cadastro.nome.value,
        preco: parseFloat(cadastro.preco.value),
    }
    fetch('http://localhost:3000/comida', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Comida cadastrada com sucesso');
                fecharModal();
            } else {
                msg3('Erro ao cadastrar comida');
            }
        });
});

function excluirComida(id) {
    if (confirm('Realmente quer excluir o card ' + id + ' ?')) {
        fetch(`http://localhost:3000/comida/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.status)
            .then(status => {
                if (status === 200) {
                    msg3('Comida deletada com sucesso');
                } else {
                    msg3('Erro ao deletar comida');
                }
            });
    }
}

function update(btn) {
    let linha = btn.closest('tr'); 
    let celulas = linha.cells;
    let id = celulas[0].textContent.trim(); 

    let data = {
        nome: celulas[1].textContent.trim(),
        preco: celulas[2].textContent.trim(),
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
            msg3('Comida atualizado com sucesso');
        } else {
            console.error('Erro SQL:', res.sqlMessage);
            msg3('Erro ao atualizar comida!');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        msg3('Erro ao conectar com o servidor!');
    });
}

fetch('http://localhost:3000/comida')
    .then(response => response.json())
    .then(comidas => {
        const cardContainer = document.getElementById('comida');
        console.log('Comidas carregadas:', comidas); // Log para depuração
        comidas.forEach(comida => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div> 
                    <td>${comida.id}</td>
                    <td contenteditable="true">${comida.nome}</td>
                    <td contenteditable="true"> Preço: R$ ${comida.preco.toFixed(2)}</td>
                    <button onclick="excluirComida(${comida.id})">Excluir</button>
                    <button onclick="update(this)">Alterar</button>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar comidas:', error);
    });

function msg3(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

