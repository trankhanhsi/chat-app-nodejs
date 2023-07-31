export const host = "http://localhost:5000";

// Auth
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;

// Message
export const sendMessageRoute = `${host}/api/message/add-msg`;
export const getAllMessagesRoute = `${host}/api/message/get-msg`;
