const joi = require("joi");

const id = joi.string().uuid();
const roleName = joi.string().min(3).max(15);
const roleDescription = joi.string().min(15).max(255);

const createRoleSchema = joi.object({
    roleName: roleName.required(),
    roleDescription: roleDescription.required(),
});

const updateRoleSchema = joi.object({
    roleName: roleName,
    roleDescription: roleDescription,
});

const getRoleSchema = joi.object({
    id: id.required(),
});

module.exports = { getRoleSchema, updateRoleSchema, createRoleSchema };