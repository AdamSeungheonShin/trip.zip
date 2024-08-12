import React from 'react';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Toast 옵션 설정
 * @type {Object}
 * @property {ToastPosition} position - 토스트의 위치
 * @property {number} autoClose - 자동으로 닫히는 시간 (밀리초)
 * @property {boolean} hideProgressBar - 진행 표시줄 숨기기 여부(보임)
 * @property {boolean} closeOnClick - 클릭 시 닫기 여부(가능)
 * @property {boolean} pauseOnHover - 호버 시 일시정지 여부(가능)
 * @property {boolean} draggable - 드래그 가능 여부(가능)
 */
const option = {
  position: 'top-center' as ToastPosition,
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const notify = (
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
) => {
  switch (type) {
    case 'success':
      toast.success(message, option);
      break;
    case 'error':
      toast.error(message, option);
      break;
    case 'info':
      toast.info(message, option);
      break;
    case 'warning':
      toast.warn(message, option);
      break;
    default:
      break;
  }
};

/**
 * type에 따른 알림 메시지를 표시하는 함수
 * @param {string} type - 알림 유형 (success, error, info, warning).
 * @param {string} message - 표시할 메시지 내용.
 * @example
 * - 함수명은 자유입니다.
 * - !필수) notify('타입', '메세지')를 적어주세요.
 * 
 * const handleSuccessToast = () => {
    notify('success', 'success');
  };

 * <button onClick={handleSuccessToast}>
      success 토스트 알림
   </button>
 * @author 김보미
 */
export default function Toast() {
  return <ToastContainer {...option} />;
}