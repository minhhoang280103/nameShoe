"use strict";

const { error } = require('console');

const Product = require('../models/product.js').Product

function ProductController() {
    const SELF = {
      SIZE: 8,
    };
    return{
        getList: (page, keySearch) => {
          try {
            let skip = (parseInt(page) - 1) * SELF.SIZE;
            let regex = new RegExp(keySearch);
            return Product.find()
              .skip(skip)
              .limit(SELF.SIZE)
              .then((rs) => {
                return rs
              })
              .catch((error) => {
              });
          } catch (error) {
            console.log(error);
          }
          },
          addProduct: (req, res) => {
            try {
              let data = req.body;
              console.log(data);
              return Product.create(data)
                .then((rs) => {
                  return res.redirect("/product/list");
                })
                .catch((err) => {
                  res.send({ s: 400, msg: err });
                });
            } catch (error) {
              console.log(error);
            }
          },
          getListDB: () => {
            try {
              return new Promise((resolve, reject) => {
                Product.find()
                  .then((rs) => {
                    resolve(rs);
                  })
                  .catch((err) => {
                    console.log(err);
                    reject(err);
                  });
              });
            } catch (error) {
              console.log(error);
            }
          },
          getProductDetail: async (req, res) => {
            try {
              let productId = req.params?.id;
              let productInfo = await Product.findById(productId);
              if (!productInfo) {
                return res.json({ s: 404, msg: "Product not found" });
              }
              return res.json({ s: 200, data: productInfo });
            } catch (error) {
              console.log(error);
            }
          },
          editProduct: async (req, res) => {
            try {
              let data = req.body;
              let productInfo = await Product.findById(data?._id);
              if (!productInfo) {
                return res.json({ s: 404, msg: "Product not found" });
              }
              delete data._id;
              return Product.findByIdAndUpdate(productInfo._id, data)
                .then((rs) => {
                  if (rs) {
                    res.redirect("/product/list");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (error) {
              console.log(error);
            }
          },
          DeleteProduct: async (req, res) => {
            try {
              console.log("qưe");
              const productId = req.params?.id;
              console.log(productId);
              const productInfo = await Product.findById(productId);
              if (!productInfo) {
                return res.json({ s: 404, msg: "Product not found" });
              }
              Product.deleteOne({ _id: productId })
                .then((rs) => {
                  console.log(rs);
                  return res.json({ s: 200, msg: "Delete product success!!" });
                })
                .catch((e) => {
                  console.log(`DeleteProduct - fail: ${e}`);
                  return rs.json({ s: 400, msg: "Delete product fail" });
                });
            } catch (error) {
              console.log(error);
            }
          },
          
    }
}

//xuất ProductController
module.exports = new ProductController();