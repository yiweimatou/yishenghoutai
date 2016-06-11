export const HOST = 'http://121.41.92.56'

export const USER_API_DOMAIN = `${HOST}:91`
export const ADMIN_API_DOMAIN = `${HOST}:90`
export const UPLOAD_DOMAIN = `${HOST}:8001`

/**
 * api codes
 */
export const OK = 200
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const INTERNAL_SERVER_ERROR = 500
/**
 * user apis
 */
export const USER_LOGIN_API = `${USER_API_DOMAIN}/user/login`
export const USER_VALID_API = `${USER_API_DOMAIN}/user/valid`
export const USER_FORGET_PWD_API = `${USER_API_DOMAIN}/user/put/forget`
export const USER_EDIT_PWD_API = `${USER_API_DOMAIN}/user/put/pwd`
export const USER_LOGOUT_API = `${USER_API_DOMAIN}/user/logout`
export const USER_LIST_API = `${USER_API_DOMAIN}/user/list`
export const USER_INFO_API = `${USER_API_DOMAIN}/user/info`
export const USER_GET_API = `${USER_API_DOMAIN}/user/get`
/**
 * organize apis
 */
export const ORGANIZE_GET_API = `${USER_API_DOMAIN}/organize/get`
export const ORGANIZE_LIST_API = `${USER_API_DOMAIN}/organize/list`
export const ORGANIZE_EDIT_API = `${USER_API_DOMAIN}/organize/put`
export const ORGANIZE_INFO_API = `${USER_API_DOMAIN}/organize/info`
/**
*lesson apis
*/
export const LESSON_GET_API = `${USER_API_DOMAIN}/lesson/get`
export const LESSON_INFO_API = `${USER_API_DOMAIN}/lesson/info`
export const LESSON_EDIT_API = `${USER_API_DOMAIN}/lesson/put`
export const LESSON_LIST_API = `${USER_API_DOMAIN}/lesson/list`
export const LESSON_REMOVE_API = `${USER_API_DOMAIN}/lesson/del`
export const LESSON_ADD_API = `${USER_API_DOMAIN}/lesson/add`
/**
*team apis
*/
export const TEAM_GET_API = `${USER_API_DOMAIN}/lessonteam/get`
export const TEAM_INFO_API = `${USER_API_DOMAIN}/lessonteam/info`
export const TEAM_EDIT_API = `${USER_API_DOMAIN}/lessonteam/put`
export const TEAM_ADD_API = `${USER_API_DOMAIN}/lessonteam/add`
export const TEAM_LIST_API = `${USER_API_DOMAIN}/lessonteam/list`
export const TEAM_REMOVE_API = `${USER_API_DOMAIN}/lessonteam/del`
/**
*section apis
*/
export const SECTION_GET_API = `${USER_API_DOMAIN}/section/get`
export const SECTION_INFO_API = `${USER_API_DOMAIN}/section/info`
export const SECTION_EDIT_API = `${USER_API_DOMAIN}/section/put`
export const SECTION_ADD_API = `${USER_API_DOMAIN}/section/add`
export const SECTION_LIST_API =`${USER_API_DOMAIN}/section/list`
/**
 * area apis
 */
export const AREA_GET_API = `${USER_API_DOMAIN}/area/get`
export const AREA_LIST_API = `${USER_API_DOMAIN}/area/list`
export const AREA_INFO_API = `${USER_API_DOMAIN}/area/info`
/**
 * upload apis
 */
export const UPLOAD_YUNBOOK_API = `${UPLOAD_DOMAIN}/yunbook`
export const UPLOAD_FILE_API = `${UPLOAD_DOMAIN}/file`
export const UPLOAD_COVER_API = `${UPLOAD_DOMAIN}/cover`
export const UPLOAD_PPT_API = `${UPLOAD_DOMAIN}/ppt`