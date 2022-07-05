import $ from 'jquery'

import {onLoadHtmlSuccess} from '../core/includes'

const duracao = 600

function filtraHeroi(heroi){
    $('[cp-heroi]').each(function(i,e){
        // se for verdadeiro vai ser exibido se falso não mostra.
        const alvo = $(this).attr('cp-heroi') === heroi || heroi === null
        if(alvo){
            $(this).removeClass('d-none')
            $(this).fadeIn(duracao)
        }else{
            $(this).fadeOut(duracao, () => {
                $(this).addClass('d-none')
            })  
        }
    })
}


$.fn.botaoDeHerois = function(){
   
    const herois = new Set
    $('[cp-heroi]').each(function(i,e){
        herois.add($(e).attr('cp-heroi'))
    })

    const btns = Array.from(herois).map(heroi => {
        const btn = $('<button>').addClass(['btn', 'btn-danger']).html(heroi)
        btn.click(e => filtraHeroi(heroi))
        return btn
    })

    const todos = $('<button>').addClass(['btn', 'btn-danger', 'active']).html('Todos')
    todos.click(e => filtraHeroi(null))

    btns.push(todos)

    const botaoGrupo = $('<div>').addClass(['btn-group'])
    botaoGrupo.append(btns)

    $(this).html(botaoGrupo)

    return this

}


onLoadHtmlSuccess(function() {
    $('[cp-botoes-herois]').botaoDeHerois();
})


