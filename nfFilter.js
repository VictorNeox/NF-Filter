let notas = document.querySelectorAll('[data-toggle="modal"]');

notas = Array.from(notas);

let notasTransf = [];
let notasComChave = [];

let count = 0;

notas.forEach(function(button) {
    if(count % 2 == 0) {
        notasTransf.push(button);
    }
    count++;
});

notasTransf.forEach(function(button) {
    let chaveTransf = $(button).parent().next('td').text();
    let chaveVenda = $(button).parent()
        .next('td')
        .next('td')
        .next('td').text();
    if(chaveTransf && chaveVenda) {
        notasComChave.push(button);
    }
})

notasComChave.forEach(function(button) {
    $(button).parent().parent().remove();
})