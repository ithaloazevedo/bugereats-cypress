import SignupPage from '../../../pages/SignupPage'

describe('Cadastro', () => {
    var signup = new SignupPage()
    beforeEach(function () {
        cy.fixture('deliver.json').then(function (d) {
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function () {
        signup.go()
        signup.preencherForm(this.deliver.signup)
        signup.submeterForm()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.validarModal(expectedMessage)
        //Fechar modal
        cy.get('.swal2-confirm').click()
    })

    it('Usuário com CPF inválido', function () {
        signup.go()
        signup.preencherForm(this.deliver.invalidCpf)
        signup.submeterForm()
        signup.validarAlertaCPF('Oops! CPF inválido')
    })

    it('Usuário com email inválido', function () {
        signup.go()
        signup.preencherForm(this.deliver.invalidEmail)
        signup.submeterForm()
        signup.validarAlertaCPF('Oops! Email com formato inválido.')
    })

    it('O usuário não preencheu os campos obrigatórios', function () {
        signup.go()
        signup.submeterForm()
        signup.mensagemDeAlertaDeveSer('É necessário informar o nome')
        signup.mensagemDeAlertaDeveSer('É necessário informar o email')
        signup.mensagemDeAlertaDeveSer('É necessário informar o CPF')
        signup.mensagemDeAlertaDeveSer('É necessário informar o CEP')
        signup.mensagemDeAlertaDeveSer('É necessário informar o número do endereço')
        signup.mensagemDeAlertaDeveSer('Selecione o método de entrega')
        signup.mensagemDeAlertaDeveSer('Adicione uma foto da sua CNH')


    })
})
