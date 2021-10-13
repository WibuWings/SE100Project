
const Product = require("../models/product");
const ProductType = require("../models/productType");
const ProductJoinType = require("../models/productJoinType");

class ProductTab {
    //product
     getSomeProducts = async(req, res) => {
        var filter = req.body.filter;

        Product.find(filter).exec()
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(404).send(err);
        })
     }

     createProduct = async(req, res) => {

     };

     updateProduct = async(req, res) => {

     };

     deleteProduct = async(req, res) => {

     };

     importProducts = async(req, res) => {

     };
    //------

    //productTypes
    getSomeProductTypes = async(req, res) => {

    }

    createProductType = async(req, res) => {

    };

    updateProductType = async(req, res) => {

    };

    deleteProductType = async(req, res) => {

    };
    //------

    //productJoin 
    getSomeProductJoins = async(req, res) => {

    };

    createProductJoin = async(req, res) => {

    };

    updateProductJoin = async(req, res) => {

    };

    deleteProductJoin = async(req, res) => {

    };
    //------
};

module.exports = new ProductTab;