import React from 'react'
import Modal from 'antd/es/modal'

export default function ConfirmModal({
  title,
  confirmVisible,
  handleOk,
  okButtonProps,
  modalHandleCancel,
  okText,
  children,
}) {
  return (
    <Modal
      okButtonProps={okButtonProps}
      title={title}
      visible={confirmVisible}
      onOk={handleOk}
      onCancel={modalHandleCancel}
      okText={okText}>
      {children}
    </Modal>
  )
}
