
const {getCurrentDateTimeString} = require('../helper/DateTime');
// db model
const Product = require("../models/product");
const ProductType = require("../models/productType");
const ProductJoinType = require("../models/productJoinType");

class ProductTab {
    //product
    getSomeProducts = async (req, res) => {
        var filter = typeof req.body.filter === 'object' ? req.body.filter : JSON.parse(req.body.filter);
        
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
        _id.importDate = new Date(_id.importDate);

        Product.findOneAndUpdate({_id}, updateFields, { returnOriginal: false })
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
        var reqProducts = req.body.products;

        reqProducts.forEach(element => {
            element.importDate= new Date(element.importDate);
        });
        Product.deleteMany({_id : { $in: [...reqProducts]}})
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
        var filter = typeof req.body.filter === 'object' ? req.body.filter : JSON.parse(req.body.filter);
        ProductType.find(filter)
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
        var reqProductType = req.body.productType;
        var { _id, ...updateFields } = reqProductType;

        ProductType.findOneAndUpdate({_id}, updateFields, { returnOriginal: false })
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
        var reqProductTypeIDs = req.body.productTypes;

        ProductType.deleteMany({_id : { $in: [...reqProductTypeIDs]}})
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
    getSomeProductJoins = async (req, res) => {
        var filter = typeof req.body.filter === 'object' ? req.body.filter : JSON.parse(req.body.filter);

        ProductJoinType.find(filter)
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

    createProductJoin = async (req, res) => {
        var reqProductJoinType = req.body.productJoinType;

        var newProductJoinType = new ProductJoinType({
            _id: {
                productID: reqProductJoinType._id.productID,
                typeID: reqProductJoinType._id.typeID,
                importDate: reqProductJoinType._id.importDate,
                storeID: reqProductJoinType._id.storeID,
            },
        })

        newProductJoinType.save()
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

    updateProductJoin = async (req, res) => {
        var reqProductJoinType = req.body.productJoinType;
        var { _id } = reqProductJoinType;

        ProductJoinType.deleteOne({_id})
        .then(data => {
            var newProductJoinType = new ProductJoinType({_id});
            
            newProductJoinType.save()
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        email: res.locals.decoded.email,
                        token: res.locals.newToken,
                    })
                );
            })
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    };

    deleteProductJoin = async (req, res) => {
        var reqProductJoinTypes = req.body.productJoinTypes;
        
        reqProductJoinTypes.forEach(element => {
            element.importDate= new Date(element.importDate);
        });
        ProductJoinType.deleteMany({_id : { $in: [...reqProductJoinTypes]}})
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
}

module.exports = new ProductTab();
