const catchError = require('../utils/catchError');
const user = require('../models/User');


const getAll = catchError(async(req, res) => {
    const result = await user.findAll()
    return res.json(result)
});

const create = catchError(async(req, res) => {
    const result = await user.create(req.body)
    return res.status(201).json(result)
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await user.findByPk(id)
    if (!result) res.sendStatus(404)
    return res.json(result)
})

const destroy = catchError(async(req, res) => {
    const {id} = req.params
    const result = await user.destroy({where: {id: id}})
    if (result === 0) res.sendStatus(404)
    return res.sendStatus(204)
})

const update = catchError(async (req, res) => {
    const { id } = req.params
    const result = await user.update(
      req.body,
      { where: { id }, returning: true }
    )
    if (result[0] === 0) res.sendStatus(404)
    
    return res.json(result[1][0])
  
  })





module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}
