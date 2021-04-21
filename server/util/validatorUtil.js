"use strict";

const Validator = require("validator");

/**
 * This utility class is used to validate and sanitize input before use.
 */
class ValidatorUtil {
    constructor() {}

    validationErrors(reason) {
        let fullReason = "";
        reason.forEach(reas => {
            fullReason += reas + " ";
        });
        fullReason = fullReason.slice(0, fullReason.length - 1);
        return fullReason;
    }

    /**
     * Validates the provided id, checking for null or non integer values.
     *
     * @param {number} id The user's provided id.
     * @returns        Returns an object containing the validation errors as Object.error or
     *                           the validated id.
     */
    validateId(id) {
        let reason = [];

        if (id == null) {
            reason.push("Invalid id; null values are not allowed");
        } else if (!Number.isInteger(id)) {
            reason.push("Invalid id; non integer values are not allowed");
        }
        return reason.length ? { error: this.validationErrors(reason) } : id;
    }

    /**
     * Validates the provided username and password, checking if they are empty.
     * The username is also sanitized.
     *
     * @param {string} username The user's provided username.
     * @param {string} password The user's provided password.
     * @returns        Returns an object containing the validation errors as Object.error or
     *                          the validated and sanitized username.
     */
    validateUserLogin(username, password) {
        let reason = [];

        if (Validator.isEmpty(username)) {
            reason.push("Invalid username; empty values are not allowed.");
        }
        if (Validator.isEmpty(password)) {
            reason.push("Invalid password; empty values are not allowed.");
        }
        username = Validator.escape(username);
        username = Validator.trim(username);
        username = Validator.stripLow(username);
        return reason.length ? { error: this.validationErrors(reason) } : username;
    }

    /**
     * Validates and sanitizes the ids in the provided StudentDTO instance.
     *
     * @param {StudentDTO} student The StudentDTO instance to be validated and sanitized.
     * @returns            Returns an object containing the validation errors as Object.error or
     *                           the validated and sanitized StudentDTO instance.
     */
    validateStudent(student) {
        let reason = [];
        let keys = Object.keys(student);
        keys.splice(keys.indexOf("id"), 1);

        keys.forEach(key => {
            let validatedId = this.validateId(student[key]);
            if (validatedId.error) {
                reason.push(`${key}: ${validatedId.error}`);
            }
        });
        return reason.length ? { error: this.validationErrors(reason) } : student;
    }
}
module.exports = ValidatorUtil;