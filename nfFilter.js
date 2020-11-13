
$( "#todos_pedidos3" )
    .after('<button style="margin-left: 5px" type="button" class="btn btn-primary" id="todos_pedidos4">Notas sem chave</button>');

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