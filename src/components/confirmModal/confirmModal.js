import React from 'react'
import Modal from 'antd/es/modal'

export default function ConfirmModal({
  title,
  confirmVisible,
  handleDelete,
  deleteModalHandleCancel,
  okText,
  children,
}) {
  return (
    <Modal
      title={title}
      visible={confirmVisible}
      onOk={handleDelete}
      onCancel={deleteModalHandleCancel}
      okText={okText}>
      {children}
    </Modal>
  )
}
