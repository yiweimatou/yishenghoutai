export const HOST = 'http://121.41.92.56'

export const  API_DOMAIN = `${HOST}:90`
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
 * admin apis
 */
export const ADMIN_LOGIN_API = `${API_DOMAIN}/admin/login`
export const ADMIN_VALID_API = `${API_DOMAIN}/admin/valid`
export const ADMIN_EDIT_API = `${API_DOMAIN}/admin/put`
export const ADMIN_LOGOUT_API = `${API_DOMAIN}/admin/logout`
/**
 * organize apis
 */
export const ORGANIZE_GET_API = `${API_DOMAIN}/organize/get`
export const ORGANIZE_LIST_API = `${API_DOMAIN}/organize/list`
export const ORGANIZE_EDIT_API = `${API_DOMAIN}/organize/put`
export const ORGANIZE_INFO_API = `${API_DOMAIN}/organize/info`
export const ORGANIZE_ADD_API = `${API_DOMAIN}/organize/add`
export const ORGANIZE_DEL_API = `${API_DOMAIN}/organize/del`
/**
 * area apis
 */
export const AREA_GET_API = `${API_DOMAIN}/area/get`
export const AREA_LIST_API = `${API_DOMAIN}/area/list`
export const AREA_INFO_API = `${API_DOMAIN}/area/info`
/**
 * upload apis
 */
export const UPLOAD_YUNBOOK_API = `${UPLOAD_DOMAIN}/yunbook`
export const UPLOAD_FILE_API = `${UPLOAD_DOMAIN}/file`
export const UPLOAD_COVER_API = `${UPLOAD_DOMAIN}/cover`
export const UPLOAD_PPT_API = `${UPLOAD_DOMAIN}/ppt`