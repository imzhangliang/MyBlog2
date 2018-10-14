'use strict';
// ****** {{ modelDesc }}实体 ******
module.exports = (sequelize, DataTypes) => {
  const {{ capModelName }} = sequelize.define('{{ modelName }}', {
    {% for field in fields %}{{ field.fieldName }}: { //{{ field.fieldDesc }}
      type: DataTypes.{{ field.fieldType }}, 
      allowNull: false 
    },
    {% endfor %}
  }, {});
  {{ capModelName }}.associate = function(models) {
    // associations can be defined here
  };
  return {{ capModelName }};
};