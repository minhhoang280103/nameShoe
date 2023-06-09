"use strict";

const express = require('express');
const router = express.Router({});
const BrandController = require('../controllers/producController.js');

// router.get('/list', BrandController.getList);
router.get("/list", (req, res) => {
    BrandController.getList().then(rs =>{
        res.render("pages/auth/brand_user", {
            product: rs,
        })
    })
  });


  router.post("/add", BrandController.addProduct);
router.get("/detail/:id", BrandController.getProductDetail);
router.post("/edit", BrandController.editProduct);
router.delete("/delete/:id", BrandController.DeleteProduct)
// router.post("/add", BrandController.addBrand);
// router.get("/detail/:id", BrandController.getBrandDetail);
// router.post("/edit", BrandController.editBrand);
// router.delete("/delete/:id", BrandController.DeleteBrand)


module.exports = router;