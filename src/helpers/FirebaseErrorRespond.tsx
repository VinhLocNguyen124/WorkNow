import { call } from "react-native-reanimated";

const FirebaseErrorRespond = (errorCode: String, callback: Function) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            callback("Email này đã được sử dụng!");
            break;

        case 'auth/invalid-email':
            callback("Email này không hợp lệ!");
            break;

        case 'auth/user-disabled':
            callback("Tài khoản đã bị vô hiệu hóa!");
            break;

        case 'auth/user-not-found':
            callback("Không tìm thấy tài khoản, vui lòng đăng kí!");
            break;

        case 'auth/wrong-password':
            callback("Sai mật khẩu, vui lòng đăng nhập lại!");
            break;

        case 'auth/operation-not-allowed':
            callback("Tài khoản này không được phép đăng nhập vào ứng dụng!");
            break;

        case 'auth/weak-password':
            callback("Mật khẩu quá yếu!");
            break;

        case 'empty fields':
            callback("Các thông tin không được để trống!");
            break;

        // case '':
        //     callback("!");
        //     break;

        default:
            callback("Lỗi lạ !")
            break;
    }
};

export { FirebaseErrorRespond };