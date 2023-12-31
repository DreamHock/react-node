module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      image: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Annonce = mongoose.model("annonce", schema);
  return Annonce;
};
