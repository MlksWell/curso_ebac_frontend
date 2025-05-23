$(document).ready(function () {
    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        $('#lista-tarefas').empty();
        tarefas.forEach(({ texto, concluida }) => {
            adicionarTarefaNaLista(texto, concluida);
        });
    }

    function salvarTarefas() {
        const tarefas = [];
        $('#lista-tarefas li').each(function () {
            tarefas.push({
                texto: $(this).find('span.tarefa-texto').text(),
                concluida: $(this).hasClass('concluida'),
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function adicionarTarefaNaLista(texto, concluida = false) {
        const li = $('<li></li>');
        const span = $('<span class="tarefa-texto"></span>').text(texto);
        const btnRemover = $('<button class="btn-remover" title="Remover tarefa">×</button>');

        if (concluida) li.addClass('concluida');

        li.append(span, btnRemover);
        $('#lista-tarefas').append(li);

        salvarTarefas();
    }

    $('#form-tarefa').submit(function (e) {
        e.preventDefault();
        const texto = $('#input-tarefa').val().trim();
        if (texto) {
            adicionarTarefaNaLista(texto);
            $('#input-tarefa').val('');
        }
    });

    $('#lista-tarefas').on('click', 'span.tarefa-texto', function () {
        $(this).parent().toggleClass('concluida');
        salvarTarefas();
    });

    $('#lista-tarefas').on('click', '.btn-remover', function (e) {
        e.stopPropagation();
        $(this).parent().remove();
        salvarTarefas();
    });

    $('#btn-limpar-tudo').click(function () {
        $('#lista-tarefas').empty();
        salvarTarefas();
    });

    carregarTarefas();
});
