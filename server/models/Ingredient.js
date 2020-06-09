const { Model } = require('objection');

class Ingredient extends Model {
    static get tableName() {
        return "ingredients";
    }
}

module.exports = Ingredient;