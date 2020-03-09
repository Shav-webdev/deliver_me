import React from 'react'
import Modal from 'antd/es/modal'

export default function ConfirmModal({
  title,
  confirmVisible,
  handleDeleteOrder,
  deleteModalHandleCancel,
  okText,
  children,
}) {
  return (
    <Modal
      title={title}
      visible={confirmVisible}
      onOk={handleDeleteOrder}
      onCancel={deleteModalHandleCancel}
      okText={okText}>
      {children}
    </Modal>
  )
}
