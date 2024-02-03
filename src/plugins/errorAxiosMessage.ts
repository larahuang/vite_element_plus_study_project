export const errorMessage = function(code:string):string{
    let msg:string = ""
    switch (code) {
        case "401":
            msg = '認證失敗，無法訪問系統資源'
            break;
        case "403":
            msg = '當前操作沒有權限'
            break;
        case "404":
            msg = '訪問資源不存在'
            break;
        case "default":
            msg = '系統未知錯誤，請反饋給管理員'
            break;
        default:
            return '未知錯誤，請聯繫管理員'
    }
    return msg
} 