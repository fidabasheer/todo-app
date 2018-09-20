const User = require('./todo.model');


exports.getAll = list;
exports.getOne = findOne;
exports.create = create;
exports.delete = deleteOne;
exports.update = updateOne;
exports.dall=clearcomplete;

function list(req, res) {
User.fetchAll({}).then(function(user){
    user=user.toJSON();
    res.send(user);
});

}

function findOne(req, res) {
User.where({todo_id: req.params.id}).fetch().then(function(user) {
    if (!user) {
      return res.status(400).send("no such person");
    }
    user=user.toJSON();
    res.json(user);
  });
}

function deleteOne(req, res) {
   User.where({todo_id: req.params.id}).destroy().then(function(user) {
user=user.toJSON();
    res.send(user);
     
  });
}


 function clearcomplete(req, res) {
  // Callback method
  new User().where({status: 1}).destroy(function(err, user) {
    if(err) return res.json(err)
    var users = user.toJSON();
    return res.json(users);
  });}
//   // Promise method with then
//   new User().where({status: 1}).destroy()
//   .then(user => user.toJSON())
//   .then(users => res.json(users))
//   .catch(err => res.json(err));

//   try {
//     let user = await new User().where({status: 1}).destroy();
//     lset users = user.toJSON();
//   } catch (error) {
//     res.json(err);
//   }
// }

// function myPromiseFn() {
//   return Promise.reject(data);
// }


function create(req, res) {
new User({ todo_id: req.body.todo_id, title: req.body.title, description: req.body.description, status: req.body.status, created_date: req.body.created_date, last_updated_date: req.body.last_updated_date }).save(null, { method: 'insert' }).then(function (model) {
   model = model.toJSON();
   res.send(model);
 });
}

function updateOne (req,res){
   
  new User({todo_id: req.params.id })
        .save({
            title: req.body.title ? req.body.title : undefined,
            description: req.body.description ? req.body.description : undefined,
            status: req.body.status ? req.body.status : undefined,
            last_updated_date: req.body.last_updated_date ? req.body.last_updated_date : undefined,
        }, { patch: true, method: 'update' })
        .then(model=> model.toJSON())
        .then(user=> res.json(user));
}