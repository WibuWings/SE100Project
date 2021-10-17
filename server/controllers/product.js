
const {getCurrentDateTimeString} = require('../helper/DateTime');
// db model
const Product = require("../models/product");
const ProductType = require("../models/productType");
const ProductJoinType = require("../models/productJoinType");

class ProductTab {
    //product
    getSomeProducts = async (req, res) => {
        var filter = req.body.filter;

        Product.find(filter)
            .exec()
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        email: res.locals.decoded.email,
                        token: res.locals.newToken,
                        data,
                    })
                );
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    };

    createProduct = async (req, res) => {
        var reqProduct = req.body.product;

        var newProduct = new Product({
            _id: {
                productID: reqProduct._id.productID,
                importDate: reqProduct._id.importDate,
                storeID: reqProduct._id.storeID,
            },
            name: reqProduct.name,
            imgUrl: reqProduct.imgUrl,
            quantity: reqProduct.quantity,
            remain: reqProduct.remain,
            unit: reqProduct.unit,
            importPrice: reqProduct.importPrice,
            sellPrice: reqProduct.sellPrice,
            expires: reqProduct.expires,
        });

        newProduct
            .save()
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        email: res.locals.decoded.email,
                        token: res.locals.newToken,
                        data,
                    })
                );
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    };

    updateProduct = async (req, res) => {
        var reqProduct = req.body.product;
        var { _id, ...updateFields } = reqProduct;

        Product.findOneAndUpdate({}, updateFields, { returnOriginal: false })
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    data,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    };

    deleteProduct = async (req, res) => {
        var reqProductIDs = req.body.data.product;

        Product.deleteMany({_id : { $in: [...reqProductIDs]}})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    };

    importProducts = async (req, res) => {};
    //------

    //productTypes
    getSomeProductTypes = async (req, res) => {
        var filter = req.body.filter;

        ProductType.find({filter})
        .then(data => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    data,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        })
    };

    createProductType = async (req, res) => {
        var reqProductType = req.body.productType;

        var newProductType = new ProductType({
            _id: {
                typeID: reqProductType._id.typeID,
                storeID: reqProductType._id.storeID,
            },
            name: reqProductType.name,
            createdAt: getCurrentDateTimeString(),
        })

        newProductType.save()
        .then(data => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    data,
                })
            );
        }).catch((err) => {
            res.status(404).send(err);
        });
    };

    updateProductType = async (req, res) => {
        var reqProductType = req.body.data.productType;
        var { _id, updateFields } = reqProductType;

        ProductType.findOneAndUpdate(_id, updateFields, { returnOriginal: false })
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    data,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    };

    deleteProductType = async (req, res) => {
        var reqProductTypeIDs = req.body.data.productTypes;

        Product.deleteMany({_id : { $in: [...reqProductTypeIDs]}})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    };
    //------

    //productJoin
    getSomeProductJoins = async (req, res) => {};

    createProductJoin = async (req, res) => {};

    updateProductJoin = async (req, res) => {};

    deleteProductJoin = async (req, res) => {};
    //------
}

module.exports = new ProductTab();
