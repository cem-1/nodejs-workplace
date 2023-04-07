const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const User = require("../models/user");

router.get("/login",authController.getLogin);
router.get("/signup",authController.getSignup);
router.get("/reset",authController.getReset)
router.get("/reset/:token",authController.getNewPassword)

router.post("/login",
            [
                body("email")
                    .isEmail()
                    .withMessage("Please enter a valid e-mail."),
                
                body("password","Please enter a valid password.")
                    .isLength({min: 5})
                    .isAlphanumeric()
                    .trim(),
                ],
            authController.postLogin
);
router.post("/signup", 
                [
                body("email")
                    .isEmail()
                    .withMessage("Please enter a valid e-mail."),
                /* OPTIONALLY YOU CAN ADD A CUSTOM VALIDATOR LIKE BELOW
                 *   .custom((value, {req}) => {
                 *       if (value === "test@test.com"){
                 *           throw new Error("This email adress is forbidden.")
                 *       }
                 *       return true;
                 *   }), 
                 */

                body("password","Please enter a valid password.")
                    .isLength({min: 5})
                    .isAlphanumeric()
                    .trim(),

                body("confirmPassword").custom((value, {req}) => {
                    if (value !== req.body.password){
                        throw new Error("Your passwords do not match.");
                    }
                    return true;
                })
                ],
                authController.postSignup
            );
router.post("/logout",authController.postLogout);
router.post("/reset",authController.postReset)
router.post("/new-password",authController.postNewPassword);

module.exports = router;