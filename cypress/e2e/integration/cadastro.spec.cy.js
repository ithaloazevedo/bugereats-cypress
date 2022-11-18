describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
        //Setar resolução
        cy.viewport(1440, 900)
        //Redirecionar navegador para a url
        cy.visit('https://buger-eats.vercel.app')

        //Clicar no botão "Cadastre-se para fazer entregas"
        cy.get('a[href="/deliver"]').click()
        //Verificar se fomos redirecionados para o formulário de cadastro
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para fazer entregas')

        //Populando dados para testes
        var entregador = {
            nome: 'Fulano de Tal',
            cpf: '12345678910',
            email: 'fulano@hotmail.com',
            whatsapp: '62981828384'
        }
    })
});