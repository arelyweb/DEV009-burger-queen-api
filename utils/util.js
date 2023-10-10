module.exports.idOrEmail = (parram) => {
    if (parram.indexOf('@') >= 0) return { email: parram };
    return { _id: parram };
  };

module.exports.validPassword = (password) => ((password.length <= 3));
module.exports.ValidEmail = (email) => {
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return !!(emailRegex.test(email));
};