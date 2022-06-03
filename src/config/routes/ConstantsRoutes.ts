const homepage = process.env.NODE_ENV === 'development' ? '/' : '/';

export default {
  signing: `${homepage}`,
  forgotPassword: `${homepage}forgot-password`,
  dashboard: `${homepage}dashboard`,
  myProfile: `${homepage}my_profile`,
  settings: `${homepage}settings`,
  users: `${homepage}settings/users`,
  usersEdit: `${homepage}settings/users/:id`,

};
