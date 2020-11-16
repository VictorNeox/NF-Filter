
$( "#todos_pedidos3" )
    .after('<button style="margin-left: 5px" type="button" class="btn btn-primary" id="todos_pedidos4">Notas sem chave</button>');
$( "#todos_pedidos4" )
    .after('<button style="margin-left: 5px" type="button" class="btn btn-primary" id="todos_pedidos5">Notas autorizadas sem chave</button>');

const nota_status = [        
    {status :'100', descricao :'Autorizado o uso da NF-e', cor: 'green'},
    {status :'101', descricao :'Cancelamento de NFe homologado', cor: 'red'},
    {status :'102', descricao :'Inutilização de número homologado', cor: 'DarkGoldenRod'},
    {status :'103', descricao :'E 0 E - Corrigir pelo GNFE', cor: 'silver'},
    {status :'302', descricao :'Uso Denegado', cor: 'red'}
];

// Retira todas as notas que possuem uma chave
$("#todos_pedidos4").on("click", function(e) {
    let notas = document.querySelectorAll('[data-toggle="modal"]');
    let count = 0;
    notas.forEach((button) => {
        if(count % 2 == 0) {
            let chaveTransf = $(button).parent().next('td').text();
            let chaveVenda = $(button).parent()
                .next('td')
                .next('td')
                .next('td')
                .text();
            if(chaveTransf && chaveVenda) {
                $(button).parent().parent().remove();
            }
        }
        count++;
    });
});


// Utiliza o filtro de notas sem chave -> realiza uma requisição com as notas que não possuem chave 
// -> Se não possuirem o status desejado, deleta a row
$("#todos_pedidos2").click((e) => {
    $("#todos_pedidos4").click();
    let notas = document.querySelectorAll('[data-toggle="modal"]');
    notas.forEach((button) => {
        let chave = $(button).parent().next('td').text();
        if($(button).text() != '0' && !chave) {
            var button = $(button)
            const dadosNotaFiscal = button.data('whatever')
            const dados = dadosNotaFiscal.split("|")
            const nfNumero = dados[0];
            const cdNumero = dados[1];
            const chaveNf = dados[2];
            let nota_situacao ={status :'' , descricao :'Em Processo de Emissão', cor : 'silver'};// Padrão
            $.ajax({
                url: "controller.cgi",
                type: "post",
                data: {acao: "buscarLogNota", nfNumero, cdNumero,chaveNf},
                success: function(resultado){
                    if (resultado.status_nota){
                        nota_situacao = nota_status.find( situacao_nota => situacao_nota.status == resultado.status_nota)
                    };

                    if(nota_situacao.descricao != 'Inutilização de número homologado') {
                        $(button).parent().parent().remove();
                    }
                }
            });
        } else {
            let chaveVenda = $(button).parent()
            .prev('td')
            .text(); 
            if(chaveVenda) {
                $(button).parent().parent().remove();
            }
        }
    });
});

$("#todos_pedidos5").click((e) => {
    $("#todos_pedidos4").click();
    let notas = document.querySelectorAll('[data-toggle="modal"]');
    notas.forEach((button) => {
        let chave = $(button).parent().next('td').text();
        if($(button).text() != '0' && !chave) {
            var button = $(button)
            const dadosNotaFiscal = button.data('whatever')
            const dados = dadosNotaFiscal.split("|")
            const nfNumero = dados[0];
            const cdNumero = dados[1];
            const chaveNf = dados[2];
            let nota_situacao ={status :'' , descricao :'Em Processo de Emissão', cor : 'silver'};// Padrão
            $.ajax({
                url: "controller.cgi",
                type: "post",
                data: {acao: "buscarLogNota", nfNumero, cdNumero, chaveNf},
                success: function(resultado){
                    if (resultado.status_nota){
                        nota_situacao = nota_status.find( situacao_nota => situacao_nota.status == resultado.status_nota)
                    };

                    if(nota_situacao.descricao != 'Autorizado o uso da NF-e') {
                        $(button).parent().parent().remove();
                    }
                }
            });
        } else {
            let chaveVenda = $(button).parent()
            .prev('td')
            .text(); 
            if(chaveVenda) {
                $(button).parent().parent().remove();
            }
        }
    });
});