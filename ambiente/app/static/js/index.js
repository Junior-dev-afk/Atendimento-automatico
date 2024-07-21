import Funcoes from "./modulos.js"


const ITENS = await Funcoes.getItens()

const itensAdicionados = []

let valorTotal = 0
let cardapioAtivado = false

let finalizar = false
let formaDePagamento = false
let selecionarEndereco = false
let endereco = false

window.addEventListener("keydown", (e)=>{
    if ( e.key == "Enter" ){
        console.log(e.key)
        let string = document.querySelector(".input-enviar-mensagem").value
        if (string.trim() != "") {
            Funcoes.usuarioEnviarMensagem(string)
            if ( finalizar == false) {
                if (string.toLowerCase() == "cardapio") {
                    Funcoes.enviarCardapio()
                    setTimeout(()=>{
                        Funcoes.sistemaEnviarMensagem("Digite o numero do item para adicionar ele")
                    }, 300)
                    cardapioAtivado = true
                }
                if ( cardapioAtivado === true ){
                    if (/^\d+$/.test(string)) {
                        if ( getQuantidadeItens() >= parseInt(string) ) {
                            let item = Funcoes.getItemFromIndex(parseInt(string))
                            for ( let v in ITENS ) {
                                for ( let i of ITENS[v]) {
                                    if ( i[0] == item ) {
                                        let num = 1
                                        if ( itensAdicionados.length > 0 ){
                                            for (let v of itensAdicionados) {
                                                if (v[0] == item) {
                                                    v[1] = v[1] + 1
                                                    break
                                                } else {
                                                    if ( num == itensAdicionados.length ) {
                                                        itensAdicionados.push([item, 1, i[1]])
                                                        break
                                                    }
                                                }
                                                num ++
                                            }
                                        } else {
                                            itensAdicionados.push([item, 1, i[1]])
                                        }
                                    }
                                }
                            }

                            Funcoes.enviarCardapio()
                            
                            setTimeout(()=>{
                                enviarMensagensItensAdicionados()
                            }, 300)
                        }else{
                            Funcoes.sistemaEnviarMensagem("Atenção, esse item nao existe!")
                        }
                    }
                
                    if (string.toLowerCase().includes("remover")) {
                        let index = string.toLowerCase().replace("remover", "").trim()
                        if (index != "" ) {
                            if ( /^\d+$/.test(index) ) {
                                index = parseInt(index)
                                let item = Funcoes.getItemFromIndex(index)
                                for ( let v in ITENS ) {
                                    for ( let i of ITENS[v]) {
                                        if ( i[0] == item ) {
                                            let num = 1
                                            if ( itensAdicionados.length > 0 ){
                                                for (let v of itensAdicionados) {
                                                    if (v[0] == item) {
                                                        v[1] = v[1] - 1
                                                        if (v[1] == 0) {
                                                            itensAdicionados.splice(num - 1, 1)
                                                        }
                                                        enviarMensagensItensAdicionados()
                                                        break
                                                    }else{
                                                        if ( num == itensAdicionados.length ) {
                                                            Funcoes.sistemaEnviarMensagem("Esse item não esta adicionado")
                                                        }
                                                    }
                                                    num ++
                                                }
                                            }else{
                                                Funcoes.sistemaEnviarMensagem("Nenhum item adicionado")
                                            }
                                        }
                                    }
                                }
                            }else{
                                Funcoes.sistemaEnviarMensagem("Digite apenas 'Remover' 1 - o numero que deseja remover")
                            }
                        }else{
                            Funcoes.sistemaEnviarMensagem("Digite um numero depois de remover")
                        }
                    }

                    if (string.toLowerCase().includes("finalizar")) {
                        if ( itensAdicionados.length > 0 ){
                            finalizar = true
                            Funcoes.sistemaEnviarMensagem("Esolha forma de pagamento <br><br> 1 - Pix <br> 2 - Dinheiro <br> 3 - Adicionar mais produtos")
                        }else{
                            Funcoes.sistemaEnviarMensagem("Você não adicionou nenhum item")
                        }
                    }
                }else{
                    Funcoes.sistemaEnviarMensagem("Digite cardapio para iniciar atendimento")
                }
            }else{
                if ( formaDePagamento === false ) {
                    if ( string.trim() == "1" ) {
                        formaDePagamento = "Pix"
                        Funcoes.sistemaEnviarMensagem("Você selecionou a forma de pagamento PIX deseja confirmar?<br><br> 1 - Confirmar <br> 2 - Escolher outra forma <br> 3 - Adicionar mais produtos")
                    }else if ( string.trim() == "2" ) {
                        formaDePagamento = 'Dinheiro'
                        Funcoes.sistemaEnviarMensagem("Você selecionou a forma de pagamento DINHEIRO deseja confirmar?<br><br> 1 - Confirmar <br> 2 - Escolher outra forma <br> 3 - Adicionar mais produtos")
                    }else if ( string.trim() == "3" ) {
                        voltarAoInicio()
                        Funcoes.enviarCardapio()
                        setTimeout(()=>{
                            enviarMensagensItensAdicionados()
                        }, 200)
                    }
                }else{
                    if ( selecionarEndereco == false ){
                        if ( string.trim() == "1" ) {
                            Funcoes.sistemaEnviarMensagem("Forma de pagamento confirmada")
                            Funcoes.sistemaEnviarMensagem("Digite cancelar se quiser adicionar mais itens")
                            Funcoes.sistemaEnviarMensagem("Digite seu endereço com rua, numero e complemento se preferir")
                            
                            selecionarEndereco = true
                        }else if ( string.trim() == "2" ) {
                            formaDePagamento = false
                            Funcoes.sistemaEnviarMensagem("Esolha forma de pagamento <br><br> 1 - Pix <br> 2 - Dinheiro <br> 3 - Adicionar mais produtos")
                        }else if ( string.trim() == "3" ) {
                            voltarAoInicio()
                            Funcoes.enviarCardapio()
                            setTimeout(()=>{
                                enviarMensagensItensAdicionados()
                            }, 200)
                        }
                    }else{
                        if ( string.toLowerCase().trim() == "cancelar" ) {
                            voltarAoInicio()
                            Funcoes.enviarCardapio()
                            setTimeout(()=>{
                                enviarMensagensItensAdicionados()
                            }, 200)
                        }else{
                            if ( string != "1" ) {
                                let msg = ""
                                for ( let v of itensAdicionados) {
                                    msg = msg + `${v[1]}x - ${v[0]}<br>`
                                }
                                msg = msg + `<br>R$${valorTotal}<br>${formaDePagamento} <br><br> Para o endereço : <br><br>${string}`
                                endereco = string
                                Funcoes.sistemaEnviarMensagem(msg)
                                Funcoes.sistemaEnviarMensagem("1 - Confirmar <br> 2 - Adicionar mais produtos<br> Reescreva o endereço se quiser")
                                
                            }
                            
                            if ( endereco != false ) {
                                if ( string == "1" ) {
                                    Funcoes.finalizarCompra(itensAdicionados, formaDePagamento, endereco, valorTotal)
                                }else if ( string == "2" ) {
                                    voltarAoInicio()
                                    Funcoes.enviarCardapio()
                                    setTimeout(()=>{
                                        enviarMensagensItensAdicionados()
                                    }, 200)
                                }
                            }
                        }
                    }
                }
            }
            document.querySelector(".input-enviar-mensagem").value = ""
        }
    }
})

