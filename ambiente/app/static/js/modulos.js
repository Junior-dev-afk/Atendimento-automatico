let todosItens = false

class Funcoes {
    constructor(isItem){}

    static async usuarioEnviarMensagem(msg){
        document.querySelector(".chat-menssagens").innerHTML += `
            <div class="msg-cliente">
                ${msg}
            </div>
        `
        this.rolarFinalTela()
    }

    static async sistemaEnviarMensagem(msg){
        document.querySelector(".chat-menssagens").innerHTML += `
            <div class="msg">
                ${msg}
            </div>
        `
        this.rolarFinalTela()
    }

    static rolarFinalTela(){
        document.querySelector(".chat-menssagens").scrollTop = document.querySelector(".chat-menssagens").scrollHeight;
    }

    static colocarPrimeiraLetraMaiuscula(string) {
        if (string.length === 0) {
          return string; // Retorna a string original se ela estiver vazia
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static async getItens(){
        if (todosItens === false) {
            try {
                const response = await fetch('/getItens'); 
                if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                todosItens = data
                return data
            } catch (error) {
                console.error('Houve um problema com a requisição fetch:', error);
            }
        } else {
            return todosItens
        }
    }

    static async gerarCardapio(){
        let Itens = await this.getItens()
        let msg = ""

        let index = 1
        for (let i in Itens){
            msg = msg + `<br>${i}<br><br>`
            for (let v of Itens[i]) {
                msg = msg + `<label id = "${v[0]}" class="linha-cardapio" for="">${index} - ${this.colocarPrimeiraLetraMaiuscula(v[0])} -- ${v[1]}</label><br>`
                index ++
            }
        }
        msg = msg + `<br>`
        return msg
    }

    static getItemFromIndex(index){

        const lines = document.querySelectorAll('.linha-cardapio');  
        for (let line of lines) {
            if (parseInt(line.innerHTML[0]) == index) {
                return line.id
            }
        }

    }

    static async enviarCardapio(){
        document.querySelector(".chat-menssagens").innerHTML += `
            <div class="msg">
                ${await this.gerarCardapio()}
            </div>
        `
    }

    static finalizarCompra(todosItens, formaDePagamento, endereco, valorTotal){
        console.log(todosItens, formaDePagamento, endereco, valorTotal)
    }

}
export default Funcoes