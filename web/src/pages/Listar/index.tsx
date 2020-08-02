import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Card from '../../components/Card'
import { Table, Button, message, Drawer, Descriptions, Popconfirm, Divider, Form, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const Listar = () => {
    const colunasTabelaPessoa = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Data de Nascimento',
            dataIndex: 'datanascimento',
            key: 'datanascimento'
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => (
                <Button
                    key={id}
                    type="dashed"
                    shape="circle"
                    size="large"
                    onClick={() => showPessoa(id)}
                >
                    <EditOutlined />
                </Button>
            )
        }
    ]
    const [formPessoaDrawer] = Form.useForm()
    const [drawer, setDrawer] = useState(false)
    const [pessoas, setPessoas] = useState([])
    const [pessoa, setPessoa] = useState([{
        id: '',
        nome: '',
        cpf: '',
        email: '',
        datanascimento: ''
    }])

    async function indexPessoas() {
        try {
            const res = await api.get('/pessoa')
            setPessoas(res.data)
        } catch (err) {
            message.error('Erro ao listar pessoas!')
            console.error(err)
        }
    }

    async function showPessoa(id: any) {
        try {
            const res = await api.get(`/pessoa/id/${id}`)
            setPessoa(res.data)
            showDrawer()
        } catch (err) {
            message.error('Erro ao listar pessoa!')
            console.error(err)
        }
    }

    async function updatePessoa(form: any) {
        try {
            await api.put(`/pessoa/id/${form.id}`, form)
            message
                .loading('Alterando...', 2)
                .then(() => indexPessoas(), message.success('Pessoa alterada com sucesso'))
        } catch (err) {
            message.error('Erro ao alterar pessoa!')
            console.error(err)
        }
    }

    async function deletePessoa(id: any) {
        try {
            await api.delete(`/pessoa/id/${id}`)
            message
                .loading('Deletando...', 2)
                .then(() => indexPessoas(), message.success('Pessoa deletada com sucesso'))
                .then(() => closeDrawer())
        } catch (err) {

        }
    }

    async function showDrawer() {
        setDrawer(true)
    }
    async function closeDrawer() {
        setDrawer(false)
        formPessoaDrawer.resetFields()
    }

    useEffect(() => {
        indexPessoas()
    }, [])

    return (
        <>
            <Card>
                <Table dataSource={pessoas} columns={colunasTabelaPessoa} />;
            </Card>

            <Drawer
                title="Editar pessoa"
                width={600}
                placement="right"
                closable={true}
                onClose={closeDrawer}
                visible={drawer}
                destroyOnClose
            >
                <div className="div-usuario-atualizar">
                    <div>
                        <Descriptions title="Informações" layout="horizontal">
                            <Descriptions.Item label="Nome" span={2}>{pessoa[0].nome}</Descriptions.Item>
                            <Descriptions.Item label="CPF">{pessoa[0].cpf}</Descriptions.Item>
                        </Descriptions>

                        <Popconfirm
                            placement="left"
                            title={`Tem certeza que deseja exluir o usuário ${pessoa[0].nome}?`}
                            okText="Sim"
                            cancelText="Cancelar"
                            onConfirm={() => deletePessoa(pessoa[0].id)}
                        >
                            <Button
                                shape="circle"
                                type="dashed"
                            >
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </div>
                    <Divider>Atualizar Pessoa</Divider>
                    <Form
                        name="form-update-pessoa"
                        form={formPessoaDrawer}
                        onFinish={updatePessoa}
                        initialValues={{
                            id: pessoa[0].id,
                            nome: pessoa[0].nome,
                            email: pessoa[0].email,
                            cpf: pessoa[0].cpf,
                            datanascimento: pessoa[0].datanascimento
                        }}
                        >

                        <Form.Item
                            name="nome"
                            rules={[{ required: true, message: 'Por favor, digite o nome' }]}
                        >
                            <Input
                                placeholder="Digite o nome"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Por favor, digite o email' }]}
                        >
                            <Input
                                placeholder="Digite o email"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="cpf"
                            rules={[{ required: true, message: 'Por favor, digite o CPF' }]}
                        >
                            <Input
                                placeholder="Digite o CPF"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="datanascimento"
                            rules={[{ required: true, message: 'Por favor, digite a Data de nascimento' }]}
                        >
                            <Input
                                placeholder="Digite a data de nascimento"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                block htmlType="submit"
                            >
                                ATUALIZAR CADASTRO
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Drawer>
        </>
    )
}

export default Listar