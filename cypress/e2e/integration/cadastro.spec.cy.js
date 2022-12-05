import SignupPage from '../../../pages/SignupPage'

describe('Cadastro', () => {

    beforeEach(function () {
        cy.fixture('deliver.json').then(function (d) {
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function () {


        var signup = new SignupPage()

        signup.go()
        signup.preencherForm(this.deliver.signup)
        signup.submeterForm()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.validarModal(expectedMessage)



        //Fechar modal
        cy.get('.swal2-confirm').click()
    })

    it('Usuário com CPF inválido', function () {



        var signup = new SignupPage()

        signup.go()
        signup.preencherForm(this.deliver.cpf_invalido)
        signup.submeterForm()
        signup.validarAlertaCPF('Oops! CPF inválido')
    })
})
