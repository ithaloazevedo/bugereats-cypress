describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
        //Setar resolução
        cy.viewport(1440, 900)
        //Redirecionar navegador para a url
        cy.visit('https://buger-eats.vercel.app')

        //Clicar no botão "Cadastre-se para fazer entregas"
        cy.get('a[href="/deliver"]').click()
        //Verificar se fomos redirecionados para o formulário de cadastro
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

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
            cnh: 'cng-digital.png'
        }

        //Preenchendo formulário
        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.telefone)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name = "address-number"]').type(entregador.endereco.numero)
        cy.get('input[name = "address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade)

        //Identificando elemento que 'delivery-method li' que contém o contéudo 
        //de entregador.metodo_entrega (bicicleta) 
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        //Seletores CSS
        //[attribute="value"] -> busca o atributo que contém exatamente o valor
        //[attribute^="value"] -> busca o atributo que começa com o valor
        //[attribute$="value"] -> busca o atributo que termina com o valor
        //[attribute*="value"] -> busca o atributo que contenha a substring do valor  (ex:test, unity test, tests, testing)
        //[attribute~="value"] -> busca o atributo que contenha a string do valor (ex: test, unity test)

        //Realizando upload da CNH
        cy.get('input[accept^="image"]').attachFile(entregador.cnh)
    })
});