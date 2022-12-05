import SignupPage from '../../../pages/SignupPage'

describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
        //Populando dados para testes
        var entregador = {
            nome: 'Fulano de Tal',
            cpf: '12345678910',
            email: 'fulano@hotmail.com',
            telefone: '62981828384',
            endereco: {
                cep: '75389121',
                rua: 'Rua Mário de Melo',
                numero: '0',
                complemento: 'Q27 L16 Casa 3',
                bairro: 'Setor Cristina II',
                cidade: 'Trindade/GO',
            },
            metodo_entrega: 'Bicicleta',
            cnh: 'cnh-digital.png'
        }

        var signup = new SignupPage()

        signup.go()
        signup.preencherForm(entregador)
        signup.submeterForm()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.validarModal(expectedMessage)



        //Fechar modal
        cy.get('.swal2-confirm').click()
    })

    it('Usuário com CPF inválido', () => {

        //Populando dados para testes
        var entregador = {
            nome: 'Fulano de Tal',
            cpf: '123456789AA',
            email: 'fulano@hotmail.com',
            telefone: '62981828384',
            endereco: {
                cep: '75389121',
                rua: 'Rua Mário de Melo',
                numero: '0',
                complemento: 'Q27 L16 Casa 3',
                bairro: 'Setor Cristina II',
                cidade: 'Trindade/GO',
            },
            metodo_entrega: 'Bicicleta',
            cnh: 'cnh-digital.png'
        }

        var signup = new SignupPage()

        signup.go()
        signup.preencherForm(entregador)
        signup.submeterForm()
        signup.validarAlertaCPF('Oops! CPF inválido')
    })
});