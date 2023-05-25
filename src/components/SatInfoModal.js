import { Modal } from 'antd'
import React, { useContext } from 'react'
import { MyContext } from './ContextProvider'
import CustomModal from './CustomModal'

const SatInfoModal = () => {
  const {
    satInfoModal,
    handleSatInfoModal
  } = useContext(MyContext)

  return (
    <Modal
        open={satInfoModal?.open}
        centered
        maskClosable
        bodyStyle={{
          padding: 0,
          margin: 0
        }}
        footer={null}
        closable={false}
    >
        <CustomModal
            open={satInfoModal?.open}
            id={satInfoModal?.id}
            closeModal={() => handleSatInfoModal()}
        />
    </Modal>
  )
}

export default SatInfoModal
