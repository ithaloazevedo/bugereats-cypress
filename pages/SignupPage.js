

class SignupPage {

    go() {
        //Setar resolução
        cy.viewport(1440, 900)
        //Redirecionar navegador para a url
        cy.visit('https://buger-eats-qa.vercel.app')

        //Clicar no botão "Cadastre-se para fazer entregas"
        cy.get('a[href="/deliver"]').click()
        //Verificar se fomos redirecionados para o formulário de cadastro
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    preencherForm(entregador) {

        //Preenchendo formulário
        cy.get('input[name="fullName"]').type(entregador.name)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name = "address-number"]').type(entregador.address.number)
        cy.get('input[name = "address-details"]').type(entregador.address.details)

        cy.get('input[name="address"]').should('have.value', entregador.address.street)
        cy.get('input[name="district"]').should('have.value', entregador.address.district)
        cy.get('input[name="city-uf"]').should('have.value', entregador.address.city_state)

        //Identificando elemento que 'delivery-method li' que contém o contéudo 
        //de entregador.metodo_entrega (bicicleta) 
        cy.contains('.delivery-method li', entregador.delivery_method).click()

        //Seletores CSS
        //[attribute="value"] -> busca o atributo que contém exatamente o valor
        //[attribute^="value"] -> busca o atributo que começa com o valor
        //[attribute$="value"] -> busca o atributo que termina com o valor
        //[attribute*="value"] -> busca o atributo que contenha a substring do valor  (ex:test, unity test, tests, testing)
        //[attribute~="value"] -> busca o atributo que contenha a string do valor (ex: test, unity test)

        //Realizando upload da CNH
        cy.get('input[accept^="image"]').attachFile(entregador.cnh)
    }

    submeterForm() {
        //Clicar no botão de envio de formulário
        cy.get('button[type="submit"]').click()
    }

    validarModal(expectedMessage) {
        //Validar aparição da modal
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    }

    validarAlertaCPF(expectedMesssage) {
        cy.get('span[class="alert-error"]').should('have.text', expectedMesssage)
    }

    mensagemDeAlertaDeveSer(expectedMessage) {
        //Valida se existe o elemento com a mensagem e se ele é visivel
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default SignupPage;