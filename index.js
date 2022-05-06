const Modal = {
    open(){
        // abrir o modal
        // adcionar a class active do modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active')
        // trocar essas duas funções por uma função toggle. Atividade.
    }
}


const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/09/2021'
        },
        {
            description: 'Website',
            amount: 500000,
            date: '23/09/2021'
        },
        {
            description: 'aluguel',
            amount: -150000,
            date: '23/09/2021'
        },
        {
            description: 'App',
            amount: 200000,
            date: '23/09/2021'
        },
        {
            description: 'Agiota',
            amount: -198665,
            date: '23/09/2021'
        },
        {
            description: 'Jogo do bicho',
            amount: 69878,
            date: '23/09/2021'
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction)
        
        App.releod()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.releod()
    },

    incomes() {
        let income = 0; 
        // pegar todas as transações
        Transaction. all.forEach(transaction => {
            // se for maior que zero
            if(transaction.amount > 0){
                // para cada transação, se ela for maior que zero
                income += transaction.amount;
            }
            // somar a uma variavel e retornar a variavel
        })
        return income;
    },

    expenses() {
        //somar as saídas
        let expense = 0; 
        // pegar todas as transações
        Transaction.all.forEach(transaction => {
            // se for menor que zero
            if(transaction.amount < 0){
                // para cada transação, se ela for maior que zero
                expense += transaction.amount;
            }
            // somar a uma variavel e retornar a variavel
        })
        return expense;
    },

    total() {
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses();
    }
}

// Substituir os dados do HTML com os dados do JS

const dadosTabela = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = dadosTabela.innerHTMLTransaction(transaction)

        dadosTabela.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        //trocar expense por um income quando o amount for maior do que zero.
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date"${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover transação">
            </td>
            `
        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());

        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransections() {
        dadosTabela.transactionsContainer.innerHTML = ""
    }
}

// converter os valores para o Real BR
const Utils = {
    formatCurrency(value) {
       const signal = Number(value) < 0 ? "-" : ""

       value = String(value).replace(/\D/g, "") // expressão regular, (Regex)

       value= Number(value) / 100

       value = value.toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"
       })
        
       return signal + value
        
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getvaleus() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }       
    },

    validateFields(){
        const { description, amount, date } = Form.getvaleus()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "" ) {
            throw new Error("Por favor, preencha todos os campos")
        } 
    },
    submit(event) {
        event.preventDefault()

        try {
             Form.validateFields()
        // formatar os dados para salvar
        // salvar
        // apagar os dados do formulario
        // modal feche
        // atualizar a aplicação     
        } catch (error) {
            alert(error.message)
        }

       
    
    }
}

const App = {
    init() {

        // dadosTabela.addTransaction(transactions[0])
        // dadosTabela.addTransaction(transactions[1])
        // dadosTabela.addTransaction(transactions[2])
        // for(let i = 0; i < 3; i++) {
        // }
        Transaction.all.forEach(transaction =>{
            dadosTabela.addTransaction(transaction)
        })
        
        dadosTabela.updateBalance()
        
    },
    releod() {
        dadosTabela.clearTransections()
        App.init()
    },
}

App.init();



