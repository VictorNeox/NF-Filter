let notas = document.querySelectorAll('[data-toggle="modal"]');
let count = 0;
notas = Array.from(notas);

notas.forEach(function(button) {
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