const { z } = require("zod")

const requiredbody = z.object({
        email: z
        .email({message: "Please enter Valid email address"})
        .trim()
        .max(100, {meassage: "Email must be no more than 100 Characters."})
        , 
        password: z
        .string()
        .min(3, {message: "Name must be at least 3 character long."})
        .max(8,  {message: "Name must be no more than 8 characters."})
        .toUpperCase(1).toLowerCase(1).length(8).includes("@")
})

const zodusern = z.object({
    username: z
    .string()
    .trim()
    .min(3)
    .max(30, {message: "Username must be no more than 30 letters"})

})

module.exports = {
    requiredbody
}