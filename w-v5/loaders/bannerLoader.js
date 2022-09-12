const schemaJson = {
  type: 'object',
  properties: {
    author: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

module.exports = function (content) {
  const options = this.getOptions(schemaJson);

  const prefix = `
    /*
        Author ${options.author}
    */
  `;

  return prefix + content;
};
