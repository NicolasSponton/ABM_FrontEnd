import { Button, Card, Table, Input, message, Dropdown, Modal, Flex, Space } from "antd"
import { PlusOutlined, MenuOutlined, ExclamationCircleFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import api from '../../services/api'
import ModalNuevo from "./nuevo";
import ModalEditar from "./editar";
import dayjs from "dayjs";
const { Search } = Input;


function Clientes(){

  const [data,setData] = useState([])
  const [update,setUpdate] = useState(false)
  const [openNuevo, setOpenNuevo] = useState({open:false})
  const [openEditar, setOpenEditar] = useState({open:false})
  const [pagination,setPagination] = useState({})
  const [params,setParams] = useState({limit:10,page:1})
  const [loading,setLoading] = useState()

  const columns = [
    {
      title:"Id",
      dataIndex:"id",
      key:"id",
      width:1,
    },
    {
      title:'Nombre',
      dataIndex:'nombre',
      key:'nombre',
    },
    {
      title:'Apellido',
      dataIndex:'apellido',
      key:'apellido',
    },
    {
      title:'Fecha',
      dataIndex:'fecha',
      key:'fecha',
      render: (val) => val ? dayjs(val).format("DD/MM/YYYY") : '',
    },
    {
      title:'Cuit',
      dataIndex:'cuit',
      key:'cuit',
    },
    {
      title:'Domicilio',
      dataIndex:'domicilio',
      key:'domicilio',
    },
    {
      title:'Telefono',
      dataIndex:'telefono',
      key:'telefono',
    },
    {
      title:'Mail',
      dataIndex:'mail',
      key:'mail',
    },
    {
      title: "Acción",
      key: 'action',
      width: 50,
      align: 'center',
      render: (text, record) => (
        <Dropdown menu={{
          items:[
            { key: '1', label: <Space><EditOutlined/>Editar</Space>, onClick:() => setOpenEditar({ open: true, record: record })},
            { key: '2', label: <Space><DeleteOutlined/>Borrar</Space>, onClick:() => showDeleteConfirm( record )},
          ]
        }}>
          <Button size="small"> <MenuOutlined /> </Button>
        </Dropdown>
      )
    }
  ]

    useEffect(()=>{
      setLoading(true)
      const query = '?' + new URLSearchParams(params).toString();
      api.clientes.GetAll({query})
      .then(res => {
        setData(res?.data?.clientes || [])
        setPagination(p=>({...p,total:res?.data?.totalDataSize}))
      })  
      .finally(()=>setLoading(false))
    },[update,params])

    const showDeleteConfirm = (record) => {
      Modal.confirm({
        title: '¿Seguro desea borrar el cliente?',
        icon: <ExclamationCircleFilled />,
        maskClosable:true,
        okType: 'danger',
        onOk() {
          api.clientes.Delete({id: record.id})
          .then(res => {
            (res.status === "success")
            ? setUpdate(p=>!p)
            : message.error(res.message)
          }) 
        },
      })
    }

    return <>
    <Card 
      style={{minHeight:"100%"}} 
      title='Clientes' 
    >
    <Flex justify="space-between">
      <Button type="primary" onClick={()=>setOpenNuevo({open:true})}>
        <PlusOutlined /> Nuevo
      </Button>
      <Search  
          style={{ maxWidth: 300, float:"right", marginBottom:"10px" }} 
          onSearch={(val)=>setParams(p=>({ ...p, query:val }))} 
          placeholder="Nombre..." 
          enterButton
      />
    </Flex>
    <Table
        scroll={{x:true}}
        loading={loading}
        size="small"
        dataSource={data} 
        rowKey={record=>record.id}
        onChange={(pag)=>{
          setPagination(pag)
          setParams(p=>({...p, page: pag.current }))
        }}
        columns={columns}
        bordered
        pagination={{...pagination, size:"default"}}    
    />
    </Card>
    <ModalNuevo
        open={openNuevo.open}
        closeModal={()=>setOpenNuevo({open:false})}
        update={()=>setUpdate(p=>!p)}
    />
    <ModalEditar
        open={openEditar.open}
        closeModal={()=>setOpenEditar({open:false})}
        update={()=>setUpdate(p=>!p)}
        record={openEditar.record}
    />
    </>
}

export default Clientes