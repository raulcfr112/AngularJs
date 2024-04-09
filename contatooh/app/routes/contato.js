module.exports = function(app) {
    var controller = app.controllers.contato;
    app.get('/contatos', controller.listaContatos);
    app.get('/contatos/:id', controller.obtemContato);
    app.delete('/contatos/:id', controller.removeContato);
};

controller.removeContato = function(req, res) {
    console.log('API: removeContato: ');
};