// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        
    })

    it('preenche os campos obrigatórios e envia o formulário ', () => {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste'
        cy.get('#firstName').type('')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('uelton.gomes@teste.com.br')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        
    })

    it('exibe mensagem de erro ao submeter o formulário com email com formatação inválida ', () => {
        cy.get('#firstName').type('Uelton')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('uelton.gomes@teste,com.br')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        
    })

    it('campo telefone continua vazio quando preenchid com valor não numérico ', () => {
        cy.get('#phone')
            .type('teste')
            .should('have.value','')
        
    })

    it(' exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Uelton')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('uelton.gomes@teste.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Uelton')
            .should('have.value','Uelton')
            .clear()
            .should('have.value','')

        cy.get('#lastName')
            .type('Gomes')
            .should('have.value','Gomes')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('uelton.gomes@teste.com.br')
            .should('have.value','uelton.gomes@teste.com.br')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('11999999999')
            .should('have.value','11999999999')
            .clear()
            .should('have.value','')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fileMandatoryFieldsAndSubmit('Uelton', 'Gomes','uelton.gomes@uol.com.br')
        cy.get('.success').should('be.visible')
    })
    
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', () => {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
        
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
        
    })

    it(' marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
        
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Uelton')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('uelton.gomes@teste.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            
        })
        
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]')
       .selectFile('@sampleFile')
       .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

       })
    })

    it(' verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('página da política de privacidade removendo o target e então clicando no link ', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')


        
    })

    


}) 