function getQuantidadeItens(){
    let q = 0
    for ( let v in ITENS){
        for ( let i of ITENS[v]){
            q ++
        }
    }
    return q
}

function multiplicarValor(valor1, quantidade) {
    let numero1 = parseFloat(valor1.replace(',', '.'));
  
    let soma = numero1 * quantidade;
  
    return soma.toFixed(2).replace('.', ',');
}

function somarValores(valor1, valor2) {
    console.log(valor2)
    let numero1 = parseFloat(valor1.replace(',', '.'));
    let numero2 = parseFloat(valor2.replace(',', '.'));
  
    let soma = numero1 + numero2;
  
    return soma.toFixed(2).replace('.', ',');
}

function enviarMensagensItensAdicionados(){
    let msg = "Seus itens <br><br>"
    let valor = "0,0"
    for (let v of itensAdicionados ) {
        let total = multiplicarValor(v[2], v[1])
        msg = msg + `${v[1]}x - ${Funcoes.colocarPrimeiraLetraMaiuscula(v[0])} -- R$${total}<br>`
        valor = somarValores(valor, total)
        valorTotal = valor
    }
    msg = msg + `<br><br> Total R$${valor} <br><br>Para remover um item digite remover e o numero do item <br><br>
    ex: remover 1 <br><br>
    Para finalizar a compra digite finalizar`
    Funcoes.sistemaEnviarMensagem(msg)
}

function voltarAoInicio(){
    finalizar = false
    formaDePagamento = false
    selecionarEndereco = false
    endereco = false
}