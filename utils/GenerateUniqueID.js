const GenerateUniqueID = () => {
  return '_' + Math.random().toString(36).slice(2, 9);
}

module.exports = GenerateUniqueID;