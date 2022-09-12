const babel = require('@babel/core');
const jsonSchema = {
  type: 'object',
  properties: {
    presets: {
      type: 'array',
    },
  },
  additionalProperties: true,
};
module.exports = function (content) {
  const callback = this.async();
  const options = this.getOptions(jsonSchema);
  console.log(options);
  babel.transform(content, options, function (err, result) {
    if (err) callback(err);
    else callback(null, result?.code);
  });
};
