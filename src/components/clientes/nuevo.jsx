import { Divider, Form, Input, Modal, message, DatePicker } from "antd"
import { useState } from "react";
import api from "../../services/api";
import PropTypes from 'prop-types';

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()

    const handleSubmit = (values) => {
        setLoading(true)
        api.clientes.Create({data:values})
        .then(() => {
            form.resetFields()
            closeModal()
            update()
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    };

    return <>
    <Modal title="Nuevo Cliente" open={open} onOk={()=>form.submit()} onCancel={closeModal} confirmLoading={loading}>
        <Divider/>
        <Form labelWrap onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="Nombre" name="nombre" rules={[{required:true}]}>
                <Input placeholder="Nombre..."/>
            </Form.Item>
            <Form.Item label="Apellido" name="apellido" rules={[{required:true}]}>
                <Input placeholder="Apellido..."/>
            </Form.Item>
            <Form.Item label="Fecha de Nacimiento" name="fecha">
                <DatePicker/>
            </Form.Item>     
            <Form.Item label="Cuit" name="cuit" rules={[{required:true}]}>
                <Input placeholder="Cuit..."/>
            </Form.Item>      
            <Form.Item label="Domicilio" name="domicilio">
                <Input placeholder="Domicilio..."/>
            </Form.Item> 
            <Form.Item label="Telefono" name="telefono" rules={[{required:true}]}>
                <Input placeholder="Telefono..."/>
            </Form.Item> 
            <Form.Item label="Mail" name="mail" rules={[{required:true}]}>
                <Input placeholder="Mail..."/>
            </Form.Item>     
        </Form>
    </Modal>
    </>
}

export default ModalNuevo

ModalNuevo.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    update: PropTypes.func,
}