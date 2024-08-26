var db = require("../config/connection");
var collection = require("../config/collection");
var objectId = require("mongodb").ObjectID;
module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        callback(data.ops[0]._id);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteProducts: (prodId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .removeOne({ _id: objectId(prodId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getProductDetails: (prodId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: objectId(prodId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  updateProduct: (prodId, prodDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: objectId(prodId) },
          {
            $set: {
              Name: prodDetails.Name,
              Description: prodDetails.Description,
              Price: prodDetails.Price,
              Category: prodDetails.Category,
            },
          }
        )
        .then((response) => {
          resolve(response);
        });
    });
  },
};
