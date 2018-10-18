


function baseModel(ModelClass) {

    ModelClass.add = function (model) {
        return ModelClass.create(model).then(function (obj) {
            return obj;
        }).catch(function (err) {
            return null;
        });
    }

    ModelClass.edit = function (model) {
        return ModelClass.update(model, {
            where: {
                id: model.id
            }
        }).then(function (res) {
            return res[0];
        }).catch(function (err) {
            return 0;
        });
    }

    ModelClass.addOrEdit = function (model) {
        if (model.id) {
            return ModelClass.editPost(model).then(function (num) {
                return num;
            });
        } else {
            return ModelClass.addPost(model).then(function (res) {
                if (res) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
    }

    ModelClass.get = function (id) {
        return ModelClass.findOne({ where: { id: id } }).then(function (obj) {
            return obj;
        });
    }

    ModelClass.delete = function (id) {
        return ModelClass.destroy({ where: { id: id }, limit: 1 }).then(function (num) {
            return num;
        });
    }

    ModelClass.searchList = function (where, offset, limit) {
        return ModelClass.findAll({
            where: where,
            limit: limit,
            offset: offset
        }).then(function (objs) {
            return objs;
        })
    }

    ModelClass.searchListByPage = function (where, pageNum, pageSize) {
        let offset = (pageNum - 1) * pageNum;
        let limit = pageSize;

        return ModelClass.searchList(where, offset, limit);
    }
}


module.exports = baseModel;