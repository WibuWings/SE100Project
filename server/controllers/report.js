const xl = require("excel4node");

const { JWTVerify } = require("../helper/JWT");
const Receipt = require("../models/receipt");
const MESSAGES = {
    SIGN_IN_SUCCESS: "Sign-in successfully.",
    REGISTER_SUCCESS: "Register successfully.",
    RESET_PASSWORD_SUCCESS: "Reset password successfully.",
    PASSWORD_OR_ACCOUNT_ERROR:
        "The email IS NOT registered or you entered the WRONG password.",
    EMAIL_ERROR: "The email IS NOT registered.",
    EMAIL_HAS_BEEN_USED:
        "The email address has been used for regular or Google account.",
    EMAIL_USED_GG: "The email has to sign in WITH GOOGLE.",
    MONGODB_ERROR: "Some errors with database.",
    FAILURE_UPDATE: "failure when update",
    FAILURE_ADD: " failure when adding ",
    FAILURE_DELETE: "failure when delete",
};
const STATUS = {
    SUCCESS: 1,
    FAILURE: -1,
};

class meProfile {
    exportReport = async (req, res) => {
        var from = new Date(req.body.from);
        var end = new Date(req.body.end);
        var storeID = req.body.storeID;

        from = new Date(
            from.getFullYear(),
            from.getMonth(),
            from.getDate(),
            0,
            0,
            0
        );
        end = new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDate(),
            23,
            59,
            59
        );

        var wb = new xl.Workbook();
        var topMargin = 1;
        var leftMargin = 1;

        // Add Worksheets to the workbook
        var ws = wb.addWorksheet("Sheet 1");

        // Create a reusable style
        var style = wb.createStyle({
            font: {
                color: "#000000",
                size: 12,
            },
            numberFormat: "#,##0.00; (#,##0.00); -",
            border: { // §18.8.4 border (Border)
                left: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                right: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                top: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                bottom: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
            },
        });
        var headerStyle = wb.createStyle({
            font: {
                color: "#000000",
                size: 14,
                bold: true,
            },
            numberFormat: "$#,##0.00; ($#,##0.00); -",
            alignment: { // §18.8.1
                horizontal:'center',
                vertical:'center',
                wrapText: true
            },
            border: { // §18.8.4 border (Border)
                left: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                right: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                top: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                bottom: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
            },
        });
        var titleStyle = wb.createStyle({
            font: {
                color: "#000000",
                size: 16,
                bold: true,
            },
            alignment: { // §18.8.1
                horizontal:'center',
                vertical:'center',
                wrapText: true
            },
            border: { // §18.8.4 border (Border)
                left: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                right: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                top: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                bottom: {
                    style: 'medium', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
            },
        });

        // Set value of cell A1 to 100 as a number type styled with paramaters of style
        ws.cell(1 + topMargin, 1 + leftMargin)
            .number(100)
            .style(titleStyle);
        // title
        ws.cell(
            1 + topMargin,
            1 + leftMargin,
            1 + topMargin,
            7 + leftMargin,
            true
        )
            .string(
                `Revenue report ${getDateString(from)} - ${getDateString(end)}`
            )
            .style(titleStyle);
        // header
        ws.cell(2 + topMargin, 1 + leftMargin)
            .string("Receipt ID")
            .style(headerStyle);
        ws.cell(2 + topMargin, 2 + leftMargin)
            .string("User")
            .style(headerStyle);
        ws.cell(2 + topMargin, 3 + leftMargin)
            .string("Money (VND)")
            .style(headerStyle);
        ws.cell(2 + topMargin, 4 + leftMargin)
            .string("Discount")
            .style(headerStyle);
        ws.cell(2 + topMargin, 5 + leftMargin)
            .string("Date")
            .style(headerStyle);
        ws.cell(2 + topMargin, 6 + leftMargin)
            .string("Edited")
            .style(headerStyle);
        ws.cell(2 + topMargin, 7 + leftMargin)
            .string("Deleted")
            .style(headerStyle);

        var startDataRow = 3;
        var receipts = await Receipt.find({"_id.storeID": storeID}).exec();

        var filtedReceipts = receipts.filter(element => {
            var splited = element.createAt.split("/");
            splited = splited.map(element => element.trim())
            var itsDate = new Date(parseInt(splited[2]),parseInt(splited[1]) - 1,parseInt(splited[0]));
            return itsDate - end <= 0 && itsDate - from >= 0;
        })
        // data row
        filtedReceipts.forEach((element, index) => {
            var currentRow = startDataRow + index;
            ws.cell(currentRow + topMargin, 1 + leftMargin)
                .string(element._id.receiptID)
                .style(style);
            ws.cell(currentRow + topMargin, 2 + leftMargin)
                .string(element.employeeID.name)
                .style(style);
            ws.cell(currentRow + topMargin, 3 + leftMargin)
                .number(element.totalMoney)
                .style(style);
            ws.cell(currentRow + topMargin, 4 + leftMargin)
                .number(element.discount)
                .style(style);
            ws.cell(currentRow + topMargin, 5 + leftMargin)
                .string(element.createAt)
                .style(style);
            ws.cell(currentRow + topMargin, 6 + leftMargin)
                .bool(element.isEdit)
                .style(style);
            ws.cell(currentRow + topMargin, 7 + leftMargin)
                .bool(element.deleted)
                .style(style);
        });

        //response for client
        wb.write("Excel.xlsx", res);
    };
}

function getDateString(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = new meProfile();
