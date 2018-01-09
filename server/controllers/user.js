const User = require('./../models/user');
const APIError = require('../middlewares/response').APIError;

module.exports = {
    
    async signup(ctx, next) {
        const { username, password } = ctx.request.body;
        const newUser = new User({
            username,
            password
        });
        await newUser.save();
        ctx.session.user = { username };
        ctx.ok({ user: ctx.session.user, message: 'Success!' });
    },

    async login(ctx, next) {
        const { username, password } = ctx.request.body;
        const user = await User.findOne({ username });
        if (!user) {
            throw new APIError('auth:user_not_found', 'User not exist!');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new APIError('auth:password_not_correct', 'Password not correct!');
        }
        ctx.session.user = { username: user.username };
        ctx.ok({ user: ctx.session.user, message: 'Success!'});
    },

    async logout(ctx, next) {
        ctx.session.user = null;
        ctx.ok({message: 'Success!'});
    },

    async getUser(ctx, next) {
        if (ctx.session.user) {
            ctx.ok({ user: ctx.session.user });
        } else {
            throw new APIError('auth:user_not_login', 'User not login!');
        }
    }

}